//This file holds any configuration variables we may need
//'config.js' is usually ignored by git to protect sensitive information, such as your database's username and password

module.exports = {
    db: {
        uri: process.env.DB_URI //place the URI of your mongo database here.        
    },
    secretOrKey: process.env.SECRETORKEY
};