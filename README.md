# fswalk

> The simplest possible directory walker

![Build Status](https://img.shields.io/travis/mcfedr/fswalk.svg?style=flat-square)
[![npm version](https://img.shields.io/npm/v/fswalk.svg?style=flat-square)](https://npmjs.org/package/fswalk)


## Installation

```bash
npm install fswalk
```

## Example

```js
var walk = require('fswalk');

walk(__dirname, function(path, stats) {
  console.log(path, stats);
}, function(err) {
  assert(!err);
});
```

## API

#### `walk(dir, walkCb, finishCb, limit)`

##### Parameters

* `dir`: The directory to walk
* `walkCb`: `function(file, stats[, callback])` The function to be called with each file. If a callback is given any
  errors will be propagated to finishCb and the walk will stop soon. `walkCb` is called in parallel for some files, so
  the walk will stop at the current folder. `finishCb` will not be called until all `walkCb` callbacks have been called.
* `finishCb`: `function(err)` Called when there are no more files
* `limit`: Max depth, `undefined` means no limit

##### Returns

A [fs.Stats](https://nodejs.org/docs/latest/api/fs.html#fs_class_fs_stats) object