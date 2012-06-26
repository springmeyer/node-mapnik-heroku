# Node-Mapnik
      
Bindings to [Mapnik](http://mapnik.org) for [node](http://nodejs.org).

This repo stores 64bit standalone binaries for heroku (Ubuntu Lucide LTS).

To set them up do:

    sudo apt-add-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs npm
    git clone https://github.com/springmeyer/node-mapnik-heroku.git
    cd node-mapnik-heroku
    export LD_LIBRARY_PATH=`pwd`/lib

Test require:

    # local
    node -e "require('./lib/mapnik')"
    # global
    export NODE_PATH=./lib
    node -e "require('mapnik')"


Note: if you need fancy projections support, support for Unicode string expressions,
or support for bundled Unifont use the `unicode-and-projections` branch.

If running the `unicode-and-projections` branch then all tests should pass if you do:

    make test

See https://github.com/mapnik/node-mapnik for more details about node-mapnik.