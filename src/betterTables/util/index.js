export const [$, $$] = [
  (sel, parent = document) => parent.querySelector(sel),
  (sel, parent = document) => [...(parent.querySelectorAll(sel) || [])]
];

export const $clone = (els) => {
  return els instanceof Array
    ? els.map((el) => el.cloneNode(true))
    : el.cloneNode(true);
};

export const $html = (str) => {
  const tpl = document.createElement("template");
  tpl.innerHTML = str;
  return tpl.content.firstElementChild;
};