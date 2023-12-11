import BetterTable, { util } from "./better-table/index.js";
import filterable from "./better-table/plugins/filterable.js";
import sortable from "./better-table/plugins/sortable.js";
import specialCells from "./better-table/plugins/special-cells.js";

document.addEventListener("DOMContentLoaded", () => {
  util.find(document, "table", true).forEach((table) => {
    const better = new BetterTable(table);
    better.plugins = [filterable, sortable, specialCells];
    better.render();
  });
});
