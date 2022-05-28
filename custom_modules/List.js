class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class List {
  constructor () {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  add (value) {
    const node = new Node(value); this.length++;
    if (this.head) return this.tail = this.tail.next = node;
    else return this.head = this.tail = node;
  }

  remove (node) {
    if (node.left && node.right) node.left.right = node.right, node.right.left = node.left;
    else if (node.left) this.tail = node.left, node.left.right = null;
    else if (node.right) this.head = node.right, node.right.left = null;
    else this.head = this.tail = null;
    this.length--;
  }

  iterate (callback) {
    let iterator = this.head;
    while (iterator) callback(iterator.value), iterator = iterator.next;
  }

  destroy () {
    this.head = this.tail = null;
    this.length = 0;
  }


}

export default List;