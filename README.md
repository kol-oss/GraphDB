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

## Classes

### Graph

The `Graph` class represents a graph data structure. It provides methods for adding nodes and links, determing keyfield, as well as performing various graph operations.

### Node

The `Node` class represents a node in a graph. It stores information about the node's ID and any additional data associated with it.

### Link

The `Link` class represents a link between two nodes in a graph. It contains information about the target node, and any additional attributes of the link.

## App

### 1-shortest

The `1-shortest` app implements the Dijkstra's algorithm for finding the shortest path in a graph. It takes a two nodes as input and returns the distance and shortest path between them.

### 2-select

The `2-select` app provides functionality for searching and selecting data in a graph. It allows users to specify search criteria and retrieve nodes or links that match the criteria.
