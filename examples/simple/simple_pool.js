
// This example shows how to use (generic-pool) node-pool with mapnik
// to maintain a pool of renderers
//
// expected output: http://goo.gl/cyGwo

var http = require('http');
var mapnik = require('mapnik');
var mappool = require('../utils/pool.js');
var path = require('path');

// create a pool of 10 maps
// this allows us to manage concurrency under high load
var maps = mappool.create_pool(10);

var port = 8000;

var stylesheet = path.join(__dirname, '../stylesheet.xml');

var aquire = function(id,options,callback) {
    methods = {
        create: function(cb) {
                var obj = new mapnik.Map(options.width || 256, options.height || 256);
                obj.load(id, {strict: true},function(err,obj) {
                    if (err) callback(err, null);
                    if (options.buffer_size) obj.buffer_size(options.buffer_size);
                    cb(obj);
                });
            },
            destroy: function(obj) {
                delete obj;
            }
    };
    maps.acquire(id,
                  methods,
                  function(obj) {
                    callback(null, obj);
                  }
   );
};

http.createServer(function(req, res) {
  aquire(stylesheet, {},function(err,map) {
      if (err) {
          res.writeHead(500, {
            'Content-Type': 'text/plain'
          });
          res.end(err.message);
      } else {
          // zoom to full extent
          map.zoomAll();
          // real example we would pass a bbox
          var im = new mapnik.Image(map.width, map.height);
          map.render(im, function(err, im) {
              maps.release(stylesheet, map);
              if (err) {
                  res.writeHead(500, {
                    'Content-Type': 'text/plain'
                  });
                  res.end(err.message);
              } else {
                  res.writeHead(200, {
                    'Content-Type': 'image/png'
                  });
                  res.end(im.encodeSync('png'));
              }
          });
      }
  });
}).listen(port);

console.log('server running on port ' + port);
