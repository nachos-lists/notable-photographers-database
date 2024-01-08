import { $ } from "../../util";
import makeFilters from ".";

export default function reRenderFilterForm(evt) {
  const { target: table } = evt;
  $("#applied-filters").parentNode.remove();
  makeFilters(table);
}
