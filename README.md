# GraphDB

🔗 Structure for working with graphs and implementing graph algorithms.

## Structure

- [Classes](#classes)
  - [Graph](#graph)
  - [Node](#node)
  - [Link](#link)
- [App](#app)
  - [1-shortest](#1-shortest)
  - [2-select](#2-select)
  - [3-matrix](#3-matrix)

## Classes

### Graph

``` js
constructor(name, isDirected = false, keyField = undefined) {
  this.name = name;
  this.isDirected = isDirected;
  this.keyField = keyField;
  this.nodes = new Map();
}
```

The `Graph` class represents a graph data structure. It provides methods for adding nodes and links, determing keyfield, as well as performing various graph operations.

### Node

``` js
constructor(graph, data) {
  this.id = counter++;
  this.data = data;
  this.graph = graph;
  this.links = new Set();
}
```

The `Node` class represents a node in a graph. It stores information about the node's ID and any additional data associated with it.

### Link

``` js
constructor(target, weight, data) {
  this.target = target;
  this.weight = weight;
  this.data = data;
}
```

The `Link` class represents a link between two nodes in a graph. It contains information about the target node, and any additional attributes of the link.

## App

### 1-shortest

``` js
...
const { distance, path } = findShortestPath(donetsk, lviv);

console.log('Minimal distance from donetsk to lviv:', distance);
console.log(path);
```

The `1-shortest` app implements the Dijkstra's algorithm for finding the shortest path in a graph. It takes a two nodes as input and returns the distance and shortest path between them.

### 2-select

``` js
console.log('Names and languages:');
console.log(graph.select(['name', 'language']));
...
console.log('English languages:');
console.log(graph.selectByData({ 'language': 'English' }));
...
console.log('SELECT WASHINGTON:');
console.log(primitiveGraph.selectByData('WASHINGTON'));
```

The `2-select` app provides functionality for searching and selecting data in a graph. It allows users to specify search criteria and retrieve nodes or links that match the criteria.

### 3-matrix

``` js
...
const adjMatrix = graph.toAdjMatrix(false);
console.table(adjMatrix);
...
const weightsMatrix = graph.toAdjMatrix();
console.table(weightsMatrix);
...
const incidenceMatrix = graph.toIncidenceMatrix();
console.table(incidenceMatrix);
...
const toInputAdjMatrix = [ [2, 0], [0, 1]];
const fromAdjGraph = new Graph('FROM ADJ', false);

fromAdjGraph.fromAdjMatrix(toInputAdjMatrix);
```

The `3-select` app shows the built-in functions to convert graph into adjacency or incidence matrix or get it from them.

