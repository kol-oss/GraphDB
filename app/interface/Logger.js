'use strict';

const { Node } = require('../../src/classes/Node.js');

const COLOURS = {
  'default': '\x1b[37m', // WHITE
  'error': '\x1b[31m', // RED
  'success': '\x1b[32m', // GREEN
  'warn': '\x1b[33m', // YELLOW
  'info': '\x1b[36m' // CYAN
};

function colourize(message, colour) {
  let textColour = COLOURS['default'];
  if (colour !== 'default') textColour = COLOURS[colour];

  console.log(`${textColour}${message}\x1b[0m`);
}


class Logger {
  log(message, type = 'default') {
    colourize(message, type);
  }

  node(node) {
    console.log(`Node #${node.id} [data]:`);
    console.dir(node.data);
  }
  link(link) {
    const { start, end, data, directed, weight } = link;
    console.dir({
      begin: Node.getById(start.graph, start.id),
      finish: Node.getById(end.graph, end.id),
      data,
      directed,
      weight
    });
  }
  graph(graph) {
    const { name, base, nodes } = graph;
    const outputNodes = nodes.map(({ id, data }) => ({ nodeId: id, data }));

    this.log(`Graph ${name}:`, 'info');
    console.dir({
      base,
      nodes: outputNodes
    }, { depth: 3 });
  }
  links(node) {
    const output = [];

    for (const link of node.neighbours) {
      const { start, end, data, directed, weight } = link;
      output.push({
        begin: Node.getById(node.graph, start.id),
        finish: Node.getById(node.graph, end.id),
        data,
        directed,
        weight
      });
    }

    this.log(`Node #${node.id} [links]:`, 'info');
    console.dir(output, { depth: 2 });
  }
}

const logger = new Logger();

module.exports = {
  logger
};
