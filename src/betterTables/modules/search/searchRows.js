import { $, $html, trigger, getNodeMeta, setNodeMeta } from "../../util";
import AppliedChange from "../../events/AppliedChange";
import SortingReset from "../../events/SortingReset";

export default function searchRows(evt) {
  const { target: table, detail } = evt;
  const { filter } = detail;
  const TBody = $("tbody", table);
  trigger(table, new SortingReset());
  if (!filter) {
    resetOriginalRows(table, TBody);
  } else {
    applySearchFilter(table, TBody, filter);
  }
}

function applySearchFilter(table, TBody, search) {
  const rows = getNodeMeta(table, "visibleRows");

  const filtered = rows.filter((row) =>
    [...row.children].some((td) =>
      td.innerHTML.toLowerCase().includes(search.toLowerCase())
    )
  );

  console.log("applySearchFilter", { filtered });

  setNodeMeta(table, "visibleRows", filtered);
  const newTBody = $html("<tbody></tbody>");
  newTBody.append(
    ...(filtered.length
      ? filtered
      : [$html(`<tr><td colspan="12">No results</td></tr>`)])
  );
  TBody.replaceWith(newTBody);
  trigger(
    table,
    new AppliedChange("filter", {
      filter: search,
      rows: $("tr", newTBody).length,
    })
  );
}

function resetOriginalRows(table, TBody) {
  const rows = getNodeMeta(table, "originalRows");
  setNodeMeta(table, "visibleRows", getNodeMeta(table, "originalRows"));
  TBody.innerHTML = "";
  TBody.append(...rows);
}
