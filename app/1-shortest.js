'use strict';

const { Graph } = require('../src/classes/Graph');

function findShortestPath(source, target) {
  if (source.graph !== target.graph) {
    throw new Error('Source and target nodes must be from the same graph');
  }

  const nodes = source.graph.getNodes();

  const distances = new Map(); // node => { distance, previous }
  const visited = new Set();
  const queue = [];

  for (const node of nodes) {
    distances.set(node, { distance: Infinity, previous: null });
  }

  distances.set(source, { distance: 0, previous: null });
  queue.push(source);

  while (queue.length) {
    const currentNode = queue.shift();
    if (visited.has(currentNode)) {
      continue;
    }

    visited.add(currentNode);

    let minNode = null;
    let minDistance = Infinity;

    for (const link of currentNode.links) {
      const { weight, target: linkTarget } = link;
      const { distance: currentDistance } = distances.get(currentNode);
      const { distance: targetDistance } = distances.get(linkTarget);

      const updatedDistance = currentDistance + weight;

      if (targetDistance > updatedDistance) {
        distances.set(linkTarget, {
          distance: updatedDistance,
          previous: currentNode
        });
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

  const { distance } = distances.get(target);
  const wayFromEnd = [target];

  let currentPrev = target;
  while (currentPrev !== source) {
    currentPrev = distances.get(currentPrev).previous;
    wayFromEnd.unshift(currentPrev);
  }

  const wayFromStart = wayFromEnd;
  return distance === Infinity ? null : { distance, wayFromStart };
}

const cities = new Graph('CITIES');
const input = ['KIEV', 'LVIV', 'ODESSA', 'POLTAVA', 'DONETSK'];

// CREATTE CITIES LIST AND GET FROM ARRAY
const [
  kiev,
  lviv,
  odessa,
  poltava,
  donetsk
] = cities.addManyNodes(input);

// LINK NODES IN UNDIRECTED GRAPH
cities
  .linkNode(kiev)
  .with(lviv, 1000)
  .with(odessa, 800)
  .with(poltava, 300);

cities
  .linkNode(odessa)
  .with(lviv, 700)
  .with(poltava, 500);

cities
  .linkNode(poltava)
  .with(donetsk, 400);

// USE DIJSKTRA'S ALGORYTHM
const { distance, wayFromStart } = findShortestPath(donetsk, lviv);

console.log('Minimal distance from donetsk to lviv:', distance);
console.log(wayFromStart);
