'use strict';

const fs = require('node:fs');
const { Graph } = require('./classes/Graph');

let graph;

fs.readFile('src/graph.txt', 'utf8', (error, data) => {
  if (error) {
    throw error;
  }

  const lines = data
    .split(';')
    .filter((line) => !!line)
    .map((line) => line.trim().toLowerCase());

  for (const line of lines) {
    if (line.includes('graph')) {
      if (graph) {
        throw new Error('Graph is already created');
      }
      const items = line.split(' ');

      const isDirected = items
        .slice(1, 2)[0];

      const graphName = items
        .slice(2)
        .join(' ')
        .toUpperCase()
        .trim();

      graph = new Graph(graphName, isDirected);
    } else if (line.includes('node')) {
      if (!graph) {
        throw new Error('You must create graph to add nodes');
      }
      const items = line.split(' ');

      const nodeData = items
        .slice(1)
        .join(' ')
        .trim();

      const parsedData = JSON.parse(nodeData);
      graph.addNode(parsedData);
    }
  }
});
