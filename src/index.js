import EVENTS from "./betterTables/constants/EVENTS";
import updateRowCount from "./betterTables/modules/auto-row-count";
import onFilterRequested from "./betterTables/modules/filtering/onFilterRequested";
import onUpdateFilterList from "./betterTables/modules/filtering/onUpdateFilterList";
import reRenderFilterForm from "./betterTables/modules/filtering/reRenderFilterForm";
import updateFilterValuesByCol from "./betterTables/modules/filtering/updateFilterValuesByCol";
import makeSearch from "./betterTables/modules/search";
import makeHeadersSortable from "./betterTables/modules/sortable-headers";
import makeFilters from "./betterTables/modules/filtering";
import resetSortButtons from "./betterTables/modules/sorting/resetSortButtons";
import sortRows from "./betterTables/modules/sorting/sortRows";
import updateSortButton from "./betterTables/modules/sorting/updateSortButton";
import { $$, $clone, on, setNodeMeta } from "./betterTables/util";

on(document, "DOMContentLoaded", () => {
  $$("table").forEach(enhanceTable);
});

function enhanceTable(table) {
  const rows = $$("tbody tr", table);

  initializeData(table, rows);
  addSortingFilteringEventListeners(table);
  makeHeadersSortable(table);
  makeSearch(table);
  makeFilters(table);
}

function initializeData(table, rows) {
  setNodeMeta(table, "filters", []);
  setNodeMeta(table, "originalRows", $clone(rows));
  setNodeMeta(table, "visibleRows", $clone(rows));
  setNodeMeta(table, "id", `table-${Math.random().toString(36).substring(7)}`);
}

function addSortingFilteringEventListeners(table) {
  const {
    SORT_CHANGED,
    SORT_RESET,
    FILTER_REQUESTED,
    APPLIED_CHANGE,
    FILTER_LIST_UPDATED,
    FILTERS_COLUMN_SELECTED,
  } = EVENTS;
  const listen = on.bind(on, table);
  listen(SORT_CHANGED, updateSortButton);
  listen(SORT_RESET, resetSortButtons);
  listen(SORT_CHANGED, sortRows);
  listen(FILTER_REQUESTED, onFilterRequested);
  listen(FILTER_LIST_UPDATED, onUpdateFilterList);
  listen(FILTER_LIST_UPDATED, reRenderFilterForm);
  listen(FILTERS_COLUMN_SELECTED, updateFilterValuesByCol);
  listen(APPLIED_CHANGE, updateRowCount);
}
