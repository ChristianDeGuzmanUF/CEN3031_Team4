module.exports = {
    db: {
        uri: '<mongodb url>' //place the URI of your mongo database here.        
    },
    secretOrKey: '<any alphanumeric value>',
	email: {
		address: "<recovery email sender's valid email address>",
		password: "<recovery email sender's valid password>"
	}
}; 
