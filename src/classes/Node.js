'use strict';

let COUNTER = 0;

class Node {
  constructor(data, graph) {
    this.id = ++COUNTER;
    this.data = data;
    this.graph = graph;
    this.links = new Map();
  }
  toString() {
    const { id, data } = this;
    return { nodeId: id, data };
  }
  get neighbours() {
    const { links } = this;
    const output = [];

    for (const link of links.values()) {
      const { start, end, data, directed, weight } = link;
      output.push({
        begin: start.id,
        finish: end.id,
        data,
        directed,
        weight
      });
    }

    return output;
  }
}

module.exports = {
  Node
};
