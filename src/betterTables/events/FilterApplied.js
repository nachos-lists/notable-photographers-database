import EVENTS from "../constants/EVENTS";

export default class FilterApplied extends CustomEvent {
  get filter() {
    return this.detail.filter;
  }
  get changeType() {
    return this.detail.type;
  }
  constructor(type, filter) {
    super(EVENTS.FILTER_CHANGED, {
      detail: {
        type,
        filter,
      },
    });
  }
}
