const { assign } = Object;

export const META = new WeakMap();

export function getNodeMeta(node, key){
  if(META.has(node)){
    return META.get(node)[key];
  }
}
export function setNodeMeta(node, key, value){
  let prevData = {}
  if(META.has(node)){
    prevData = META.get(node);
  }
  META.set(node, {
    ...prevData,
    [key]: value
  })
}