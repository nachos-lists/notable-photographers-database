import find from "./find";
import containsSelector from "./containsSelector";

export default function DOMTableToJSON(table) {
  const $$ = find.bind(find, table);
  const $contains = containsSelector.bind(containsSelector, table);

  const headers = [];
  const data = [];

  let headerSelector = "th";
  const hasProperHeaders = $contains(headerSelector);
  if (!hasProperHeaders) {
    headerSelector = "tr:first-child td";
  }

  headers.push(
    ...$$(headerSelector, true).map((THead) => String(THead.innerText).trim())
  );

  if (hasProperHeaders) {
    $$("tr", true)
      .filter(
        (row) =>
          containsSelector(row, "td") && Boolean(row.closest("tfoot")) === false
      )
      .forEach((row) => {
        const rowObj = {};
        headers.forEach((header, pos) => {
          const cell = row.children[pos];
          if (cell) {
            rowObj[header] = cell.innerText;
          }
        });
        data.push(rowObj);
      });
  }

  return { headers, data };
}
