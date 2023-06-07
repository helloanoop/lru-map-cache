# lru-map-cache

A simple and fast LRU cache using the native `Map` class.

## Installation
```
npm install lru-map-cache
```

## Usage
```javascript
const LRUCache = require('lru-map-cache');

const cache = new LRUCache(3);

cache.set('a', 1);
cache.set('b', 2);
cache.set('c', 3);
cache.set('d', 4);

cache.get('a'); // undefined
cache.get('b'); // 2
cache.get('c'); // 3
cache.get('d'); // 4
```

## How it works
The Map data structure in JavaScript maintains the order of keys, allowing us to leverage it for implementing an efficient LRU cache.

Each time a get or set operation is performed, the corresponding key is deleted and re-inserted into the Map. This process ensures that the key is moved to the end of the Map, indicating its most recently used status.

When the cache reaches its maximum capacity, the first key in the Map (the least recently used key) is deleted to make space for new entries.

## API
### `LRUCache(capacity)`
Creates a new cache with the given capacity.

### `set(key, value)`
Sets the value for the given key.

### `get(key)`
Gets the value for the given key.

### `delete(key)`
Deletes the value for the given key.

### `clear()`
Clears the cache.

### `size()`
Returns the number of items in the cache.

### `capacity()`
Returns the maximum capacity of the cache.

### `has(key)`
Returns true if the cache contains the given key.

### `keys()`
Returns an iterator for the keys in the cache.

### `values()`
Returns an iterator for the values in the cache.

### License
[MIT](LICENSE)
