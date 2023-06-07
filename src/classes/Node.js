'use strict';

class Node {
  constructor(graph, data) {
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

  toString() {
    let stringified = `Node ${this.data}:`;
    const { links } = this;

    for (const link of links) {
      const { target, weight, data } = link;
      stringified += `\n-> ${target.data} (${weight})`;

      if (data) {
        stringified += ` (${data})`;
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
