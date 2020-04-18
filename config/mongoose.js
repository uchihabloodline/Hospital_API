const mongoose = require('mongoose');

//additional mongoose setup
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost/Hospital_API');
const db = mongoose.connection;

//error reporting 
db.on('error',console.error.bind(console,'failed to connect MongoDb!!'));

//if connected successfully
db.once('open',()=>{
    console.log("successfully connected to database!!");
});

module.exports = db;

