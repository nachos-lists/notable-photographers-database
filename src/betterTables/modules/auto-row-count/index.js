import { $, $$ } from "../../util";

export default function autoRowCount(evt) {
  const rows = $$("tbody tr", evt.target);
  const countTD = $("tfoot tr td:last-child", evt.target);
  countTD.innerHTML = rows.length;
}
