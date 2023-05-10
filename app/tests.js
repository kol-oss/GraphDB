'use strict';

const { Graph } = require('../src/classes/Graph.js');

const persons = new Graph('Persons');
const alex = persons.add({ 'name': 'Alex', 'surname': 'Goth' });
const nick = persons.add({ 'name': 'Nick', 'surname': 'Ruck' });
const oleg = persons.add({ 'name': 'Oleg', 'surname': 'Ktoev' });

console.log(persons.vertexes);

persons
  .connect(alex).with(nick)
  .connect(alex).with(oleg);

console.log(alex.neighbours);

