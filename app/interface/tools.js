'use strict';

const { logger } = require('./Logger.js');
const { Node } = require('../../src/classes/Node.js');

function getObject(data) {
  try {
    const parsedData = JSON.parse(data);
    if (parsedData && typeof parsedData !== 'object') {
      logger.log('Wrong data type. Try again', 'error');
      return;
    }
    return parsedData;
  } catch (error) {
    if (!data)
      return {};
    logger.log(error, 'error');
    return false;
  }

}

function getNode(graph, nodeId) {
  if (!graph) {
    logger.log('ERROR: Firstly create graph to check links', 'error');
    return;
  }
  const node = Node.getById(graph, parseInt(nodeId));
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
