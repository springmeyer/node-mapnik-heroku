var path = require('path');

module.exports.paths = {
    'fonts': path.join(__dirname, 'mapnik/fonts'),
    'input_plugins': path.join(__dirname, 'mapnik/input')
};

module.exports.env = {
    'ICU_DATA':path.join(__dirname,'share/icu'),
    'PROJ_LIB':path.join(__dirname,'share/proj'),
    'GDAL_DATA':path.join(__dirname,'share/gdal')
}

