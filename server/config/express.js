const path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    passport = require("passport"),
    users = require('../routes/users'),
    clusters = require('../routes/clusterRouters'),
    user = require('../routes/userRouters');

module.exports.init = () => {
    /* 
        connect to database
        - reference README for db uri
    */
    mongoose.connect(process.env.DB_URI || require('./config').db.uri, {
        useNewUrlParser: true
    }).then(() => console.log("DB Connected!"))
       .catch(err => console.log(err));
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);

    // initialize app
    const app = express();

    // enable request logging for development debugging
    app.use(morgan('dev'));

    // body parsing middleware
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

    // passport middleware
    app.use(passport.initialize());

    app.use('/users', users);
    app.use('/api/', clusters);
    app.use('/api/', user);

    if (process.env.NODE_ENV === 'production') {
        // Serve any static files
        app.use(express.static(path.join(__dirname, '../../client/build')));

        // Handle React routing, return all requests to React app
        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
        });
    }

    return app
}

