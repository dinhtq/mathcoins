module.exports = {
	//development configuration options
	db: 'mongodb://localhost/mean-book',
	sessionSecret: 'developmentSessionSecret',
	facebook: {
		clientID: '451535861724118',
		clientSecret: '101e2699c22ad4bd12926f02caa6ba12',
		callbackURL: 'http://localhost:3000/oauth/facebook/callback'
	}
};