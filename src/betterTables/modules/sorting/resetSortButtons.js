import { $$, on, trigger } from "../../util";
import UI_ELS from "../../constants/UI_ELS";

export default function resetSortButtons(evt) {
  const { target: table } = evt;

  const buttons = $$("th [data-sorting-order]", table);
  const toUpdate = [];
  for (const button of buttons) {
    if (button.dataset["sortingOrder"] !== "none") {
      toUpdate.push(button);
    }
  }
  toUpdate.forEach((button) => {
    const header = button.closest("th");
    const sortButton = $clone(UI_ELS.BUTTON_SORT_UNSORTED);
    on(sortButton, "click", () => {
      trigger(table, new SortChanged(header));
    });
    button.replaceWith(sortButton);
  });
}
