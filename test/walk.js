var assert = require('assert'),
    walk = require('../walk'),
    fs = require('fs');

    function assertions(assertions, cb) {
        try {
            assertions();
            cb();
        } catch(e) {
            cb(e);
        }
    }

describe('Walk', function() {
    it('Should return an error for a missing file', function (cb) {
        walk(__dirname + '/no-such-directory', function() {}, function(err) {
            cb(!err);
        });
    });
    it('Should not call the walkCb when dir is missing', function (cb) {
        walk(__dirname + '/no-such-directory', function() {
            cb('The walkCb function should not be called');
        }, function() {
            cb();
        });
    });
    describe('First', function() {
        it('Should call the walkCb for each file', function (cb) {
            var count = 0;
            walk(__dirname + '/test-cases/first', function() {
                count++;
            }, function(err) {
                assertions(function() {
                    assert.equal(count, 1);
                    assert.equal(!!err, false);
                }, cb);
            });
        });
    });
    describe('Second', function() {
        before(function() {
            fs.mkdir(__dirname + '/test-cases/second');
        });

        it('Should call not call walkCb when dir is empty', function (cb) {
            var count = 0;
            walk(__dirname + '/test-cases/second', function() {
                count++;
            }, function(err) {
                assertions(function() {
                    assert.equal(count, 0);
                    assert.equal(!!err, false);
                }, cb);
            });
        });

        after(function() {
            fs.rmdir(__dirname + '/test-cases/second');
        });
    });
    describe('Third', function() {
        it('Should call the walkCb for each nested file', function (cb) {
            var count = 0;
            walk(__dirname + '/test-cases/third', function() {
                count++;
            }, function(err) {
                assertions(function() {
                    assert.equal(count, 7);
                    assert.equal(!!err, false);
                }, cb);
            });
        });

        it('Should call the walkCb for each nested file, but only for 2 levels', function (cb) {
            var count = 0;
            walk(__dirname + '/test-cases/third', function(f) {
                count++;
            }, function(err) {
                assertions(function() {
                    assert.equal(count, 3);
                    assert.equal(!!err, false);
                }, cb);
            }, 2);
        });
    });
});
describe('Walk with callback', function() {
    it('Should return an error for a missing file', function (cb) {
        walk(__dirname + '/no-such-directory', function(f, s, walkCb) {
            walkCb();
        }, function(err) {
            cb(!err);
        });
    });
    it('Should not call the walkCb when dir is missing', function (cb) {
        walk(__dirname + '/no-such-directory', function(f, s, walkCb) {
            cb('The walkCb function should not be called');
        }, function() {
            cb();
        });
    });
    describe('First', function() {
        it('Should call the walkCb for each file', function (cb) {
            var count = 0;
            walk(__dirname + '/test-cases/first', function(f, s, walkCb) {
                count++;
                walkCb();
            }, function(err) {
                assertions(function() {
                    assert.equal(count, 1);
                    assert.equal(!!err, false);
                }, cb);
            });
        });

        it('Should call return the error from a walkCb', function (cb) {
            var count = 0;
            walk(__dirname + '/test-cases/first', function(f, s, walkCb) {
                count++;
                walkCb('Error');
            }, function(err) {
                assertions(function() {
                    assert.equal(count, 1);
                    assert.equal(err, 'Error');
                }, cb);
            });
        });
    });
    describe('Second', function() {
        before(function() {
            fs.mkdir(__dirname + '/test-cases/second');
        });

        it('Should call not call walkCb when dir is empty', function (cb) {
            var count = 0;
            walk(__dirname + '/test-cases/second', function(f, s, walkCb) {
                count++;
                walkCb();
            }, function(err) {
                assertions(function() {
                    assert.equal(count, 0);
                    assert.equal(!!err, false);
                }, cb);
            });
        });

        after(function() {
            fs.rmdir(__dirname + '/test-cases/second');
        });
    });
    describe('Third', function() {
        it('Should call the walkCb for each nested file', function (cb) {
            var count = 0;
            walk(__dirname + '/test-cases/third', function(f, s, walkCb) {
                count++;
                walkCb();
            }, function(err) {
                assertions(function() {
                    assert.equal(count, 7);
                    assert.equal(!!err, false);
                }, cb);
            });
        });

        it('Should call the walkCb for each nested file, but only for 2 levels', function (cb) {
            var count = 0;
            walk(__dirname + '/test-cases/third', function(f, s, walkCb) {
                count++;
                walkCb();
            }, function(err) {
                assertions(function() {
                    assert.equal(count, 3);
                    assert.equal(!!err, false);
                }, cb);
            }, 2);
        });
    });
});
