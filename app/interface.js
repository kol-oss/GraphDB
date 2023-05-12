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
logger.log('Welcome to GraphDB. Type \'help\' to see all commands.');

let graph;

function question(message) {
  const result = new Promise((resolve) => rl.question(message, resolve));
  return result;
}

async function getObject(message) {
  const data = await question(message);
  if (!data) return;
  const parsedData = JSON.parse(data);
  if (typeof parsedData !== 'object') {
    logger.log('Wrong data type. Try again', 'error');
    return;
  }
  return parsedData;
}

const commands = {
  async help() {
    const actions = Object.keys(commands);
    logger.log('Available commands:');
    for (const action of actions) {
      console.log(`- ${action}`);
    }
  },
  async new() {
    const name = await question('Enter graph\'s name: ');
    if (graph) {
      logger.log('You have already created graph', 'error');
      return;
    }
    const newGraph = new Graph(name);

    graph = newGraph;
    logger.log(`Graph ${name} was successfully created`, 'success');
  },
  async add() {
    if (!graph) {
      logger.log('ERROR: Firstly create graph to add nodes', 'error');
      return;
    }
    const data = await getObject('Enter node\'s data as JSON object: ');
    graph.add(data);
  },
  async nodes() {
    if (!graph) {
      logger.log('ERROR: Firstly create graph to check nodes', 'error');
      return;
    }
    const { nodes } = graph;
    for (const node of nodes) {
      logger.node(node);
    }
  },
  async connect() {
    if (!graph) {
      logger.log('ERROR: Firstly create graph to connect nodes', 'error');
      return;
    }
    const startNodeId = await question('Enter start node\'s id: ');
    const start = Node.getById(graph, +startNodeId);
    const endNodeId = await question('Enter start node\'s id: ');
    const end = Node.getById(graph, +endNodeId);
    if (!start || !end) {
      logger.log('Wrong input id.', 'error');
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
      logger.log('ERROR: Firstly create graph to check links', 'error');
      return;
    }
    const nodeId = await question('Enter node\'s id: ');
    const node = Node.getById(graph, +nodeId);
    if (!node) {
      logger.log('Wrong input id', 'error');
      return;
    }

    const { neighbours } = node;
    for (const link of neighbours) {
      logger.link(link);
    }
  }
};

rl
  .on('line', async (message) => {
    try {
      const command = commands[message];
      if (command) await command();
      else {
        logger.log('Unknown command. Use \'help\' to see all', 'error');
      }
      rl.prompt();
    } catch (error) {
      logger.log(error.message, 'error');
    }
  })
  .on('exit', () => {
    rl.close();
  });
