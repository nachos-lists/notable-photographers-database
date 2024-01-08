import UI_ELS from "../../constants/UI_ELS";
import UI_STATES from "../../constants/UI_STATES";
import SortChanged from "../../events/SortChanged";
import { $, $clone, on, trigger } from "../../util";

export default function updateSortButton(evt) {
  const { header } = evt.detail;
  const sortButton = $("button", header);
  const { col, sortingOrder } = sortButton.dataset;
  const { propValues, nodes } = UI_STATES.SORTING_ORDER;
  const currentSortingPos = propValues.indexOf(sortingOrder);
  const nextSortingPos = (currentSortingPos + 1) % propValues.length;
  const newButton = $clone(UI_ELS[nodes[nextSortingPos]]);

  newButton.dataset.col = col;
  on(newButton, "click", () => {
    trigger(header.closest("table"), new SortChanged(header));
  });
  sortButton.replaceWith(newButton);
}
