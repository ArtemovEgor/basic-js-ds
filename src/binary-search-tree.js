const { NotImplementedError } = require('../lib/errors');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor() {
    this.treeRoot = null;
  }

  root() {
    return this.treeRoot;
  }

  add(data) {
    const newNode = new Node(data);

    if (!this.treeRoot) {
      this.treeRoot = newNode;
      return;
    }

    let current = this.treeRoot;

    while(true) {
      if (data < current.data) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  find(data) {
    let current = this.treeRoot;
    while (current) {
      if (data === current.data) return current;
      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return null;
  }

  has(data) {
    return this.find(data) !== null;
  }

  remove(data) {
    this.treeRoot = this.removeNode(this.treeRoot, data);
  }
  
  removeNode(node, data) {
    if (!node) return null;

    if (data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;
    } else if (data > node.data) {
      node.right = this.removeNode(node.right, data);
      return node;
    } else {
      if (!node.left && !node.right) return null; // If the node is a list, just delete it
      if (!node.left) return node.right; // If has only a right child, replace the node with it
      if (!node.right) return node.left; // The same with right

      // If the node has two children, look for the min on the right branch
      let minRight = node.right;
      while (minRight.left) {
        minRight = minRight.left;
      }
      node.data = minRight.data; // place it's value instead of the node
      this.removeNode(node.right, minRight.data);
      return node;
    }
  }

  min() {
    let current = this.treeRoot;
    while (current) {
      if (!current.left) {
        return current.data;
      } else {
        current = current.left;
      }
    }
    return null;
  }

  max() {
    let current = this.treeRoot;
    while (current) {
      if (!current.right) {
        return current.data;
      } else {
        current = current.right;
      }
    }
    return null;
  }
}

module.exports = {
  BinarySearchTree
};
