var fs = require('fs'),
    path = require('path');

module.exports = function walk(dir, walkCb, finishCb, limit) {
    fs.stat(dir, function(err, stats) {
        if(err) {
            finishCb && finishCb(err);
            return;
        }
        if(stats.isDirectory()) {
            if (limit !== undefined && limit == 0) {
                finishCb && finishCb();
                return;
            }
            fs.readdir(dir, function(err, files) {
                var count = files.length + 1,
                    ok = true;
                if(err) {
                    finishCb && finishCb(err);
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
                        finishCb && finishCb(err);
                    }
                }

                function after() {
                    if(ok && --count == 0) {
                        finishCb && finishCb();
                    }
                }
            });
        }
        else {
            walkCb(dir, stats);
            finishCb && finishCb();
        }
    });
};
