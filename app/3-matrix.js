'use strict';

const { Graph } = require('../src/classes/Graph');

const graph = new Graph('NODES', true);
const [zero, one, two, three] = graph.addManyNodes([0, 1, 2, 3]);

graph.linkNode(zero)
  .with(zero, 0)
  .with(one, 1)
  .with(two, 2);

graph.linkNode(one)
  .with(zero, 3)
  .with(three, 4);

graph.linkNode(three)
  .with(zero, 5)
  .with(one, 6)
  .with(two, 7);

const adjMatrix = graph.toAdjMatrix(false);
console.log('ADJACENCY MATRIX:');
console.table(adjMatrix);

const weightsMatrix = graph.toAdjMatrix();
console.log('WEIGHTS MATRIX:');
console.table(weightsMatrix);

const incidenceMatrix = graph.toIncidenceMatrix();
console.log('INCIDENCE MATRIX:');
console.table(incidenceMatrix);

const toInputAdjMatrix = [ [2, 0], [0, 1]];
const fromAdjGraph = new Graph('FROM ADJ', false);

fromAdjGraph.fromAdjMatrix(toInputAdjMatrix);
console.log(fromAdjGraph.toString());
