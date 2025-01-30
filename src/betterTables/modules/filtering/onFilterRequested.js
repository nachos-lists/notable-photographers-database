import { $, $$, $html, getNodeMeta, setNodeMeta, trigger } from "../../util";
import AppliedChange from "../../events/AppliedChange";

export default function onFilterRequested(evt) {
  const { target: table } = evt;
  const filters = getNodeMeta(table, "filters");
  const original = getNodeMeta(table, "originalRows");
  const headers = $$("thead th", table);
  let filtered = original.filter((row) => {
    for (const filter of filters) {
      const column = headers.findIndex(
        (header) =>
          $(".sortable-header-text", header).innerText === filter.column
      );
      if (column > -1) {
        const contains = row.children[column].innerText === filter.value;
        if (!contains) {
          return false;
        }
      }
    }
    return true;
  });
  console.log("IS SEARCH", {
    isSearch: filters.some((f) => f.column === "search"),
  });
  if (filters.some((f) => f.column === "search")) {
    // apply search filter to the previous bundle
    const value = filters.find((f) => f.column === "search").value;
    filtered = filtered.filter((row) => {
      return [...row.children].some((td) => {
        console.log({
          tdInner: td.innerHTML,
          value,
        });
        return td.innerHTML.toLowerCase().includes(value.toLowerCase());
      });
    });
  }
  const $tbody = $html("<tbody></tbody>");
  $tbody.append(...filtered);
  $("tbody", table).replaceWith($tbody);
  setNodeMeta(table, "visibleRows", filtered);
  trigger(table, new AppliedChange());
}
