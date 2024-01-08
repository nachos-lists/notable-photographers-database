import { $, $clone } from "../../util";
import COMPARATORS from "../../constants/COMPARATORS";
import { getNodeMeta } from "../../util/meta";

export default function sortRows(evt) {
  const { header } = evt.detail;
  const table = header.closest("table");
  const sortButton = $("button", header);
  const { col, sortingOrder } = sortButton.dataset;
  const cellsMass = $("tbody", table);
  const sortable = $clone(cellsMass);
  const getValue = (col) => (row) => row.children[col].innerHTML;
  const original = $clone(getNodeMeta(table, "visibleRows"));
  const sortedByComparator = original.sort(function (A, B) {
    const [AValue, BValue] = [A, B].map((n) => getValue(col)(n));
    const comparator = COMPARATORS[sortingOrder];

    return comparator(AValue, BValue);
  });
  const sorted = $clone(sortedByComparator);

  sortable.innerHTML = "";
  sortable.append(...(sortingOrder === "none" ? original : sorted));
  cellsMass.replaceWith(sortable);
}
