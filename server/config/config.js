//This file holds any configuration variables we may need
//'config.js' is usually ignored by git to protect sensitive information, such as your database's username and password

module.exports = {
    db: {
        uri: 'mongodb+srv://user:test@cen3031-spring-2020-ppk8p.mongodb.net/test?retryWrites=true&w=majority' //place the URI of your mongo database here.        
    },
    secretOrKey: 'secret'
};