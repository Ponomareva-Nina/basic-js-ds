const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.tree = null;
  }

  root() {
   return this.tree;
  }

  add(data) {
    this.tree = addNode(this.tree, data);

    function addNode(node, data) {
      if (!node) {
        return new Node(data);
      }
      if (node.data === data){
        return node;
      }
      if(data < node.data) {
        node.left = addNode(node.left, data);
      } else {
        node.right = addNode(node.right, data);
      }
      return node;
    }
  }

  has(data) {
    return hasValue(this.tree, data);

    function hasValue(node, data){
      if (!node) {
        return false;
      }
      if (node.data === data){
        return true;
      }
      if (data < node.data){
        return hasValue(node.left, data);
      } else {
        return hasValue(node.right, data);
      }
    }
  }

  find(data) {
    return searchValue(this.tree, data);

    function searchValue(node, data){
      if (!node) {
        return null;
      } else if (node.data === data){
        return node;
      }

      if (data < node.data){
        return searchValue(node.left, data);
      } else {
        return searchValue(node.right, data);
      }
    }
  }

  remove(data) {
    this.tree = removeNode(this.tree, data);

    function removeNode(node, data){
      if (!node) {
        return null;
      }

      if (data < node.data){
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        // дошли до узла, который хотим удалить
        // если у него нет потомков, то вернем null вместо узла:
        if (!node.left && !node.right) {
          return null;
        }
        // если у него нет потомка слева, то вместо элемента записываем правого потомка и возвращаем перезаписанный узел:
        if (!node.left) {
          node = node.right;
          return node;
        }
        // если у него нет потомка справа, то вместо элемента записываем левого потомка и возвращаем перезаписанный узел:
        if (!node.right) {
          node = node.left;
          return node;
        }
        // если имеются оба потомка, то либо ищем минимальный элемент среди правого поддерева, вставляем наш узел вместо минимального этого элемента (и удаляем его):
        /*let minRight = node.right;
        while(minRight.left) {
          minRight = minRight.left;
        }
        node.data = minRight.data;
        node.right = removeNode(node.right, minRight.data);
        return node;
        */
        // либо тоже самое для максимального элемента левого поддерева:
        let maxLeft = node.left;
        while(maxLeft.right) {
          maxLeft = maxLeft.right;
        }
        node.data = maxLeft.data;
        node.left = removeNode(node.left, maxLeft.data);
        return node;
      }
    }
  }

  min() {
    if (!this.tree){
      return;
    }

    let minNode = this.tree;
    while (minNode.left){
      minNode = minNode.left
    }
    return minNode.data;
  }

  max() {
    if (!this.tree){
      return;
    }
    let maxNode = this.tree;
    while (maxNode.right) {
      maxNode = maxNode.right
    }
    return maxNode.data;
  }
}

module.exports = {
  BinarySearchTree
};