import EVENTS from "../constants/EVENTS";

export default class FiltersColumnSelected extends CustomEvent {
  get column() {
    return this.detail.column;
  }
  constructor(column) {
    super(EVENTS.FILTERS_COLUMN_SELECTED, {
      detail: {
        column,
      },
    });
  }
}
