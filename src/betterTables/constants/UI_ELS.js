import { $html } from "../util/index";

const UI_ELS = {
  BUTTON_SORT_ASC: $html(`<button data-sorting-order="asc">↓</button>`),
  BUTTON_SORT_DESC: $html(`<button data-sorting-order="desc">↑</button>`),
  BUTTON_SORT_UNSORTED: $html(`<button data-sorting-order="none">↕</button>`),
  SORTABLE_HEADER: $html(`<th>
  <div class="sortable-header">
    <div class="sortable-header sortable-header-text"></div>
    <div class="sortable-header sortable-header-actions"></div>
  </div></th>`),
  SEARCH_FORM: $html(`
  <form>
  <fieldset><legend>Search</legend>
    <input type="search" />
    <button type="submit">Search</button>
  </fieldset>
  <fielset hidden>
    <datalist></datalist>
  </fieldset>
  </form>`),
  FILTERS_FORM: $html(`
  <form>
  <fieldset id="applied-filters">
  <legend>Applied filters</legend>
    <ol>
      <li>No filters</li>
    </ol>
  </fieldset>
  <fieldset>
  <legend>Filter</legend>
  <dl>
    <dt>Filter by</dt>
    <dd>
      <div class="stack stack-horz">
        <select id="filter-by-columns">
          <option value="">Column</option>          
        </select>
        <select id="filter-by-col-values">
          <option value="">Value</option>          
        </select>
      </div>
    </dd>
  </dl>
  <div class="stack stack-horz">
    <button type="button" id="filters-add-filter">Add filter</button>
  </div>
  </fieldset>
  </form>`),
  FILTERS_FORM_ENTRY: $html(`
    <li><div class="stack stack-horz">
      <div class="filters filters-controls"><button type="button">⨉</button></div>
      <div class="filters filters-column"></div>
      <div class="filters filters-value"></div>
    </div></li>
  `),
};

export default UI_ELS;
