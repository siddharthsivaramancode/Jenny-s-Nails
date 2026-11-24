// Small confirmation toast: uiActions.toast("..."). Announced politely, gone after 2.6 s.
import { useEffect } from "react";
import { useUI, uiActions } from "../ui/store.js";

export default function Toast() {
  const { toast } = useUI();
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(uiActions.clearToast, 2600);
    return () => clearTimeout(t);
  }, [toast]);
  return <div role="status" aria-live="polite">{toast && <p key={toast.n} className="toast m-0">{toast.msg}</p>}</div>;
}
