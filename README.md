# fswalk

> A simple, flexible directory walker that can be decoupled from the 'fs'
> module.

## Installation

```bash
npm install plugwalk
```

## Example

```js
var walk = require('plugwalk');

walk(__dirname, function(path, stats) {
  console.log(path, stats);
}, function(err) {
  assert(!err);
});
```

## API

#### `walk(dir, walkCb, finishCb, limit, readdir, stat)`

##### Parameters

* `dir`: The directory to walk
* `walkCb`: `function(file, stats[, callback])` The function to be called with each file.
  * `file`:  Relative file path.
  * `stats`: [fs.Stats](https://nodejs.org/docs/latest/api/fs.html#fs_class_fs_stats) object
  * `callback`: If given, any errors will be propagated to `finishCb` and the walk will stop soon. `walkCb` is called in parallel for some files, so the walk will stop at the current folder. `finishCb` will not be called until all `walkCb` callbacks have been called.
* `finishCb`: `function(err)` Called when all files have been walked.
* `limit`: Max depth, `undefined` means no limit.
* `readdir`: Replacement for `fs.readdir` call.
* `stat`: Replacement for `fs.stat` call.
