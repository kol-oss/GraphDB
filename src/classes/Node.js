'use strict';

let counter = 0;

class Node {
  constructor(data, graph) {
    this.id = ++counter;
    this.data = data;
    this.graph = graph;
    this.links = new Map();
  }
  toString() {
    const { id, data } = this; 
    return { nodeId: id, data};
  }
}

module.exports = {
  Node
}