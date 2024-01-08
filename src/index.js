// UTILITIES

import { $, $$, $clone, $html } from "./betterTables/util";
import { getNodeMeta, setNodeMeta } from "./betterTables/util/meta";
import UI_ELS from "./betterTables/constants/UI_ELS";
import UI_STATES from "./betterTables/constants/UI_STATES";
import EVENTS from "./betterTables/constants/EVENTS";
import COMPARATORS from "./betterTables/constants/COMPARATORS";

document.addEventListener("DOMContentLoaded", () => {
  $$("table").forEach(enhanceTable);
});


// LIBRARY
function enhanceTable(table) {
  setNodeMeta(
    table,
    "originalRows",
    $$("tbody tr", table).map((tr) => tr.cloneNode(true))
  );
  setNodeMeta(table, "id", `table-${Math.random().toString(36).substring(7)}`);

  addSortingFilteringEventListeners(table);
  makeHeadersSortable(table);
  makeFilters(table);
}

function addSortingFilteringEventListeners(table) {
  const {    SORT_CHANGED,
    FILTER_CHANGED} = EVENTS;
  table.addEventListener(SORT_CHANGED, updateSortButton);
  table.addEventListener(SORT_CHANGED, sortRows);
  table.addEventListener(FILTER_CHANGED, filterRows);
}

function updateSortButton(evt) {
  const { header } = evt.detail;
  const sortButton = $("button", header);
  const { col, sortingOrder } = sortButton.dataset;
  const { propValues, nodes } = UI_STATES.SORTING_ORDER;
  const currentSortingPos = propValues.indexOf(sortingOrder);
  const nextSortingPos = (currentSortingPos + 1) % propValues.length;
  const newButton = UI_ELS[nodes[nextSortingPos]].cloneNode(true);
  newButton.dataset.col = col;
  newButton.addEventListener("click", () => {
    header.closest("table").dispatchEvent(
      new CustomEvent(EVENTS.SORT_CHANGED, {
        detail: {
          header: header,
        },
      })
    );
  });
  sortButton.replaceWith(newButton);
}

function sortRows(evt) {
  const { header } = evt.detail;
  const table = header.closest("table");
  const sortButton = $("button", header);
  const { col, sortingOrder } = sortButton.dataset;
  const cellsMass = $("tbody", table);
  const sortable = cellsMass.cloneNode(true);
  const getValue = (col) => (row) => row.children[col].innerHTML;
  const original = $clone(getNodeMeta(table,"originalRows"));
  const sorted = original
    .sort((A, B) => {
      const getNthCell = getValue(col);
      const [AValue, BValue] = [A, B].map((n) => getNthCell(n));
      const comparator = COMPARATORS[sortingOrder];
      return comparator(AValue, BValue);
    })
    .map((toClone) => toClone.cloneNode(true));
  sortable.innerHTML = "";
  sortable.append(...(sortingOrder === "none" ? original : sorted));
  cellsMass.replaceWith(sortable);
}

function filterRows(evt) {
  const { target: table, detail } = evt;
  const { filter } = detail;
  const rows = getNodeMeta(table, "originalRows");
  if (!filter) {
    $("tbody", table).innerHTML = "";
    $("tbody", table).append(...rows);
  } else {
    const filtered = rows.filter((row) => {
      return [...row.children].some((td) => td.innerHTML.includes(filter));
    });
    $("tbody", table).innerHTML = "";
    $("tbody", table).append(
      ...(filtered.length
        ? filtered
        : [$html(`<tr><td colspan="12">No results</td></tr>`)])
    );
  }
}

function makeHeadersSortable(table) {
  const headers = $$("th", table);
  headers.forEach(makeHeaderSortable);
}

function makeFilters(table) {
  const tableForm = UI_ELS.SEARCH_FORM.cloneNode(true);
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
  tableForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    table.dispatchEvent(
      new CustomEvent(EVENTS.FILTER_CHANGED, {
        detail: {
          filter: $("input", tableForm).value,
        },
      })
    );
  });
  table.parentNode.insertBefore(tableForm, table);
}

function makeHeaderSortable(header, pos) {
  const { SORTABLE_HEADER, BUTTON_SORT_UNSORTED } = UI_ELS;
  const upgradedHeader = SORTABLE_HEADER.cloneNode(true);
  const sortButton = BUTTON_SORT_UNSORTED.cloneNode(true);

  sortButton.addEventListener("click", () => {
    header.closest("table").dispatchEvent(
      new CustomEvent(EVENTS.SORT_CHANGED, {
        detail: {
          header: header,
        },
      })
    );
  });
  sortButton.dataset.col = pos;
  $(".sortable-header-text", upgradedHeader).innerText = header.innerText;
  $(".sortable-header-actions", upgradedHeader).append(sortButton);
  header.innerHTML = "";
  header.append(upgradedHeader);
}
