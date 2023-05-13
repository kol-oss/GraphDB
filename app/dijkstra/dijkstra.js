'use strict';

const { cities } = require('./input.js');

function getMin(map) {
  let minWeight = Infinity;

  minWeight = Math.min(...map.keys());

  const minNode = map.get(minWeight);
  return { weight: minWeight, node: minNode };
}

function distances(start) {
  const checked = new Array();
  const ways = new Map(); // weight => node
  const toCheck = new Map(); // weight => node

  toCheck.set(0, start); // set startpoint

  let current;
  while (toCheck.size !== 0) {
    current = getMin(toCheck);
    const { node, weight } = current;
    toCheck.delete(weight);

    const links = node.links.out;

    if (!links) continue;
    for (const link of links.values()) {
      const { end: linkEnd, weight: linkWeight } = link;
      if (checked.includes(linkEnd)) continue;

      const updated = linkWeight + weight;
      const { data } = linkEnd;
      const existing = ways.get(data);

      if (!existing)
        ways.set(data, updated);
      if (existing > updated)
        ways.set(data, updated);
      toCheck.set(updated, linkEnd);
    }
    checked.push(node);
  }

  return ways;
}

for (const city of cities.nodes) {
  console.log('From', city.data, distances(city));
}
