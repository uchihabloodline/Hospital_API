const express = require('express');
const app = express();
const port = 8000;
//const session = require('express-session');
const db = require('./config/mongoose');
const passport = require('passport');
//const passportJWT = require('./config/passport-jwt-strategy.js');

// body parser for req.body
app.use(express.urlencoded({extended: true}));
app.use(express.json());


// app.use(session({
//     name: 'Hospital_API',
//     //TODO--> need to change secret before deployment
//     secret: 'hospital',
//     saveUninitialized: false,
//     resave: false,
//     cookie: {
//         maxAge: (1000*60*100)
//     },
//     store: new MongoStore(  
//         {   
//             mongooseConnection: db,
//             autoRemove: 'disabled'

//         },
//         function(err){
//             console.log(err || 'connect-mongo setup run successful!!');
//         }
//     )
// }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error running the server on port ${port}`);
    }
    console.log(`Server running good on port No. ${port}`);
});