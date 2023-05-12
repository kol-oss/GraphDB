'use strict';

const { Node } = require('./classes/Node.js');

const isNode = (node) => node instanceof Node;

function checkCondition(data, conditions) {
  if (!data || !conditions) return;
  const dataKeys = Object.keys(data);
  const condKeys = Object.keys(conditions);

  const existingKeys = condKeys.filter((key) => dataKeys.includes(key));
  if (!existingKeys) return;

  let result;

  for (const key of existingKeys) {
    const condition = conditions[key];
    if (typeof condition === 'function') {
      result = condition(data[key]);
    } else {
      result = data[key] === condition;
    }

    if (!result) return;
  }
  return true;
}

module.exports = {
  isNode,
  checkCondition
};
