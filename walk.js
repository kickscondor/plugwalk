var fs = require('fs'),
    path = require('path');

module.exports = function walk(dir, walkCb, finishCb, limit) {
    function callWalkCb(file, stats, cb) {
        if (walkCb.length == 3) {
            walkCb(file, stats, cb);
        } else {
            walkCb(file, stats);
            cb();
        }
    }

    function callFinishCb(err) {
        finishCb && finishCb(err);
    }

    fs.stat(dir, function(err, stats) {
        if(err) {
            callFinishCb(err);
            return;
        }
        if(stats.isDirectory()) {
            if (limit !== undefined && limit == 0) {
                callFinishCb();
                return;
            }
            fs.readdir(dir, function(err, files) {
                var count = files.length + 1,
                    ok = true;
                if(err) {
                    callFinishCb(err);
                    return;
                }

                files.forEach(function(file) {
                    walk(path.join(dir, file), walkCb, function(err) {
                        if(err) {
                            fail(err);
                            return;
                        }
                        after();
                    }, limit > 0 ? limit - 1 : limit);
                });

                after();

                function fail(err) {
                    if(ok) {
                        ok = false;
                        callFinishCb(err);
                    }
                }

                function after() {
                    if(ok && --count == 0) {
                        callFinishCb();
                    }
                }
            });
        }
        else {
            callWalkCb(dir, stats, callFinishCb);
        }
    });
};
