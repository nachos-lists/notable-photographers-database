import UI_ELS from "../../constants/UI_ELS";
import SortChanged from "../../events/SortChanged";
import { $, $clone, on, trigger } from "../../util";

export default function makeHeaderSortable(header, pos) {
  const table = header.closest("table");
  const { SORTABLE_HEADER, BUTTON_SORT_UNSORTED } = UI_ELS;
  const $header = $clone(SORTABLE_HEADER);
  const sortButton = $clone(BUTTON_SORT_UNSORTED);

  on(sortButton, "click", () => trigger(table, new SortChanged($header)));
  sortButton.dataset.col = pos;
  $(".sortable-header-text", $header).innerText = header.innerText;
  $(".sortable-header-actions", $header).append(sortButton);
  header.replaceWith($header);
}
