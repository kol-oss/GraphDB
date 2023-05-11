'use strict';

const readline = require('readline');

const { Graph } = require('../src/classes/Graph.js');
const {
  logger
} = require('../src/classes/Logger.js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

rl.prompt();
console.log('Welcome to GraphDB. Type \'help\' to see all commands.');

let graph;

function question(message) {
  const result = new Promise((resolve) => rl.question(message, resolve));
  return result;
}

const commands = {
  async help() {
    const actions = Object.keys(commands);
    console.log('Available commands:');
    for (const action of actions) {
      console.log(`- ${action}`);
    }
  },
  async new() {
    const name = await question('Enter graph\'s name: ');
    if (graph) {
      console.log('You have already created graph');
      return;
    }
    const newGraph = new Graph(name);

    graph = newGraph;
    console.log(`Graph ${name} was successfully created`);
  },
  async add() {
    if (!graph) {
      console.log('ERROR: Firstly create graph to add nodes');
      return;
    }
    const data = await question('Enter node\'s data as JSON object: ');
    const parsedData = JSON.parse(data);
    if (typeof parsedData !== 'object') {
      console.log('Wrong data type. Try again');
      return;
    }
    graph.add(parsedData);
  },
  async nodes() {
    if (!graph) {
      console.log('ERROR: Firstly create graph to check nodes');
      return;
    }
    const { nodes } = graph;
    for (const node of nodes) {
      logger.printNode(node);
    }
  }
};

rl
  .on('line', async (message) => {
    const command = commands[message];
    if (command) await command();
    else console.log('Unknown command. Use \'help\' to show all of them');
    rl.prompt();
  })
  .on('exit', () => {
    rl.close();
  });
