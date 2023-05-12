'use strict';

const readline = require('readline');

const { Graph } = require('../src/classes/Graph.js');
const { logger } = require('../src/classes/Logger.js');

const { getObject, getNode } = require('./tools.js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

rl.prompt();

function question(message) {
  const result = new Promise((resolve) => rl.question(message, resolve));
  return result;
}

logger.log('Welcome to GraphDB. Type \'help\' to see all commands.');

let graph;

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
    const data = await question('Enter node\'s data as JSON object: ');
    const parsed = getObject(data);
    if (data && !parsed) return;

    graph.add(parsed);
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
    const start = getNode(graph, +startNodeId);

    const endNodeId = await question('Enter end node\'s id: ');
    const end = getNode(graph, +endNodeId);

    if (!start || !end) return;

    const direction = await question('Is this connection directed: [yes/no] ');
    const isdirected = direction === 'yes';
    const data = await question('Enter link\'s data as JSON object: ');

    const parsed = getObject(data);
    if (data && !parsed) return;

    graph
      .connect(start).by(parsed, isdirected).with(end);
  },
  async connections() {
    if (!graph) {
      logger.log('ERROR: Firstly create graph to check links', 'error');
      return;
    }
    const nodeId = await question('Enter node\'s id: ');
    const node = getNode(graph, +nodeId);
    if (!node) return;

    const { neighbours } = node;
    for (const link of neighbours) {
      logger.link(link);
    }
  },
  async delete() {
    if (!graph) {
      logger.log('ERROR: Firstly create graph to check links', 'error');
      return;
    }
    const nodeId = await question('Enter node\'s id to delete: ');
    const node = getNode(graph, +nodeId);
    if (!node) return;

    graph.delete(node);
  },
  async filter() {
    if (!graph) {
      logger.log('ERROR: Firstly create graph to check links', 'error');
      return;
    }
    const nodeId = await question('Enter node\'s id to filter links: ');
    const node = getNode(graph, +nodeId);
    if (!node) return;

    const condition = await question('Enter link filter condition as JSON: ');

    const parsed = getObject(condition);
    if (condition && !parsed) return;

    graph
      .filter(node)
      .where(parsed);
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
