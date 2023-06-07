'use strict';

const { Graph } = require('../src/classes/Graph');

const cities = [
  { 'name': 'London', 'country': 'UK', 'language': 'English' },
  { 'name': 'Washington', 'country': 'US', 'language': 'English' },
  { 'name': 'Berlin', 'country': 'GR', 'language': 'German' },
  { 'name': 'Rome', 'country': 'IT', 'language': 'Italian' },
];

const values = [ 'LONDON', 'PARIS', 'BERLIN', 'ROME'];

const graph = new Graph('CITIES', false, 'country');
const [ london, paris, berlin, rome ] = graph.addManyNodes(cities);

graph.linkNode(london).with(paris);
graph.linkNode(berlin).with(rome);

console.log('RESULT OF SEARCHING:');
console.log(graph.select(['name', 'language']));
