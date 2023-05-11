'use strict';

const { Graph } = require('../src/classes/Graph.js');

const persons = new Graph('Persons');
const alex = persons.add({ 'name': 'Alex', 'surname': 'Goth' });
const nick = persons.add({ 'name': 'Nick', 'surname': 'Ruck' });
const oleg = persons.add({ 'name': 'Oleg', 'surname': 'Ktoev' });

console.log(persons.vertexes);

persons
  .connect(alex).with(nick)
  .connect(alex).by(null, true).with(oleg);

persons
  .delete(nick)
  .delete(alex);
