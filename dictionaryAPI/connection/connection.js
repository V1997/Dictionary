

const mongoose = require('mongoose');

// Connect to mongoDB

mongoose.connect('mongodb://localhost/dictionary');

mongoose.connection.once('open', function() {
    console.log('Connection has been made');
    return true;
}).on('error', function(error) {
    console.log('connection error', error);
    return false;
})

module.exports = mongoose;