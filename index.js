(() => {
  // src/betterTables/util/index.js
  var [$, $$] = [
    (sel, parent = document) => parent.querySelector(sel),
    (sel, parent = document) => [...parent.querySelectorAll(sel) || []]
  ];
  var $clone = (els) => {
    return els instanceof Array ? els.map((el2) => el2.cloneNode(true)) : el.cloneNode(true);
  };
  var $html = (str) => {
    const tpl = document.createElement("template");
    tpl.innerHTML = str;
    return tpl.content.firstElementChild;
  };

  // src/betterTables/util/meta.js
  var { assign } = Object;
  var META = /* @__PURE__ */ new WeakMap();
  function getNodeMeta(node, key) {
    if (META.has(node)) {
      return META.get(node)[key];
    }
  }
  function setNodeMeta(node, key, value) {
    let prevData = {};
    if (META.has(node)) {
      prevData = META.get(node);
    }
    META.set(node, {
      ...prevData,
      [key]: value
    });
  }

  // src/betterTables/constants/UI_ELS.js
  var UI_ELS = {
    BUTTON_SORT_ASC: $html(`<button data-sorting-order="asc">\u2193</button>`),
    BUTTON_SORT_DESC: $html(`<button data-sorting-order="desc">\u2191</button>`),
    BUTTON_SORT_UNSORTED: $html(`<button data-sorting-order="none">\u2195</button>`),
    SORTABLE_HEADER: $html(`<div class="sortable-header">
    <div class="sortable-header sortable-header-text"></div>
    <div class="sortable-header sortable-header-actions"></div>
  </div>`),
    SEARCH_FORM: $html(`
  <form>
  <fieldset><legend>Search</legend>
    <input type="search" />
    <button type="submit">Search</button>
  </fieldset>
  <fielset hidden>
    <datalist></datalist>
  </fieldset>
  </form>`)
  };
  var UI_ELS_default = UI_ELS;

  // src/betterTables/constants/UI_STATES.js
  var UI_STATES = {
    SORTING_ORDER: {
      nodes: ["BUTTON_SORT_UNSORTED", "BUTTON_SORT_ASC", "BUTTON_SORT_DESC"],
      propValues: ["none", "asc", "desc"]
    }
  };
  var UI_STATES_default = UI_STATES;

  // src/betterTables/constants/EVENTS.js
  var EVENTS = {
    SORT_CHANGED: "sortable::sortChanged",
    FILTER_CHANGED: "filterable::filterChanged"
  };
  var EVENTS_default = EVENTS;

  // src/betterTables/constants/COMPARATORS.js
  function compareAsc(AValue, BValue) {
    const [comparableA, comparableB] = [
      AValue.replace(/([^A-Za-z0-9]{1,})/, "\xFF"),
      BValue.replace(/([^A-Za-z0-9]{1,})/, "\xFF")
    ];
    if (!comparableA) {
      console.log("no AValue");
      return 1;
    }
    if (!comparableB) {
      console.log("no BValue");
      return -1;
    }
    return comparableA > comparableB ? 1 : comparableA === comparableB ? 0 : -1;
  }
  function compareDesc(AValue, BValue) {
    const [comparableA, comparableB] = [
      AValue.replace(/([^A-Za-z0-9]{1,})/, "\xFF"),
      BValue.replace(/([^A-Za-z0-9]{1,})/, "\xFF")
    ];
    if (!comparableA) {
      console.log("no AValue");
      return 1;
    }
    if (!comparableB) {
      console.log("no BValue");
      return -1;
    }
    return comparableA > comparableB ? -1 : comparableA === comparableB ? 0 : 1;
  }
  function compareNone(AValue, BValue) {
  }
  var COMPARATORS = {
    asc: compareAsc,
    desc: compareDesc,
    none: compareNone
  };
  var COMPARATORS_default = COMPARATORS;

  // src/index.js
  document.addEventListener("DOMContentLoaded", () => {
    $$("table").forEach(enhanceTable);
  });
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
    const {
      SORT_CHANGED,
      FILTER_CHANGED
    } = EVENTS_default;
    table.addEventListener(SORT_CHANGED, updateSortButton);
    table.addEventListener(SORT_CHANGED, sortRows);
    table.addEventListener(FILTER_CHANGED, filterRows);
  }
  function updateSortButton(evt) {
    const { header } = evt.detail;
    const sortButton = $("button", header);
    const { col, sortingOrder } = sortButton.dataset;
    const { propValues, nodes } = UI_STATES_default.SORTING_ORDER;
    const currentSortingPos = propValues.indexOf(sortingOrder);
    const nextSortingPos = (currentSortingPos + 1) % propValues.length;
    const newButton = UI_ELS_default[nodes[nextSortingPos]].cloneNode(true);
    newButton.dataset.col = col;
    newButton.addEventListener("click", () => {
      header.closest("table").dispatchEvent(
        new CustomEvent(EVENTS_default.SORT_CHANGED, {
          detail: {
            header
          }
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
    const getValue = (col2) => (row) => row.children[col2].innerHTML;
    const original = $clone(getNodeMeta(table, "originalRows"));
    const sorted = original.sort((A, B) => {
      const getNthCell = getValue(col);
      const [AValue, BValue] = [A, B].map((n) => getNthCell(n));
      const comparator = COMPARATORS_default[sortingOrder];
      return comparator(AValue, BValue);
    }).map((toClone) => toClone.cloneNode(true));
    sortable.innerHTML = "";
    sortable.append(...sortingOrder === "none" ? original : sorted);
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
        ...filtered.length ? filtered : [$html(`<tr><td colspan="12">No results</td></tr>`)]
      );
    }
  }
  function makeHeadersSortable(table) {
    const headers = $$("th", table);
    headers.forEach(makeHeaderSortable);
  }
  function makeFilters(table) {
    const tableForm = UI_ELS_default.SEARCH_FORM.cloneNode(true);
    const uniques = {};
    for (const td of $$("tbody td", table)) {
      uniques[td.innerHTML] = true;
    }
    const uniqueValues = Object.keys(uniques).map(
      (k) => $html(`<option value="${k}"></option>"`)
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
        new CustomEvent(EVENTS_default.FILTER_CHANGED, {
          detail: {
            filter: $("input", tableForm).value
          }
        })
      );
    });
    table.parentNode.insertBefore(tableForm, table);
  }
  function makeHeaderSortable(header, pos) {
    const { SORTABLE_HEADER, BUTTON_SORT_UNSORTED } = UI_ELS_default;
    const upgradedHeader = SORTABLE_HEADER.cloneNode(true);
    const sortButton = BUTTON_SORT_UNSORTED.cloneNode(true);
    sortButton.addEventListener("click", () => {
      header.closest("table").dispatchEvent(
        new CustomEvent(EVENTS_default.SORT_CHANGED, {
          detail: {
            header
          }
        })
      );
    });
    sortButton.dataset.col = pos;
    $(".sortable-header-text", upgradedHeader).innerText = header.innerText;
    $(".sortable-header-actions", upgradedHeader).append(sortButton);
    header.innerHTML = "";
    header.append(upgradedHeader);
  }
})();
