'use strict';

const { Node } = require('./Node.js');
const { Link } = require('./Link.js');

class Graph {
  constructor(name, isDirected = false, keyField = undefined) {
    this.name = name;
    this.isDirected = isDirected;
    this.keyField = keyField;
    this.nodes = new Map();
  }

  addNode(data) {
    const { keyField } = this;
    let keyToSet;
    if (keyField) {
      if (typeof data !== 'object') {
        throw new Error('Data must be an object if you use keyfield');
      }
      keyToSet = data[keyField];
    }
    const newNode = new Node(this, data);

    this.nodes.set(keyToSet || newNode.id, newNode);
    console.log(`Node ${keyField ? data[keyField] : data} was added`);
    return newNode;
  }

  addManyNodes(args) {
    const nodes = [];
    const data = new Set(args);

    for (const node of data) {
      const newNode = this.addNode(node);
      nodes.push(newNode);
    }

    return nodes;
  }

  getNodes() {
    return Array.from(this.nodes.values());
  }

  // SELECT ONLY BY FIELDS NAME
  select(query) {
    const { keyField } = this;
    if (!keyField) {
      throw new Error('Select method is used only for graphs with keyfields');
    }

    const nodes = this.getNodes();
    const fields = Array.isArray(query) ? query : [query];

    const answer = nodes.map((node) => {
      const answerNode = {};
      for (const field of fields) {
        answerNode[field] = node.data[field];
      }
      return answerNode;
    });

    return answer;
  }

  selectByData(query) {
    const { keyField } = this;
    const nodes = this.getNodes();

    if (!query || (keyField && typeof query !== 'object')) {
      return [];
    }

    const keys = Object.keys(query);

    const answer = nodes.filter((node) => {
      const { data } = node;

      if (typeof data === 'object') {
        for (const condition of keys) {
          if (query[condition] !== data[condition]) {
            return false;
          }
        }

        return true;
      } else {
        return query === data;
      }
    });

    return answer;
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
        return this;
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

  deleteNode(nodeToDelete) {
    if (!(nodeToDelete instanceof Node)) {
      throw new Error('Node must be instance of class "Node"');
    }

    const nodes = this.getNodes();
    for (const node of nodes) {
      if (Link.isExist(node, nodeToDelete)) {
        this.unlinkNodes(node, nodeToDelete);
      }
    }

    const { keyField } = this;
    const { id, data } = nodeToDelete;
    this.nodes.delete(keyField ? data[keyField] : data[id]);
    console.log('Node was deleted');
    return this;
  }

  toString() {
    const nodes = this.getNodes();

    console.log(`Graph ${this.name}:`);
    for (const node of nodes) {
      console.log(node.toString());
    }
  }

  static clearGraph(graph) {
    if (!(graph instanceof Graph)) {
      throw new Error('Argument must be instance of "Graph" class');
    }

    const nodes = graph.getNodes();
    for (const node of nodes) {
      graph.deleteNode(node);
    }

    console.log(`Graph [${graph.name}] was cleared`);
    return graph;
  }
}

module.exports = {
  Graph
};
