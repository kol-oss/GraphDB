'use strict';

const { Node } = require('./Node.js');
const { Link } = require('./Link.js');

const {
  isNode,
} = require('../utils.js');

class Graph {
  constructor(name, base) {
    this.name = name;
    this.base = base;
    this.nodes = new Array();
  }

  add(data) {
    const newNode = new Node(data, this);
    if (this.base && !(data instanceof this.base)) {
      console.log('Node data doesn\'t fit to the base');
      return;
    }

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
        start.links.out.set(end, plainLink);
        end.links.in.set(start, plainLink);
        if (!directed) {
          const reversedLink = new Link(end, start, data, directed);
          start.links.in.set(end, reversedLink);
          end.links.out.set(start, reversedLink);
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

        const link = start.links.out.get(end);
        if (!link) return;
        start.links.out.delete(end);
        if (!link.directed) {
          const reversedlink = end.links.in.get(start);
          if (!reversedlink) return;
          end.links.in.delete(start);
        }

        console.log(`Disconnect nodes ${start.id} -> ${end.id}`);
        return start.graph;
      }
    };
  }

  from(node) {
    if (!isNode(node)) return;
  }

  delete(node) {
    if (!isNode(node)) return;
    const { nodes } = this;
    const deleteIndex = nodes.findIndex((item) => item === node);
    if (deleteIndex === -1) return;

    for (const link of node.neighbours) {
      this.disconnect(link.start).with(node);
      this.disconnect(node).with(link.end);
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
