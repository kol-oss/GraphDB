'use strict';

const { Node } = require('./classes/Node.js');

const isNode = (node) => node instanceof Node;

module.exports = {
  isNode,
};
