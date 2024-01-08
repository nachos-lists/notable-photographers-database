import { $clone } from "../../util";
import renderFilterFormEntry from "./renderFilterFormEntry";

export default function renderFiltersList(table, oldList, activeFilters) {
  const newList = $clone(oldList);
  const newListEls = [];
  activeFilters.forEach((f) => {
    newListEls.push(renderFilterFormEntry(table, f));
  });
  if (newListEls.length) {
    newList.innerHTML = "";
    newList.append(...newListEls);
  }

  return newList;
}
