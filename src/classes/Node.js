'use strict';

let counter = 0;

class Node {
  constructor(graph, data) {
    this.id = counter++;
    this.data = data;
    this.graph = graph;
    this.links = new Set();
  }

  getLinkTo(target) {
    for (const link of this.links) {
      if (link.target === target)
        return link;
    }
  }

  getData() {
    const { graph } = this;
    const { keyField } = graph;

    const { data } = this;
    return keyField ? data[keyField] : data;
  }

  toString() {
    const { links, data: nodeData } = this;
    let stringified = `Node ${this.getData()}:\n> Data: ${nodeData}`;

    for (const link of links) {
      const { target, weight, data: linkData } = link;

      stringified += `\n-> ${target.getData()} (${weight})`;

      if (linkData) {
        stringified += ` (${linkData})`;
      }
    }

    return stringified;
  }

  getLinkedNodes() {
    const linked = new Set();

    for (const link of this.links) {
      linked.add(link.target);
    }

    return linked;
  }
}

module.exports = {
  Node
};
