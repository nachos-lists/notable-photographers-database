import find from "../util/dom/find";
import htmlFromString from "../util/dom/htmlFromString";
const HEADER_BUTTON_SYMBOLS = {
  UNSORTED: "&#8597;",
  ASC: "&#8593;",
  DESC: "&#8595;",
};
const SORTING_ORDER = ["UNSORTED", "ASC", "DESC"];

const EVENTS = {
  SORT_UPDATED: "better-table-sortable:sort-updated",
};

export default function sortable(betterTable) {
  betterTable.addEventListener(
    betterTable.events.BEFORE_RENDER_HEADERS,
    ({ detail }) => {
      const { headers } = detail;
      const handleOnSortClicked = onSortButtonClicked.bind(
        onSortButtonClicked,
        betterTable
      );
      const handleOnSortChanged = onButtonSortOrderUpdated.bind(
        onButtonSortOrderUpdated,
        betterTable
      );

      const newHeaders = headers.map((header, col) =>
        htmlFromString(`
            <th>
                <div class="better-table-sortable better-table-sortable--header">
                    <div class="better-table-sortable better-table-sortable--header--label">${header}</div>
                    <div class="better-table-sortable better-table-sortable--header--actions">
                      <button class="better-table-sortable--header--actions better-table-sortable--header--actions--sort" data-col="${col}" data-order="${SORTING_ORDER[0]}">${HEADER_BUTTON_SYMBOLS.UNSORTED}</button>
                    </div>
                </div>
            </th>
        `)
      );

      newHeaders.forEach((header) => {
        const sortHeader = find(
          header,
          ".better-table-sortable--header--actions--sort"
        );
        sortHeader.addEventListener("click", handleOnSortClicked);
        sortHeader.addEventListener(EVENTS.SORT_UPDATED, handleOnSortChanged);
      });

      headers.length = 0;
      headers.push(...newHeaders);
    }
  );
}

function onSortButtonClicked(betterTable, { target }) {
  let { order } = target.dataset;
  const { col } = target.dataset;
  order =
    SORTING_ORDER[(SORTING_ORDER.indexOf(order) + 1) % SORTING_ORDER.length];
  const model = betterTable.toJSON();
  const sorted = model.data.sort((A, B) => {
    const [valueA, valueB] = [A, B].map((v) =>
      String(v[model.headers[Number(col)]]).trim()
    );

    if (!valueA) {
      return 1;
    }
    if (!valueB) {
      return -1;
    }
    let value = valueA > valueB ? 1 : valueA === valueB ? 0 : -1;
    if (order === SORTING_ORDER[2]) {
      value = valueA < valueB ? 1 : valueA === valueB ? 0 : -1;
    }
    return value;
  });

  betterTable.dispatchEvent(
    new CustomEvent(betterTable.events.ROWS_CHANGED, {
      detail: {
        sorted,
        col,
      },
    })
  );
  target.dispatchEvent(
    new CustomEvent(EVENTS.SORT_UPDATED, {
      detail: {
        order,
      },
    })
  );
}

function onButtonSortOrderUpdated(betterTable, { target, detail }) {
  const { order } = detail;
  target.innerHTML = HEADER_BUTTON_SYMBOLS[order];
  target.dataset.order = order;
}
