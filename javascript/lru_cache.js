class Node {
  constructor(data = null, key = null, next = null, prev = null) {
    this.data = data;
    this.key = key;
    this.next = next;
    this.prev = prev;
  }
}

class DoublyLinkedList {
  constructor(head = null, tail = null) {
    this.head = head;
    this.tail = tail;
  }

  // ADD THE NODE TO THE HEAD OF THE LIST
  addHead(node) {
    const oldhead = this.head;
    this.head = node;
    if (!oldhead) {
      this.tail = node;
    } else {
      node.next = oldhead;
      oldhead.prev = node;
    }
    this.head.prev = null;
  }

  // REMOVE THE TAIL NODE FROM THE LIST
  // AND RETURN IT
  removeTail() {
    const oldtail = this.tail;
    if (!oldtail) return null;
    if (oldtail.prev) {
      this.tail = oldtail.prev;
      this.tail.next = null;
    } else {
      this.head = null;
      this.tail = null;
    }
    return oldtail;
  }

  // REMOVE THE GIVEN NODE FROM THE LIST
  // AND THEN RETURN IT
  removeNode(node) {
    if (!node.next) {
      return this.removeTail();
    }
    if (!node.prev) {
      this.head = node.next;
      this.head.prev = null;
      return node;
    }
    node.prev.next = node.next;
    node.next.prev = node.prev;
    return node;
  }

  // MOVE THE GIVEN NODE FROM ITS LOCATION TO THE HEAD
  // OF THE LIST
  moveNodeToHead(node) {
    this.removeNode(node);
    this.addHead(node);
  }
}

class LRUCache {
  constructor(limit = 10) {
    this.limit = limit;
    this.size = 0;
    this.hash = {};
    this.list = new DoublyLinkedList();
  }

  // RETRIEVE THE NODE FROM THE CACHE USING THE KEY
  // IF THE NODE IS IN THE CACHE, MOVE IT TO THE HEAD OF THE LIST AND RETURN IT
  // OTHERWISE RETURN -1
  get(key) {
    const node = this.hash[key];
    if (node) {
      this.list.moveNodeToHead(node);
      return node;
    }
    return -1;
  }

  // ADD THE GIVEN KEY AND VALUE TO THE CACHE
  // IF THE CACHE ALREADY CONTAINS THE KEY, UPDATE ITS VALUE AND MOVE IT TO
  // THE HEAD OF THE LIST
  // IF THE CACHE DOESN'T CONTAIN THE KEY, ADD IT TO THE CACHE AND PLACE IT
  // AT THE HEAD OF THE LIST
  // IF THE CACHE IS FULL, REMOVE THE LEAST RECENTLY USED ITEM BEFORE ADDING
  // THE NEW DATA TO THE CACHE
  put(key, value) {
    const node = this.get(key);
    if (node !== -1) {
      node.data = value;
      this.list.moveNodeToHead(node);
    } else {
      if (this.size === this.limit) {
        const deletedNode = this.list.removeTail();
        delete this.hash[deletedNode.key];
      } else {
        this.size++;
      }
      const newNode = new Node(value, key);
      this.hash[key] = newNode;
      this.list.addHead(newNode);
    }
  }
}

if (require.main === module) {
  // add your own tests in here
  const list = new DoublyLinkedList();
  console.log(list.removeTail());
  list.addHead(new Node("cookie recipe", "cookies"));
  console.log(list);
  const node1 = new Node("cake recipe", "cake");
  list.addHead(node1);
  console.log(list);
  list.removeTail();
  console.log(list);
  const node2 = new Node("brownie recipe", "brownies");
  list.addHead(node2);
  list.addHead(new Node("pie recipe", "pie"));
  console.log(list);
  // list.removeNode(node);
  // console.log(list);
  list.moveNodeToHead(node1);
  console.log(list);
  debugger;
  const lru = new LRUCache();
  lru.put("cake", node1);
  console.log(lru.get("cookies"));
}

module.exports = {
  Node,
  DoublyLinkedList,
  LRUCache,
};

// Please add your pseudocode to this file
// And a written explanation of your solution
