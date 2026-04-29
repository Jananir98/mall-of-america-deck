import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import { ZONES, getZone } from "../data/zones";
import { MODES, DEFAULT_MODE, getMode } from "../data/modes";

// ---------------------------------------------------------------------------
//   The deck state machine
// ---------------------------------------------------------------------------
//
// Replaces the v1 linear slide machine with a hub-and-spoke model.
//
//   view            "splash" | "map" | "zone" | "submodule" | "brand" | "rep"
//   role            null | "tenant" | "sponsor" | "event"
//   mode            "tenant" | "sponsor" | "event"   (active lens, defaults from role)
//   zone            null | one of ZONES.id
//   submodule       null | "leasing" | "events" | "sponsorship" | "venue"
//   brand           null | { name, logoUrl, tier }
//   history         [{ at, type, payload }] — for sales-rep heatmap
//   savedZones      Set<zoneId>
//   muted           bool
//   cinematic       bool
//   reduced         bool       (prefers-reduced-motion)
//
// The state lives in a reducer + persists to localStorage so a salesperson
// can hand the link to a prospect and pick up on any device.

const STORAGE_KEY = "moa-deck-v2";

const initialState = {
  view: "splash",
  role: null,
  mode: DEFAULT_MODE,
  zone: null,
  submodule: null,
  brand: null,
  history: [],
  savedZones: [],
  muted: true, // default muted — browser autoplay policies + respectful default
  cinematic: false,
  reduced: false,
  heroArcSeen: false, // 15-sec emotional arc auto-plays once after role gate
};

function reducer(state, action) {
  const at = Date.now();
  switch (action.type) {
    case "BOOT":
      return { ...state, ...action.payload };
    case "SET_REDUCED_MOTION":
      return { ...state, reduced: action.value };

    case "SET_ROLE": {
      const mode = action.role ?? DEFAULT_MODE;
      return {
        ...state,
        role: action.role,
        mode,
        view: "map",
        history: [...state.history, { at, type: "role", payload: action.role }],
      };
    }

    case "SET_MODE":
      return {
        ...state,
        mode: action.mode,
        history: [...state.history, { at, type: "mode", payload: action.mode }],
      };

    case "ENTER_ZONE":
      return {
        ...state,
        zone: action.id,
        view: "zone",
        history: [...state.history, { at, type: "enterZone", payload: action.id }],
      };

    case "EXIT_ZONE":
      return {
        ...state,
        zone: null,
        view: "map",
        history: [...state.history, { at, type: "exitZone", payload: null }],
      };

    case "OPEN_SUBMODULE":
      return {
        ...state,
        submodule: action.id,
        view: "submodule",
        history: [...state.history, { at, type: "openSubmodule", payload: action.id }],
      };

    case "CLOSE_SUBMODULE":
      return {
        ...state,
        submodule: null,
        view: state.zone ? "zone" : "map",
      };

    case "OPEN_BRAND":
      return {
        ...state,
        view: "brand",
        history: [...state.history, { at, type: "openBrand", payload: null }],
      };

    case "SET_BRAND":
      return {
        ...state,
        brand: action.brand,
        history: [...state.history, { at, type: "setBrand", payload: action.brand?.name }],
      };

    case "CLOSE_BRAND":
      return {
        ...state,
        view: state.zone ? "zone" : "map",
      };

    case "OPEN_REP":
      return { ...state, view: "rep" };

    case "TOGGLE_SAVE": {
      const set = new Set(state.savedZones);
      if (set.has(action.id)) set.delete(action.id);
      else set.add(action.id);
      return {
        ...state,
        savedZones: [...set],
        history: [...state.history, { at, type: "save", payload: action.id }],
      };
    }

    case "TOGGLE_MUTE":
      return { ...state, muted: !state.muted };

    case "TOGGLE_CINEMATIC":
      return { ...state, cinematic: !state.cinematic };

    case "MARK_HERO_ARC_SEEN":
      return { ...state, heroArcSeen: true };

    case "RESET":
      return { ...initialState, reduced: state.reduced };

    default:
      return state;
  }
}

// Persist non-volatile fields only.
function loadPersisted() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed;
  } catch {
    return null;
  }
}

function persist(state) {
  try {
    const { history, ...rest } = state;
    // keep last 200 history events
    const trimmed = { ...rest, history: history.slice(-200) };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    /* ignore quota */
  }
}

const DeckContext = createContext(null);

