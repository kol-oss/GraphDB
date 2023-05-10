'use strict';

let COUNTER = 0;

class Link {
  constructor(start, end, data, directed = false, weight = 1) {
    this.id = ++COUNTER;
    this.start = start;
    this.end = end;
    this.data = data;
    this.directed = directed;
    this.weight = weight;
  }
}

module.exports = {
  Link
};
