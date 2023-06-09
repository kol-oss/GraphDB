'use strict';

const { Graph } = require('../src/classes/Graph');

const citiesAsObj = [
  { 'name': 'London', 'country': 'UK', 'language': 'English' },
  { 'name': 'Washington', 'country': 'US', 'language': 'English' },
  { 'name': 'Berlin', 'country': 'GR', 'language': 'German' },
  { 'name': 'Rome', 'country': 'IT', 'language': 'Italian' },
];


const graph = new Graph('CITIES', true, 'name');
const [l, w, b, r] = graph.addManyNodes(citiesAsObj);

graph.linkNode(l).with(w, 2);
graph.linkNode(l).with(l, 4);
graph.linkNode(l).with(r, 5);
graph.linkNode(l).with(b, 2);

const incMatrix = graph.toIncidenceMatrix();
console.table(incMatrix);

/*
const adjMatrix = graph.toAdjMatrix(false);
const weightMatrix = graph.toAdjMatrix(false);
console.log('Adjacency matrix:');
console.table(adjMatrix);

console.log('Adjacency matrix:');
console.table(weightMatrix);*/
