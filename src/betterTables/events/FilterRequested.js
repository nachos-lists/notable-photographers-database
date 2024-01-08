import EVENTS from "../constants/EVENTS";

export default class FilterRequested extends CustomEvent {
  constructor() {
    super(EVENTS.FILTER_REQUESTED);
  }
}
