export default function htmlFromString(html) {
  const tpl = document.createElement("template");
  tpl.innerHTML = html;
  return tpl.content.firstElementChild;
}
