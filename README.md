# fswalk

The simplest possible directory walker

## API

`walk(dir, walkCb, finishCb)`

### Parameters

* `dir`: absolute dir to walk
* `walkCb`: `function(file, stats)` The function to be called with each file
* `finishCb`: `function(err)` Called when there are no more files

## Example

    var walk = require('fswalk');

    walk(__dirname, function(path, stats) {
      console.log(path, stats);
    }, function(err) {
      assert(!err);
    });

## Install

`npm install fswalk`
