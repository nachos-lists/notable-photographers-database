import * as deduplicate from "./deduplicate";
import * as meta from "./meta";
import * as events from "./events";

export const [$, $$] = [
  (sel, parent = document) => parent.querySelector(sel),
  (sel, parent = document) => [...(parent.querySelectorAll(sel) || [])],
];

export const $clone = (els) => {
  if (els instanceof Array) {
    return els.map((e) => $clone(e));
  }
  return els.cloneNode(true);
};

export const $html = (str) => {
  const tpl = document.createElement("template");
  tpl.innerHTML = str;
  return tpl.content.firstElementChild;
};

export const { deduplicateObjectsBy, deduplicatePrimitives } = deduplicate;
export const { getNodeMeta, setNodeMeta } = meta;
export const { on, off, trigger } = events;
