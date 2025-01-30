import FILTER_LIST_UPDATE_TYPES from "../../constants/FILTER_LIST_UPDATE_TYPES";
import UI_ELS from "../../constants/UI_ELS";
import FilterListUpdated from "../../events/FilterListUpdated";
import FilterRequested from "../../events/FilterRequested";
import { $, $$, $clone, $html, on, trigger } from "../../util";
import { getNodeMeta } from "../../util/meta";

export default function makeSearch(table) {
  const tableForm = $clone(UI_ELS.SEARCH_FORM);
  const { REPLACE } = FILTER_LIST_UPDATE_TYPES;
  const uniques = {};
  for (const td of $$("tbody td", table)) {
    uniques[td.innerHTML] = true;
  }
  const uniqueValues = Object.keys(uniques).map((k) =>
    $html(`<option value="${k}"></option>"`)
  );

  const values = $("datalist", tableForm);
  const valuesID = getNodeMeta(table, "id");
  values.setAttribute("id", valuesID);
  $("input", tableForm).setAttribute("list", valuesID);
  $("datalist", tableForm).append(...uniqueValues);

  on(tableForm, "submit", (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    trigger(
      table,
      new FilterListUpdated("search", {
        type: REPLACE,
        value: $("input", tableForm).value,
      })
    );
    trigger(table, new FilterRequested());
  });
  table.parentNode.insertBefore(tableForm, table);
}
