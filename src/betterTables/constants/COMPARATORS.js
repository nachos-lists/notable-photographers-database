function compareAsc(AValue, BValue) {
  const [comparableA, comparableB] = [
    AValue.replace(/([^A-Za-z0-9]{1,})/,"ÿ"),
    BValue.replace(/([^A-Za-z0-9]{1,})/,"ÿ"),
  ]
  if (!comparableA) {
    console.log("no AValue");
    return 1;
  }
  if (!comparableB) {
    console.log("no BValue");
    return -1;
  }
  return comparableA > comparableB ? 1 : comparableA === comparableB ? 0 : -1;
}

function compareDesc(AValue, BValue) {
  const [comparableA, comparableB] = [
    AValue.replace(/([^A-Za-z0-9]{1,})/,"ÿ"),
    BValue.replace(/([^A-Za-z0-9]{1,})/,"ÿ"),
  ]
  if (!comparableA) {
    console.log("no AValue");
    return 1;
  }
  if (!comparableB) {
    console.log("no BValue");
    return -1;
  }
  return comparableA > comparableB ?-1 : comparableA === comparableB ? 0 : 1;
}

function compareNone(AValue, BValue) {}

const COMPARATORS = {
  asc: compareAsc,
  desc: compareDesc,
  none: compareNone,
};

export default COMPARATORS;
