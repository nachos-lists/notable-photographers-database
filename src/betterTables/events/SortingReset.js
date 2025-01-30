import EVENTS from "../constants/EVENTS";

export default class SortingReset extends CustomEvent {
  constructor() {
    super(EVENTS.SORT_RESET);
  }
}
