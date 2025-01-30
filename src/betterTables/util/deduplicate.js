const { keys, values } = Object;

export function deduplicatePrimitives(primitives, { excludeEmpty } = {}) {
  const dict = {};
  primitives.forEach((p) => {
    if (excludeEmpty && !p) {
      return;
    }
    dict[p] = true;
  });
  return keys(dict);
}

export function deduplicateObjectsBy(objects, prop, { excludeEmpty } = {}) {
  const dict = {};
  objects.forEach((o) => {
    if (excludeEmpty && !o[prop]) {
      return;
    }
    dict[o[prop]] = o;
  });

  return values(dict);
}
