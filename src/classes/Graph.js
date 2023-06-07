'use strict';

const { Node } = require('./Node.js');
const { Link } = require('./Link.js');

class Graph {
  constructor(name, isDirected = false) {
    this.name = name;
    this.isDirected = isDirected;
    this.nodes = new Set();
  }

  addNode(data) {
    const newNode = new Node(this, data);

    this.nodes.add(newNode);
    console.log('Node was added');
    return newNode;
  }

  addManyNodes(...args) {
    const nodes = [];
    const data = new Set(args);

    for (const node of data) {
      const newNode = this.addNode(node);
      nodes.push(newNode);
    }

    return nodes;
  }

  linkNode(source) {
    return {
      with(target, weight = 1, data = undefined) {
        const link = new Link(target, weight, data);
        const { isDirected: directed } = this;

        const { data: srcData, links: srcLinks } = source;

        const linkString = `${srcData} ${directed ? '' : '<'}-> ${target.data}`;

        if (Link.isExist(source, target)) {
          console.log(`Link [${linkString}] already exist`);
          return;
        }

        srcLinks.add(link);

        // CHECK FOR UNDIRECTED
        if (!directed) {
          const reversed = new Link(source, weight, data);
          const { links: targetLinks } = target;

          if (!Link.isExist(target, source)) {
            targetLinks.add(reversed);
          }
        }

        console.log(`Create link ${linkString}`);
        return source.graph;
      }
    };
  }

  unlinkInOneDirection(source, target) {
    if (Link.isExist(source, target)) {
      const { links: srcLinks } = source;

      const link = source.getLinkTo(target);
      srcLinks.delete(link);
    }
  }

  unlinkNodes(source, target) {
    this.unlinkInOneDirection(source, target);

    if (!this.isDirected) {
      this.unlinkInOneDirection(target, source);
    }
  }

  getNodeByData(data) {
    const nodes = this.nodes;

    for (const node of nodes) {
      if (node.data === data)
        return node;
    }
  }

  deleteNode(nodeToDelete) {
    if (!(nodeToDelete instanceof Node)) {
      throw new Error('Node must be instance of class "Node"');
    }

    for (const node of this.nodes) {
      if (Link.isExist(node, nodeToDelete)) {
        this.unlinkNodes(node, nodeToDelete);
      }
    }

    this.nodes.delete(nodeToDelete);
    console.log('Node was deleted');
    return this;
  }

  toString() {
    const { nodes } = this;

    console.log(`Graph ${this.name}:`);
    for (const node of nodes) {
      console.log(node.toString());
    }
  }

  static clearGraph(graph) {
    if (!(graph instanceof Graph)) {
      throw new Error('Argument must be instance of "Graph" class');
    }

    for (const node of graph.nodes) {
      graph.deleteNode(node);
    }

    console.log(`Graph [${graph.name}] was cleared`);
    return graph;
  }
}

const graph = new Graph('CITIES', false);

const kiev = graph.addNode('KIEV');
const kherson = graph.addNode('KHERSON');

const [odessa] = graph.addManyNodes('ODESSA', 'KHARKIV');

graph.linkNode(kiev).with(kherson);
graph.linkNode(kiev).with(odessa);

//Graph.clearGraph(graph);

console.log(graph.toString());

module.exports = {
  Graph
};
