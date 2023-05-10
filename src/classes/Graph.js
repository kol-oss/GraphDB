'use strict';

const { Node } = require('./Node.js');

class Graph {
  constructor(name, base) {
    this.name = name;
    this.base = base;
    this.nodes = new Array();
  }

  add(data) {
    const newNode = new Node(data, this);
    
    this.nodes.push(newNode);
    console.log('Node was added.');
    return newNode;
  }
}

module.exports = {
  Graph
}