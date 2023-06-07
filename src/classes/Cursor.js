'use strict';

const { Graph } = require('./Graph');

class Cursor {
  findShortestPath(source, target) {
    if (source.graph !== target.graph) {
      throw new Error('Source and target nodes must be from one graph');
    }

    const { nodes } = source.graph;

    const weights = new Map(); // node => [weight, prev]
    const visited = new Set();
    const queue = [];

    for (const node of nodes) {
      weights.set(node, [Infinity, null]);
    }

    weights.set(source, [0, null]);
    queue.push(source);
    while (queue.length !== 0) {
      const currentNode = queue.shift();
      if (visited.has(currentNode)) {
        continue;
      }

      visited.add(currentNode);

      let minNode = null;
      let minWeight = Infinity;

      for (const link of currentNode.links) {
        const { weight, target: linkTarget } = link;
        const [ currentWeight ] = weights.get(currentNode);
        const [ targetWeight ] = weights.get(linkTarget);

        const changedWeight = currentWeight + weight;

        if (targetWeight > changedWeight) {
          weights.set(linkTarget, [ changedWeight, currentNode ]);
        }

        if (minWeight > weight && !visited.has(linkTarget)) {
          minWeight = weight;
          minNode = linkTarget;
        }
      }
      if (minNode) queue.push(minNode);
    }
    return weights.get(target);
  }
}

const cities = new Graph('CITIES', false);
const [
  kiev,
  kherson,
  lviv,
  odessa
] = cities.addManyNodes('KIEV', 'KHERSON', 'LVIV', 'ODESSA');

cities.linkNode(kiev)
  .with(kherson, 800)
  .with(lviv, 900)
  .with(odessa, 1100);

cities.linkNode(kherson)
  .with(lviv, 1200)
  .with(odessa, 200);

const cursor = new Cursor();
const answer = cursor.findShortestPath(odessa, kiev);
console.log(answer);

module.exports = {
  Cursor
};
