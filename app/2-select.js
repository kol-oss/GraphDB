'use strict';

const { Graph } = require('../src/classes/Graph');

const citiesAsObj = [
  { 'name': 'London', 'country': 'UK', 'language': 'English' },
  { 'name': 'Washington', 'country': 'US', 'language': 'English' },
  { 'name': 'Berlin', 'country': 'GR', 'language': 'German' },
  { 'name': 'Rome', 'country': 'IT', 'language': 'Italian' },
];

const citiesAsStr = [ 'LONDON', 'WASHINGTON', 'BERLIN', 'ROME'];

// CREATE UNDIRECTED GRAPH WITH KEYFIELD
const graph = new Graph('CITIES', false, 'country');

// ADD NODES WITH DATA AS OBJECT
graph.addManyNodes(citiesAsObj);

// SELECT ALL NODES' FIELDS [NAME] AND [LANGUAGE]
console.log('Names and languages:');
console.log(graph.select(['name', 'language']));

// SELECT ALL NODES WHERE LANGUAGE IS ENGLISH
console.log('English languages:');
console.log(graph.selectByData({ 'language': 'English' }));

// DELETE ALL NODES
Graph.clearGraph(graph);

// CREATE GRAPH WITHOUT KEYFIELD
const primitiveGraph = new Graph('CITIES');

// ADD NODES WITH DATA AS PRIMITIVES
primitiveGraph.addManyNodes(citiesAsStr);
console.log('SELECT WASHINGTON:');
console.log(primitiveGraph.selectByData('WASHINGTON'));

