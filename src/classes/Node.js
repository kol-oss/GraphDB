'use strict';

let COUNTER = 0;

class Node {
  constructor(data, graph) {
    this.id = ++COUNTER;
    this.data = data;
    this.graph = graph;
    this.links = {
      in: new Map(),
      out: new Map()
    };
  }
  toString() {
    const { id, data } = this;
    return { nodeId: id, data };
  }
  get fullLinks() {
    const { links } = this;
    const result = [];
    const keys = Object.keys(links);

    for (const key of keys) {
      for (const link of links[key].values()) {
        result.push(link);
      }
    }

    return result;
  }
  get neighbours() {
    const { links } = this;
    const output = [];
    const keys = Object.keys(links);

    for (const key of keys) {
      for (const link of links[key].values()) {
        const { start, end, data, directed, weight } = link;
        output.push({
          begin: start.id,
          finish: end.id,
          type: key,
          data,
          directed,
          weight
        });
      }
    }

    return output;
  }
}

module.exports = {
  Node
};
