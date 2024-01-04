import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { promises } from "fs";
import { resolve } from "path";
import { parseHTML } from "linkedom";

const TABLE_CAPTION = "This is an example table caption";
const PATH_TO_INDEX = "./src/index.html";
const PATH_TO_DIST_INDEX = "./index.html";

const { SPREADSHEET_ID, SERVICE_EMAIL, PRIVATE_KEY } = process.env;

console.log({ // this should show up all correctly blanked out
  SPREADSHEET_ID:Boolean(SPREADSHEET_ID), SERVICE_EMAIL:Boolean(SERVICE_EMAIL), PRIVATE_KEY:Boolean(PRIVATE_KEY)
});

const out = console.log.bind(console, "[Parse Sheet into HTML]");

(async function parseSheetIntoHTML() {
  // bail out if _any_ env value is missing
  if (![SPREADSHEET_ID, SERVICE_EMAIL, PRIVATE_KEY].every((v) => Boolean(v))) {
    out("Missing env variables");
    process.exit(1);
  }

  out("Parsing Sheet into a new HTML file");
  const data = await getSheetData();

  out("Got Sheet with headers: ", data.headers);
  await updateIndex(data);

  out("Index file updated; exiting");
})();

function find(parent, selector) {
  return parent.querySelector(selector);
}

function htmlFromString(doc, htmlString) {
  const wrapper = doc.createElement("wrapper");
  wrapper.innerHTML = htmlString;
  return wrapper.firstElementChild;
}

async function updateIndex(data) {
  const absolutePathToIndex = resolve(process.cwd(), PATH_TO_INDEX);
  const absolutePathtoDistIndex = resolve(process.cwd(), PATH_TO_DIST_INDEX);
  const indexFile = await promises.readFile(absolutePathToIndex, "utf-8");

  const { document } = parseHTML(indexFile);
  const $ = find.bind(find, document);
  const $html = htmlFromString.bind(htmlFromString, document);
  const tableString = buildTableFromData(data);

  const [DOM_MAIN] = [$("main")];

  DOM_MAIN.replaceWith(
    $html(
      `<main class="horizontal-scroll-except-first-column">${tableString}</main>`
    )
  );

  await promises.writeFile(
    absolutePathtoDistIndex,
    document.documentElement.outerHTML,
    "utf-8"
  );

  return true;
}

function buildTableFromData({ headers, data }) {
  const { keys } = Object;
  const tableCaption = TABLE_CAPTION;
  const tableHead = [
    "<tr>",
    headers.map((h) => `<th>${h}</th>`).join(""),
    "</tr>",
  ].join("");
  const tableBody = [];
  for (const row of data) {
    const htmlRow = ["<tr>"];
    for (const key of keys(row)) {
      htmlRow.push(`<td>${row[key] || ""}</td>`);
    }
    htmlRow.push("</tr>");
    tableBody.push(htmlRow.join(""));
  }
  const tableFoot = `<tr><td colspan="11">Total:</td><td>${data.length}</td></tr>`;

  return `
    <table>
      <caption>${tableCaption}</caption>
      <thead>${tableHead}</thead>
      <tbody>${tableBody.join("\n")}</tbody>
      <tfoot>${tableFoot}</tfoot>
    </table>
  `;
}

async function getSheetData() {
  const { keys, fromEntries } = Object;

  const jwt = new JWT({
    email: SERVICE_EMAIL,
    key: PRIVATE_KEY,
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/drive.file",
    ],
  });

  const doc = new GoogleSpreadsheet(SPREADSHEET_ID, jwt);
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[SHEET_POSITION];
  const rows = (await sheet.getRows()).map((r) => r.toObject());

  return {
    headers: keys(
      rows.reduce((all, cur) => {
        return {
          ...all,
          ...fromEntries(keys(cur).map((k) => [k, true])),
        };
      }, {})
    ),
    data: rows,
  };
}
