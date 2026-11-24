// Phone links: real tel: links everywhere. On desktops (fine pointer, usually nothing handles tel:)
// a click copies the number and shows a toast instead. <a href={`tel:${SHOP.tel}`} onClick={phoneClick}>
import { SHOP } from "../data.js";
import { uiActions } from "./store.js";
import { copyText } from "./useDialog.js";

export const finePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export async function phoneClick(e) {
  if (!finePointer()) return; // phones and tablets dial
  e.preventDefault();
  uiActions.toast((await copyText(SHOP.phone)) ? `Number copied: ${SHOP.phone}` : `Call ${SHOP.phone}`);
}
