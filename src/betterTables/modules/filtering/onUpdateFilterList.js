import FILTER_LIST_UPDATE_TYPES from "../../constants/FILTER_LIST_UPDATE_TYPES";
import FilterListUpdated from "../../events/FilterListUpdated";
import { trigger } from "../../util";
import { getNodeMeta, setNodeMeta } from "../../util/meta";

export default function onUpdateFilterList(evt) {
  const { detail, target: table } = evt;
  const { filter, update } = detail;
  const list = getNodeMeta(table, "filters");
  const idx = list.findIndex((f) => f.column === filter);
  const exists = idx > -1;
  switch (update.type) {
    case FILTER_LIST_UPDATE_TYPES.REPLACE:
      if (exists) {
        list[idx].value = update.value;
      } else {
        list.push({
          column: filter,
          value: update.value,
        });
      }
      break;
    case FILTER_LIST_UPDATE_TYPES.ADD:
      if (exists) {
        return trigger(
          table,
          new FilterListUpdated(filter, {
            type: FILTER_LIST_UPDATE_TYPES.REPLACE,
            value: update.value,
          })
        );
      }
      list.push({
        column: filter,
        value: update.value,
      });
      break;
    case FILTER_LIST_UPDATE_TYPES.REMOVE:
      if (!exists) {
        return;
      }
      list.splice(idx, 1);
      break;
  }

  setNodeMeta(table, "filters", list);
}
