export function on(dom, evt, listener) {
  if (dom instanceof Array) {
    dom.forEach((node) => on(node, evt, listener));
  }
  return dom.addEventListener(evt, listener);
}

export function off(dom, evt, listener) {
  if (dom instanceof Array) {
    dom.forEach((node) => off(node, evt, listener));
  }
  return dom.removeEventListener(evt, listener);
}

export function trigger(dom, eventObject) {
  if (dom instanceof Array) {
    dom.forEach((node) => off(node, evt, listener));
  }
  dom.dispatchEvent(eventObject);
}
