'use strict';

const { Graph } = require('../src/classes/Graph');

function createDistancesList(nodes, source) {
  const distances = new Map();
  for (const node of nodes) {
    distances.set(node, { distance: Infinity, previous: null });
  }

  distances.set(source, { distance: 0, previous: null });

  return distances;
}

function updateDistancesList(currentNode, distances) {
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
  }
}

function findMinNode(nodes, distances, visited) {
  let minNode = null;
  let minDistance = Infinity;

  for (const node of nodes) {
    const { distance } = distances.get(node);
    if (distance < minDistance && !visited.has(node)) {
      minDistance = distance;
      minNode = node;
    }
  }
  return minNode;
}

function buildFullPath(target, distances) {
  const path = [target];
  let currentPrev = target;

  while (currentPrev) {
    currentPrev = distances.get(currentPrev).previous;
    if (currentPrev) {
      path.unshift(currentPrev);
    }
  }

  return path;
}

function findShortestPath(source, target) {
  if (source.graph !== target.graph) {
    throw new Error('Source and target nodes must be from the same graph');
  }

  const nodes = source.graph.getNodes();
  const distances = createDistancesList(nodes, source);
  const visited = new Set();
  const queue = [];

  queue.push(source);

  while (queue.length) {
    const currentNode = queue.shift();
    if (visited.has(currentNode)) {
      continue;
    }
    visited.add(currentNode);

    updateDistancesList(currentNode, distances);
    const minNode = findMinNode(nodes, distances, visited);
    if (minNode) {
      queue.push(minNode);
    }
  }

  const { distance } = distances.get(target);
  const path = buildFullPath(target, distances);
  return distance === Infinity ? null : { distance, path };
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
const { distance, path } = findShortestPath(donetsk, lviv);

console.log('Minimal distance from donetsk to lviv:', distance);
console.log(path);
