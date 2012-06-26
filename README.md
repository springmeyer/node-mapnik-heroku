# Node-Mapnik
      
Bindings to [Mapnik](http://mapnik.org) for [node](http://nodejs.org).

This repo stores 64bit standalone binaries for heroku (Ubuntu Lucide LTS).

To set them up do:

    git clone https://github.com/springmeyer/node-mapnik-heroku.git
    cd node-mapnik-heroku
    export LD_LIBRARY_PATH=`pwd`/lib
    make test


See https://github.com/mapnik/node-mapnik for more details about node-mapnik.