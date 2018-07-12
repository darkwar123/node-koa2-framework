const passport = require('koa-passport');

module.exports = [
	passport.initialize(),
	passport.session(),
];