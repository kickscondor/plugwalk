# fswalk

[![Build Status](https://travis-ci.org/mcfedr/fswalk.svg)](https://travis-ci.org/mcfedr/fswalk)
[![npm version](https://badge.fury.io/js/fswalk.svg)](http://badge.fury.io/js/fswalk)

The simplest possible directory walker

## API

`walk(dir, walkCb, finishCb, limit)`

### Parameters

* `dir`: absolute dir to walk
* `walkCb`: `function(file, stats)` The function to be called with each file
* `finishCb`: `function(err)` Called when there are no more files
* `limit`: max depth, undefined means no limit

## Example

    var walk = require('fswalk');

    walk(__dirname, function(path, stats) {
      console.log(path, stats);
    }, function(err) {
      assert(!err);
    });

## Install

`npm install fswalk`
