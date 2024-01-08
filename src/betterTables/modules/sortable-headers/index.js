import { $$ } from "../../util";
import makeHeaderSortable from "./makeHeaderSortable";

export default function makeHeadersSortable(table) {
  $$("th", table).forEach(makeHeaderSortable);
}
