import EVENTS from "../constants/EVENTS";

export default class SortChanged extends CustomEvent {
  get changedHeader() {
    return this.detail.header;
  }
  constructor(header) {
    super(EVENTS.SORT_CHANGED, {
      detail: {
        header,
      },
    });
  }
}
