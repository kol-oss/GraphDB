'use strict';

const { Node } = require('./classes/Node.js');

const isNode = (node) => node instanceof Node;
/*
function setConnection(start, end, type, isConnect, value) {
  if (isConnect) {
    start.links[type].set(end, value);
  } else {
    start.links[type].delete(end);
  }
}
*/
module.exports = {
  isNode,
};
