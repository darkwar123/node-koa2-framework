const moduleAlias = require('module-alias');

moduleAlias.addAliases({
	'@root'  : __dirname,
	'@redis': __dirname + '/lib/database/redis',
	'@mongodb': __dirname + '/lib/database/mongodb',
});

module.exports = require('./lib/');