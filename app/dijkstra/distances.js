'use strict';

const { cities } = require('./input.js');

function getMin(map) {
  let minWeight = Infinity;
  let minNode;

  for (const [node, weight] of map.entries()) {
    if (weight < minWeight) {
      minWeight = weight;
      minNode = node;
    }
  }
  return { weight: minWeight, node: minNode };
}

function distances(start) {
  const checked = new Array();
  const ways = new Map(); // weight => node
  const toCheck = new Map(); // weight => node

  toCheck.set(start, 0); // set startpoint

  let current;
  while (toCheck.size) {
    current = getMin(toCheck);
    const { node, weight } = current;
    toCheck.delete(node);

    const links = node.links.out;

    if (!links) continue;
    for (const link of links.values()) {
      const { end: linkEnd, weight: linkWeight } = link;
      if (checked.includes(linkEnd)) continue;

      const updated = linkWeight + weight;
      const { data } = linkEnd;
      const existing = ways.get(data);

      const optimal = (!existing || updated < existing) ? updated : existing;

      if (!existing || existing > updated)
        ways.set(data, optimal);
      toCheck.set(linkEnd, optimal);
    }
    checked.push(node);
  }

  return ways;
}

for (const city of cities.nodes) {
  console.log('From', city.data, distances(city));
}
