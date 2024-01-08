import EVENTS from "../constants/EVENTS";

export default class FilterListUpdated extends CustomEvent {
  constructor(filter, update) {
    super(EVENTS.FILTER_LIST_UPDATED, {
      detail: {
        filter,
        update,
      },
    });
  }
}
