'use strict';

const { Graph } = require('../src/classes/Graph.js');

const persons = new Graph('Persons');
const alex = persons.add({'name': 'Alex', 'surname': 'Goth'});

console.log(alex);

console.log(alex.toString());