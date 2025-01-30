import FILTER_LIST_UPDATE_TYPES from "../../constants/FILTER_LIST_UPDATE_TYPES";
import UI_ELS from "../../constants/UI_ELS";
import FilterListUpdated from "../../events/FilterListUpdated";
import FilterRequested from "../../events/FilterRequested";
import { $, $clone, on, trigger } from "../../util";

export default function renderFilterFormEntry(table, filter) {
  console;
  const $el = $clone(UI_ELS.FILTERS_FORM_ENTRY);
  $(".filters-column", $el).innerHTML = filter.column;
  $(".filters-value", $el).innerHTML = filter.value;
  on($("button", $el), "click", (evt) => {
    trigger(
      table,
      new FilterListUpdated(filter.column, {
        type: FILTER_LIST_UPDATE_TYPES.REMOVE,
      })
    );
    trigger(table, new FilterRequested());
  });
  return $el;
}
