import FILTER_LIST_UPDATE_TYPES from "../../constants/FILTER_LIST_UPDATE_TYPES";
import UI_ELS from "../../constants/UI_ELS";
import FilterListUpdated from "../../events/FilterListUpdated";
import FilterRequested from "../../events/FilterRequested";
import FiltersColumnSelected from "../../events/FiltersColumnSelected";
import { $, $$, $clone, $html, getNodeMeta, on, trigger } from "../../util";
import renderFiltersList from "./renderFiltersList";

export default function makeFilters(table) {
  const { FILTERS_FORM } = UI_ELS;
  const activeFilters = getNodeMeta(table, "filters");

  const form = $clone(FILTERS_FORM);
  let column = "";
  let value = "";

  const columnsSelect = $("#filter-by-columns", form);
  const valuesSelect = $("#filter-by-col-values", form);

  on(columnsSelect, "change", (evt) => {
    column = evt.target.value;
    trigger(table, new FiltersColumnSelected(column));
  });
  on(valuesSelect, "change", (evt) => {
    value = evt.target.value;
  });

  on($("#filters-add-filter", form), "click", () => {
    if (column !== "" && value !== "") {
      trigger(
        table,
        new FilterListUpdated(column, {
          type: FILTER_LIST_UPDATE_TYPES.ADD,
          value,
        })
      );
    }

    trigger(table, new FilterRequested());
  });

  const oldList = $("#applied-filters ol", form);
  const newList = renderFiltersList(table, oldList, activeFilters);
  oldList.replaceWith(newList);

  const availableFilters = $$("th", table).map((th) => {
    const col = $(".sortable-header-text", th).innerText;
    return $html(`<option value="${col}">${col}</option>`);
  });

  columnsSelect.append(...availableFilters);
  table.parentNode.insertBefore(form, table);
}
