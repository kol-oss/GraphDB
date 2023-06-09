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
    return false;
  }

  getNodeKey() {
    return this.getData() | this.id;
  }

  getData() {
    const { graph } = this;
    const { keyField } = graph;

    const { data } = this;
    return keyField ? data[keyField] : data;
  }

  toString() {
    const { data, links, graph, id } = this;
    const { keyField } = graph;
    const srcDataByKey = this.getNodeKey();

    // HOW REWORK IT?
    let result = `=== Node ${srcDataByKey} ===\n`;

    result += keyField ? `Key (${keyField}): ${this.getData()}` : `ID: ${id}`;

    result += `\n> Data: ${JSON.stringify(data)}\n`;
    result += '> Connections:';

    for (const link of links) {
      const { target, weight, data: linkData } = link;
      const trgDataByKey = target.getNodeKey();

      result += `\n+ id: ${trgDataByKey} -> (w: ${weight})`;

      if (linkData) {
        result += ` (d: ${linkData})`;
      }
    }

    return result;
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
