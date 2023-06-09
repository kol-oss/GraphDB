'use strict';

class Link {
  constructor(target, weight, data) {
    this.target = target;
    this.weight = weight;
    this.data = data;
  }

  toString() {
    const { target, weight, data } = Object.assign({}, this);

    let result = '=== LINK ===\n';
    result += `Target (keyField): ${target.getNodeKey()}\n`;
    result += `Weight: ${weight}\n`;
    if (data) result += `Data: ${JSON.stringify(data)}`;

    return result;
  }
}

module.exports = {
  Link
};
