export default function filterable(betterTable) {
  console.log("at #filterable", { events: betterTable.events });
  betterTable.addEventListener(
    betterTable.events.AFTER_RENDER_DATA,
    ({ detail }) => {
      const was = [...detail.data];
      detail.data.length = 0;
      detail.data.push(...was);
    }
  );
}
