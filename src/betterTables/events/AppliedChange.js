import EVENTS from "../constants/EVENTS";

export default class AppliedChange extends CustomEvent {
  constructor(type, data) {
    super(EVENTS.APPLIED_CHANGE, {
      detail: {
        type,
        data,
      },
    });
  }
}
