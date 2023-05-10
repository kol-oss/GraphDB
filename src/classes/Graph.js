'use strict';

const { Node } = require('./Node.js');
const { Link } = require('./Link.js');

const {
  isNode
} = require('../utils.js');

class Graph {
  constructor(name, base) {
    this.name = name;
    this.base = base;
    this.nodes = new Array();
  }

  add(data) {
    const newNode = new Node(data, this);

    this.nodes.push(newNode);
    console.log(`Node ${newNode.id} was added`);
    return newNode;
  }

  connect(start) {
    if (!isNode(start)) return;

    const newLink = { data: null, directed: false };
    return {
      by(linkData, directed) {
        newLink.data = linkData;
        newLink.directed = directed;
        return this;
      },
      with(end) {
        if (!isNode(end)) return;

        const { data, directed } = newLink;
        const plainLink = new Link(start, end, data, directed);
        start.links.set(end, plainLink);
        //end.links.set(start, plainLink);
        if (!directed) {
          const reversedLink = new Link(end, start, data, directed);
          end.links.set(start, reversedLink);
          //start.links.set(end, reversedLink);
        }
        const sign = directed ? '' : '<';
        console.log(`Connect nodes ${start.id} ${sign}-> ${end.id}`);
        return start.graph;
      }
    };
  }

  disconnect(start) {
    if (!isNode(start)) return;

    return {
      with(end) {
        if (!isNode(end)) return;

        const link = start.links.get(end);
        if (!link) return;
        start.links.delete(end);
        if (!link.directed) {
          const reversedlink = end.links.get(start);
          if (!reversedlink) return;
          end.links.delete(start);
        }

        const sign = link.directed ? '' : '<';
        console.log(`Disconnect nodes ${start.id} ${sign}-> ${end.id}`);
        return start.graph;
      }
    };
  }

  delete(node) {
    if (!isNode(node)) return;
    const { nodes } = this;
    const deleteIndex = nodes.findIndex((item) => item === node);
    if (deleteIndex === -1) return;

    for (const link of node.links.values()) {
      this.disconnect(link.start).with(link.end);
    }

    nodes.splice(deleteIndex, 1);
    console.log(`Node ${node.id} was deleted`);
    return this;
  }

  get vertexes() {
    const { nodes } = this;
    const output = nodes.map((node) => node.toString());
    return output;
  }
}

module.exports = {
  Graph
};
