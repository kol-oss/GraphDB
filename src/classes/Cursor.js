'use strict';

class Cursor {
  findShortestPath(source, target) {
    if (source.graph !== target.graph) {
      throw new Error('Source and target nodes must be from the same graph');
    }

    const { nodes } = source.graph;

    const distances = new Map(); // node => [distance, previous]
    const visited = new Set();
    const queue = [];

    for (const node of nodes) {
      distances.set(node, [Infinity, null]);
    }

    distances.set(source, [0, null]);
    queue.push(source);

    while (queue.length !== 0) {
      const currentNode = queue.shift();
      if (visited.has(currentNode)) {
        continue;
      }

      visited.add(currentNode);

      let minNode = null;
      let minDistance = Infinity;

      for (const link of currentNode.links) {
        const { weight, target: linkTarget } = link;
        const [ currentDistance ] = distances.get(currentNode);
        const [ targetDistance ] = distances.get(linkTarget);

        const updatedDistance = currentDistance + weight;

        if (targetDistance > updatedDistance) {
          distances.set(linkTarget, [ updatedDistance, currentNode ]);
        }

        if (minDistance > weight && !visited.has(linkTarget)) {
          minDistance = weight;
          minNode = linkTarget;
        }
      }
      if (minNode) {
        queue.push(minNode);
      }
    }

    const [distance, previous] = distances.get(target);
    return distance === Infinity ? null : { distance, previous };
  }
}

module.exports = {
  Cursor
};
