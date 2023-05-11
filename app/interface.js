'use strict';

const readline = require('readline');

const { Graph } = require('../src/classes/Graph.js');
const { Node } = require('../src/classes/Node.js');
const { logger } = require('../src/classes/Logger.js');

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

async function getObject(message) {
  const data = await question(message);
  const parsedData = JSON.parse(data);
  if (typeof parsedData !== 'object') {
    console.log('Wrong data type. Try again');
    return;
  }
  return parsedData;
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
    const data = await getObject('Enter node\'s data as JSON object: ');
    graph.add(data);
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
  },
  async connect() {
    if (!graph) {
      console.log('ERROR: Firstly create graph to connect nodes');
      return;
    }
    const startNodeId = await question('Enter start node\'s id: ');
    const start = Node.getById(graph, +startNodeId);
    const endNodeId = await question('Enter start node\'s id: ');
    const end = Node.getById(graph, +endNodeId);
    if (!start || !end) {
      console.log('Wrong input id.');
      return;
    }
    const direction = await question('Is this connection directed: [yes/no] ');
    const isdirected = direction === 'yes';
    const data = await getObject('Enter link\'s data as JSON object: ');

    graph
      .connect(start).by(data, isdirected).with(end);
  },
  async connections() {
    if (!graph) {
      console.log('ERROR: Firstly create graph to check links');
      return;
    }
    const nodeId = await question('Enter node\'s id: ');
    const node = Node.getById(graph, +nodeId);
    if (!node) { console.log('Wrong input id.'); return; }

    const { neighbours } = node;
    for (const link of neighbours) {
      logger.printLink(link);
    }
  }
};

rl
  .on('line', async (message) => {
    try {
      const command = commands[message];
      if (command) await command();
      else console.log('Unknown command. Use \'help\' to show all of them');
      rl.prompt();
    } catch (error) {
      console.log(error.message);
    }
  })
  .on('exit', () => {
    rl.close();
  });
