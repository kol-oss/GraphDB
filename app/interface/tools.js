'use strict';

const { logger } = require('./Logger.js');
const { Node } = require('../../src/classes/Node.js');

function getObject(data) {
  if (!data) return;
  const parsedData = JSON.parse(data);
  if (typeof parsedData !== 'object') {
    logger.log('Wrong data type. Try again', 'error');
    return;
  }
  return parsedData;
}

function getNode(graph, nodeId) {
  if (!graph) {
    logger.log('ERROR: Firstly create graph to check links', 'error');
    return;
  }
  const node = Node.getById(graph, +nodeId);
  if (!node) {
    logger.log('Wrong input node id. Try again', 'error');
    return;
  }
  return node;
}

module.exports = {
  getObject,
  getNode
};
