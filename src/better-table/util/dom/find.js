export default function find(parent, sel, all) {
  let result = parent["querySelector" + (all ? "All" : "")](sel);
  return all ? [...(result || [])] : result;
}
