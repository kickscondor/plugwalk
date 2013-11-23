var fs = require('fs'),
    path = require('path');

module.exports = function walk(dir, walkCb, finishCb) {
    fs.stat(dir, function(err, stats) {
        if(err) {
            finishCb && finishCb(err);
            return;
        }
        if(stats.isDirectory()) {
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
                    });
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
