'use strict';

class Link {
  constructor(target, weight, data) {
    this.target = target;
    this.data = data;
    this.weight = weight;
  }

  static isExist(source, target) {
    const { links: srcLinks } = source;

    for (const link of srcLinks) {
      if (link.target === target) {
        return true;
      }
    }
  }
}

module.exports = {
  Link
};
