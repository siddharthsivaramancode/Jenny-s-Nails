// Live open/closed pill, computed in America/Chicago time and refreshed every 30 s.
// Hours are placeholders (data.js HOURS_CONFIRMED = false), so it says "sample hours" until confirmed.
import { useEffect, useState } from "react";
import { openStatus, HOURS_CONFIRMED } from "../data.js";

export default function OpenPill({ className = "" }) {
  const [st, setSt] = useState(() => openStatus());
  useEffect(() => {
    const t = setInterval(() => setSt(openStatus()), 30000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className={`open-pill ${st.open ? "is-open" : ""} ${className}`} role="status"
      title={HOURS_CONFIRMED ? "Central Time" : "Sample hours: not yet confirmed with the salon"}>
      <span className="open-dot" aria-hidden="true" />
      {st.label}
      {!HOURS_CONFIRMED && <small>(sample hours)</small>}
    </span>
  );
}
