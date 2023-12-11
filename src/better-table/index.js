import DOMTableToJSON from "./util/dom/DOMTableToJSON";
import find from "./util/dom/find";
import htmlFromString from "./util/dom/htmlFromString";

const { isArray } = Array;
const { entries } = Object;

export default class BetterTable {
  #original = undefined;
  #current = htmlFromString(`
          <figure class="better-table better-table--wrapper" data-is-better-table>
            <section hidden data-hidden aria-hidden="true" class="better-table better-table--prior-table">
            </section>
            <section class="better-table better-table--target">
                <table class="better-table better-table-instance">
                    <caption><tr><td>I will have some amazing shit here at some point</td></tr></caption>
                    <thead><tr><td>I will have some amazing shit here at some point</td></tr></thead>
                    <tbody><tr><td>I will have some amazing shit here at some point</td></tr></tbody>
                    <tfoot><tr><td>I will have some amazing shit here at some point</td></tr></tfoot>
                </table>
            </section>
        </figure>`);
  #plugins = [];
  #initial = true;
  #bound = ["handleRowsChanged", "handleHeadersChanged"];
  get events() {
    return {
      BEFORE_RENDER: "better-table:before-render",
      RENDER: "better-table:render",
      AFTER_RENDER: "better-table:after-render",
      BEFORE_RENDER_HEADERS: "better-table:before-render-headers",
      RENDER_HEADERS: "better-table:render-headers",
      AFTER_RENDER_HEADERS: "better-table:after-render-headers",
      BEFORE_RENDER_DATA: "better-table:before-render-data",
      RENDER_DATA: "better-table:render-data",
      AFTER_RENDER_DATA: "better-table:after-render-data",
      BEFORE_ROWS_CHANGED: "better-table:before-rows-changed",
      ROWS_CHANGED: "better-table:rows-changed",
      AFTER_ROWS_CHANGED: "better-table:after-rows-changed",
    };
  }

  set plugins(value) {
    if (!isArray(value)) {
      throw new Error("Plugins array musts be an array of plugins");
    }
    this.#plugins = value;
  }

  get current() {
    return this.#current.cloneNode(true);
  }

  constructor(node) {
    this.#original = node;
  }

  addEventListener(event, listener) {
    this.#current.addEventListener(event, listener);
  }

  dispatchEvent(eventObject) {
    this.#current.dispatchEvent(eventObject);
  }

  render() {
    if (this.#initial) {
      this.initialize();
    }
    this.updateMarkup();
  }

  updateMarkup() {
    const { headers, data } = this.toJSON();

    this.dispatchEvent(
      new CustomEvent(this.events.BEFORE_RENDER, {
        detail: { table: this },
      })
    );
    this.dispatchEvent(
      new CustomEvent(this.events.BEFORE_RENDER_HEADERS, {
        detail: { table: this, headers },
      })
    );
    this.renderHeaders(headers);
    this.dispatchEvent(
      new CustomEvent(this.events.AFTER_RENDER_HEADERS, {
        detail: { table: this },
      })
    );
    this.dispatchEvent(
      new CustomEvent(this.events.BEFORE_RENDER_DATA, {
        detail: { table: this, headers, data },
      })
    );
    this.renderData({ headers, data });
    this.dispatchEvent(
      new CustomEvent(this.events.AFTER_RENDER_DATA, {
        detail: { table: this, headers, data },
      })
    );

    find(this.#current, ".better-table--prior-table").append(
      this.#original.cloneNode(true)
    );
    this.#original.replaceWith(this.#current);

    this.dispatchEvent(
      new CustomEvent(this.events.AFTER_RENDER, { detail: { table: this } })
    );
  }

  renderHeaders(headers) {
    console.log("at #renderHeaders", { headers });
    const table = find(this.#current, ".better-table-instance");
    find(table, "thead", true).forEach((node) => node.remove());
    const newEl = htmlFromString("<thead><tr></tr></thead>");
    const DOMHeaders = document.createDocumentFragment();
    for (const header of headers) {
      if (!header) {
        continue;
      }
      if (header instanceof HTMLTableCellElement) {
        DOMHeaders.append(header);
      }
      if (header instanceof Function) {
        DOMHeaders.append(htmlFromString(header(this, headers)));
      } else if (header.constructor === String) {
        DOMHeaders.append(htmlFromString(`<th>${header}</th>`));
      }
    }
    find(newEl, "tr").append(DOMHeaders);
    table.insertAdjacentElement("afterbegin", newEl);
    // oldEl.replaceWith(newEl);
  }

  renderData({ headers, data }) {
    console.log("at #renderData", { headers, data });
    const table = find(this.#current, ".better-table-instance");
    find(table, "tbody", true).forEach((node) => node.remove());
    const newEl = htmlFromString("<tbody></tbody>");
    const DOMRows = document.createDocumentFragment();
    for (const datum of data) {
      if (!datum) {
        continue;
      }
      const htmlRow = htmlFromString("<tr></tr>");
      const children = document.createDocumentFragment();
      if (datum.constructor === Object) {
        for (const field in datum) {
          children.append(htmlFromString(`<td>${datum[field]}</td>`));
        }
      }
      htmlRow.append(children);
      DOMRows.append(htmlRow);
    }
    newEl.append(DOMRows);
    table.insertAdjacentElement("afterbegin", newEl);
    // oldEl.replaceWith(newEl);
  }

  initialize() {
    this.#plugins.forEach((plugin) => plugin(this));
    for (const bound of this.#bound) {
      this[bound] = this[bound].bind(this);
    }

    this.addEventListener(this.events.ROWS_CHANGED, this.handleRowsChanged);
    this.addEventListener(
      this.events.HEADERS_CHANGED,
      this.handleHeadersChanged
    );

    this.#initial = false;
  }

  handleRowsChanged({ detail }) {
    console.log(rows);
  }

  toJSON(table = this.#original) {
    return DOMTableToJSON(table);
  }
}

export const util = { find, htmlFromString };
