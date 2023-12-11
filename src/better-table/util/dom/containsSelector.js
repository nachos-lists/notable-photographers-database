export default function containsSelector(parent, sel) {
  return Boolean(parent.querySelector(sel));
}
