import { $html } from "../util/index";

const UI_ELS = {
  BUTTON_SORT_ASC: $html(`<button data-sorting-order="asc">↓</button>`),
  BUTTON_SORT_DESC: $html(`<button data-sorting-order="desc">↑</button>`),
  BUTTON_SORT_UNSORTED: $html(`<button data-sorting-order="none">↕</button>`),
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
  </form>`),
};

export default UI_ELS;