export function DeckProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const booted = useRef(false);

  // Boot — read persisted state, detect prefers-reduced-motion, parse URL.
  useEffect(() => {
    if (booted.current) return;
    booted.current = true;

    const persisted = loadPersisted() ?? {};
    const params = new URLSearchParams(window.location.search);
    const urlRole = params.get("role");
    const urlZone = params.get("zone");
    const urlBrand = params.get("brand");
    const urlMode = params.get("mode");
    const urlRep = params.get("rep");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    dispatch({
      type: "BOOT",
      payload: {
        ...persisted,
        reduced,
        // URL params trump persisted state (shareable links)
        role: urlRole || persisted.role || null,
        mode: urlMode || persisted.mode || DEFAULT_MODE,
        zone: urlZone && getZone(urlZone) ? urlZone : persisted.zone ?? null,
        view: urlRep
          ? "rep"
          : (urlZone && getZone(urlZone) && "zone") ||
            (urlRole && "map") ||
            persisted.view ||
            "splash",
        brand: urlBrand
          ? { name: decodeURIComponent(urlBrand), logoUrl: null, tier: "premium" }
          : persisted.brand ?? null,
      },
    });

    // listen for reduced-motion changes
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e) => dispatch({ type: "SET_REDUCED_MOTION", value: e.matches });
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  // Persist on every change (post-boot).
  useEffect(() => {
    if (booted.current) persist(state);
  }, [state]);

  // Keep the URL in sync so links are shareable.
  useEffect(() => {
    if (!booted.current) return;
    const params = new URLSearchParams();
    if (state.role) params.set("role", state.role);
    if (state.mode && state.mode !== state.role) params.set("mode", state.mode);
    if (state.zone) params.set("zone", state.zone);
    if (state.brand?.name) params.set("brand", state.brand.name);
    const qs = params.toString();
    const url = qs ? `?${qs}` : window.location.pathname;
    window.history.replaceState(null, "", url);
  }, [state.role, state.mode, state.zone, state.brand]);

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      const tag = e.target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (e.key === "Escape") {
        e.preventDefault();
        if (state.view === "brand") dispatch({ type: "CLOSE_BRAND" });
        else if (state.view === "submodule") dispatch({ type: "CLOSE_SUBMODULE" });
        else if (state.view === "zone") dispatch({ type: "EXIT_ZONE" });
        else if (state.view === "rep") dispatch({ type: "BOOT", payload: { view: state.zone ? "zone" : "map" } });
        return;
      }
      if (e.key.toLowerCase() === "c") {
        e.preventDefault();
        dispatch({ type: "TOGGLE_CINEMATIC" });
      }
      if (e.key.toLowerCase() === "m") {
        e.preventDefault();
        dispatch({ type: "TOGGLE_MUTE" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state.view, state.zone]);

  // Action helpers
  const setRole = useCallback((role) => dispatch({ type: "SET_ROLE", role }), []);
  const setMode = useCallback((mode) => dispatch({ type: "SET_MODE", mode }), []);
  const enterZone = useCallback((id) => dispatch({ type: "ENTER_ZONE", id }), []);
  const exitZone = useCallback(() => dispatch({ type: "EXIT_ZONE" }), []);
  const openSubmodule = useCallback((id) => dispatch({ type: "OPEN_SUBMODULE", id }), []);
  const closeSubmodule = useCallback(() => dispatch({ type: "CLOSE_SUBMODULE" }), []);
  const openBrand = useCallback(() => dispatch({ type: "OPEN_BRAND" }), []);
  const setBrand = useCallback((brand) => dispatch({ type: "SET_BRAND", brand }), []);
  const closeBrand = useCallback(() => dispatch({ type: "CLOSE_BRAND" }), []);
  const openRep = useCallback(() => dispatch({ type: "OPEN_REP" }), []);
  const toggleSave = useCallback((id) => dispatch({ type: "TOGGLE_SAVE", id }), []);
  const toggleMute = useCallback(() => dispatch({ type: "TOGGLE_MUTE" }), []);
  const toggleCinematic = useCallback(() => dispatch({ type: "TOGGLE_CINEMATIC" }), []);
  const markHeroArcSeen = useCallback(() => dispatch({ type: "MARK_HERO_ARC_SEEN" }), []);
  const reset = useCallback(() => dispatch({ type: "RESET" }), []);

  // Recommended next zone given current mode + history
  const recommendedNext = useMemo(() => {
    const mode = getMode(state.mode);
    const visited = new Set(
      state.history.filter((h) => h.type === "enterZone").map((h) => h.payload)
    );
    const remaining = mode.recommendedPath.filter((id) => !visited.has(id));
    return remaining[0] ?? mode.recommendedPath[0];
  }, [state.mode, state.history]);

  const value = useMemo(
    () => ({
      ...state,
      zones: ZONES,
      modes: MODES,
      activeZone: state.zone ? getZone(state.zone) : null,
      activeMode: getMode(state.mode),
      recommendedNext,
      // actions
      setRole,
      setMode,
      enterZone,
      exitZone,
      openSubmodule,
      closeSubmodule,
      openBrand,
      setBrand,
      closeBrand,
      openRep,
      toggleSave,
      toggleMute,
      toggleCinematic,
      markHeroArcSeen,
      reset,
    }),
    [
      state,
      recommendedNext,
      setRole,
      setMode,
      enterZone,
      exitZone,
      openSubmodule,
      closeSubmodule,
      openBrand,
      setBrand,
      closeBrand,
      openRep,
      toggleSave,
      toggleMute,
      toggleCinematic,
      markHeroArcSeen,
      reset,
    ]
  );

  return <DeckContext.Provider value={value}>{children}</DeckContext.Provider>;
}

export function useDeck() {
  const ctx = useContext(DeckContext);
  if (!ctx) throw new Error("useDeck must be used within DeckProvider");
  return ctx;
}
