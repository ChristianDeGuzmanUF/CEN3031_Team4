const express = require('./config/express.js')

const mongoose = require('mongoose');
const config = require('./config/config.js');

let db;

mongoose.set('bufferCommands', false);
db = mongoose.connect(process.env.DB_URI || config.db.uri, {useNewUrlParser: true, useUnifiedTopology: true});


// Use env port or default
const port = process.env.PORT || 5000;

const app = express.init()
app.listen(port, () => console.log(`Server now running on port ${port}!`));
