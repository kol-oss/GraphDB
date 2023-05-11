'use strict';

const { Node } = require('./Node.js');

class Logger {
  printError(message) {
    console.log(message);
  }
  printNode(node) {
    console.log(`Node #${node.id} [data]:`);
    console.dir(node.data);
  }
  printGraph(graph) {
    const { name, base, nodes } = graph;
    const outputNodes = nodes.map(({ id, data }) => ({ nodeId: id, data }));

    console.log(`Graph ${name}:`);
    console.dir({
      base,
      nodes: outputNodes
    }, { depth: 3 });
  }
  printLinks(node) {
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

    console.log(`Node #${node.id} [links]:`);
    console.dir(output, { depth: 2 });
  }
}

const logger = new Logger();

module.exports = {
  logger
};
