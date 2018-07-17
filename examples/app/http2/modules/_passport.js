const passport = require('koa-passport');

module.exports = function(app) {
	app.use(passport.initialize());
	app.use(passport.session());
};