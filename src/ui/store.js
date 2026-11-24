// Tiny shared UI store (no deps): toast + the "show at counter" pass. useUI() / uiActions.*
import { useSyncExternalStore } from "react";

let state = { toast: null, pass: null };
const subs = new Set();
const set = (patch) => { state = { ...state, ...patch }; subs.forEach((f) => f()); };
let n = 0;

export const uiActions = {
  toast(msg) { set({ toast: { msg, n: ++n } }); },
  clearToast() { set({ toast: null }); },
  openPass(p) { set({ pass: p }); },   // { service, style }
  closePass() { set({ pass: null }); },
};
export function useUI() {
  return useSyncExternalStore((f) => { subs.add(f); return () => subs.delete(f); }, () => state, () => state);
}
