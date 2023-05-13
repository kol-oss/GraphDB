'use strict';

const { Graph } = require('../../src/classes/Graph.js');

const cities = new Graph('CITIES');

const lviv = cities.add('Lviv');
const vinitsa = cities.add('Vinitsa');
const kiev = cities.add('Kiev');
const odesa = cities.add('Odesa');
const kherson = cities.add('Kherson');
const dnipro = cities.add('Dnipro');
const kharkiv = cities.add('Kharkiv');
const donetsk = cities.add('Donetsk');

cities
  .connect(vinitsa).by(null, false, 300).with(lviv)
  .connect(vinitsa).by(null, false, 200).with(kiev)
  .connect(vinitsa).by(null, false, 350).with(odesa)
  .connect(vinitsa).by(null, false, 500).with(dnipro);

cities
  .connect(kharkiv).by(null, false, 250).with(donetsk)
  .connect(kharkiv).by(null, false, 150).with(dnipro)
  .connect(kharkiv).by(null, false, 400).with(kiev);

cities
  .connect(dnipro).by(null, false, 200).with(donetsk)
  .connect(dnipro).by(null, false, 400).with(kherson);

cities
  .connect(odesa).by(null, false, 150).with(kherson);


module.exports = {
  cities
};
