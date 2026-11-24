// ALL site content lives here. Anything marked TODO/CONFIRM is a placeholder that the owner must
// confirm before launch. Verified facts: name, address, phone (from the user's brief).

export const SHOP = {
  name: "Jenny's Nails",
  street: "1996 S Houston Levee Rd #104",
  city: "Collierville, TN 38017",
  address: "1996 S Houston Levee Rd #104, Collierville, TN 38017",
  phone: "(901) 861-2889",
  tel: "+19018612889",
  timeZone: "America/Chicago",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Jenny's Nails, 1996 S Houston Levee Rd #104, Collierville, TN 38017"),
  mapsEmbed:
    "https://www.google.com/maps?q=" +
    encodeURIComponent("Jenny's Nails, 1996 S Houston Levee Rd #104, Collierville, TN 38017") +
    "&output=embed",
};

// TODO(CONFIRM WITH OWNER): HOURS ARE PLACEHOLDERS. Nothing here is verified.
// While HOURS_CONFIRMED is false the site labels them "sample hours".
// Day index: 0 = Sunday … 6 = Saturday. Times are 24h "HH:MM" in America/Chicago. null = closed.
export const HOURS_CONFIRMED = false;
export const HOURS = [
  null,               // Sun  TODO
  ["09:30", "19:00"], // Mon  TODO
  ["09:30", "19:00"], // Tue  TODO
  ["09:30", "19:00"], // Wed  TODO
  ["09:30", "19:00"], // Thu  TODO
  ["09:30", "19:00"], // Fri  TODO
  ["09:30", "18:00"], // Sat  TODO
];
export const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const toMin = (s) => { const [h, m] = s.split(":").map(Number); return h * 60 + m; };
export const fmtTime = (s) => {
  const [h, m] = s.split(":").map(Number);
  const hh = ((h + 11) % 12) + 1;
  return `${hh}${m ? ":" + String(m).padStart(2, "0") : ""} ${h < 12 ? "AM" : "PM"}`;
};

// Current day/minute in the salon's time zone, regardless of the visitor's clock.
function chicagoNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: SHOP.timeZone, weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(date);
  const get = (t) => parts.find((p) => p.type === t)?.value;
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, min: Number(get("hour")) * 60 + Number(get("minute")) };
}

// { open, label } e.g. "Open now · until 7 PM" / "Closed · opens Mon 9:30 AM"
export function openStatus(date = new Date()) {
  const { day, min } = chicagoNow(date);
  const today = HOURS[day];
  if (today && min >= toMin(today[0]) && min < toMin(today[1])) {
    return { open: true, label: `Open now · until ${fmtTime(today[1])}` };
  }
  for (let k = 0; k < 8; k++) {
    const d = (day + k) % 7;
    const h = HOURS[d];
    if (!h) continue;
    if (k === 0 && min >= toMin(h[0])) continue;
    const when = k === 0 ? "today" : k === 1 ? "tomorrow" : DAY_NAMES[d].slice(0, 3);
    return { open: false, label: `Closed · opens ${when} ${fmtTime(h[0])}` };
  }
  return { open: false, label: "Closed" };
}

// TODO(CONFIRM WITH OWNER): generic placeholder styles, not the salon's real best-sellers.
// `bottle` recolors the 3D polish; `flood`/`glow` color the section; `ink` is the text color on it.
export const POPULAR = [
  {
    n: "01", title: "Classic French", big: ["Classic", "French"],
    blurb: "A soft sheer-pink base with a crisp white tip. Clean, polished and easy to wear anywhere.",
    bottle: "#F2B3BE", flood: "#F3C9CF", glow: "#E39AA8", ink: "#231712",
  },
  {
    n: "02", title: "Glazed Chrome", big: ["Glazed", "Chrome"],
    blurb: "A pearly, mirror-like finish over a milky base. It catches the light every time you move.",
    bottle: "#B8A3EC", flood: "#CBBDEB", glow: "#8E78C9", ink: "#231712",
  },
  {
    n: "03", title: "Ballet Pink Gel", big: ["Ballet", "Pink"],
    blurb: "A sheer ballet-slipper pink in glossy gel. Soft and pretty, and it goes with everything.",
    bottle: "#F07FA0", flood: "#F7B8C9", glow: "#E0587C", ink: "#231712",
  },
];

// TODO(CONFIRM WITH OWNER): generic service names only. No prices are known, so every price is
// "Ask in salon". Add, remove or rename items once the owner shares the real menu.
export const SERVICES_CONFIRMED = false;
export const SERVICES = [
  { id: "manicure", name: "Manicure", note: "Shape, cuticle care and polish", price: null },
  { id: "pedicure", name: "Pedicure", note: "Soak, shape, cuticle care and polish", price: null },
  { id: "gel", name: "Gel polish", note: "Long-wearing glossy color", price: null },
  { id: "acrylic", name: "Acrylic full set", note: "Length and shape built from scratch", price: null },
  { id: "fill", name: "Fill", note: "Refresh the regrowth on an existing set", price: null },
  { id: "art", name: "Nail art", note: "Designs, accents and details", price: null },
];
export const priceLabel = (p) => (p == null ? "Ask in salon" : p);

// Styles for the "Show at counter" pass (generic; same list as POPULAR plus "Not sure yet").
export const PASS_STYLES = [...POPULAR.map((p) => p.title), "Something else / not sure yet"];

// TODO(CONFIRM WITH OWNER): placeholder About copy. It makes no specific claims on purpose
// (no years, awards, staff names or certifications).
export const ABOUT = {
  confirmed: false,
  heading: "A little time, just for you.",
  body:
    "Jenny's Nails is a neighborhood nail salon on South Houston Levee Road in Collierville. " +
    "Come in for a quick polish change or settle in for a full set. Either way, the goal is the same: " +
    "you leave feeling put-together and a little more like yourself.",
};
