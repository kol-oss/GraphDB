'use strict';

const { Graph } = require('../src/classes/Graph');
const { Cursor } = require('../src/classes/Cursor');

const cities = new Graph('CITIES');
const input = ['KIEV', 'LVIV', 'ODESSA', 'POLTAVA', 'DONETSK'];

const [
  kiev,
  lviv,
  odessa,
  poltava,
  donetsk
] = cities.addManyNodes(input);

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

const cursor = new Cursor();
const { distance } = cursor.findShortestPath(donetsk, lviv);

console.log('Minimal distance from donetsk to lviv:', distance);
