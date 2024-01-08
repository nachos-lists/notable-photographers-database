import { $, $$, $html, deduplicatePrimitives } from "../../util";

export default function updateFilterValuesByCol(evt) {
  const { target: table } = evt;
  const valuesSelect = $("#filter-by-col-values");
  const col = evt.column;
  const pos = $$("thead th", table).findIndex(
    (header) => $(".sortable-header-text", header).innerText === col
  );
  if (pos > -1) {
    const values = deduplicatePrimitives(
      $$("tbody tr", table).map((row) => $$("td", row)[pos].innerText),
      { excludeEmpty: true }
    );
    valuesSelect.innerHTML = `<option value="">Value</option>`;
    valuesSelect.append(
      ...values.map((v) => $html(`<option value="${v}">${v}</option>`))
    );
  }
}
