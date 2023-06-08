'use strict';

const { Graph } = require('../src/classes/Graph');

const citiesAsObj = [
  { 'name': 'London', 'country': 'UK', 'language': 'English' },
  { 'name': 'Washington', 'country': 'US', 'language': 'English' },
  { 'name': 'Berlin', 'country': 'GR', 'language': 'German' },
  { 'name': 'Rome', 'country': 'IT', 'language': 'Italian' },
];

// CREATE UNDIRECTED GRAPH WITH KEYFIELD
const graph = new Graph('CITIES', true, 'name');
const [l, w, b, r] = graph.addManyNodes(citiesAsObj);

graph.linkNode(l).with(w);
graph.linkNode(l).with(l);
graph.linkNode(l).with(b);

const adjMatrix = graph.toAdjMatrix();
console.log('Adjacency matrix:');
console.table(adjMatrix);

const copyGraph = new Graph('CITIES', true);
copyGraph.fromAdjMatrix(adjMatrix);
console.table(adjMatrix);

console.log(graph.toString());
