'use strict';

let counter = 0;

class Link {
  constructor(start, end, data, directed = false) {
    this.id = ++counter;
    this.start = start;
    this.end = end;
    this.data = data;
    this.directed = directed;
  }
}

module.exports = {
  Link
}