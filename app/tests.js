'use strict';

const { Graph } = require('../src/classes/Graph.js');

const {
  logger
} = require('../src/classes/Logger.js');

class Person {
  constructor(name, surname) {
    this.name = name;
    this.surname = surname;
  }
}

const persons = new Graph('Persons');

const alex = persons.add(new Person('Alex', 'Goth'));
const nick = persons.add({ 'name': 'Nick', 'surname': 'Ruck' });
const oleg = persons.add({ 'name': 'Oleg', 'surname': 'Ktoev' });

persons
  .connect(alex).with(nick)
  .connect(alex).by({ 'relation': 'friend', 'age': 30 }, true).with(oleg);

persons
  .filter(alex).where({ relation: 'friend' });
