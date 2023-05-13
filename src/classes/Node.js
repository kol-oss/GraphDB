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
  get neighbours() {
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
  static getById(graph, nodeId) {
    const node = graph.nodes.find((element) => element.id === nodeId);
    return node;
  }
  static getByData(graph, data) {
    const node = graph.nodes.find((element) => element.data === data);
    return node;
  }
}

module.exports = {
  Node
};
