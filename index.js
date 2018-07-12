const moduleAlias = require('module-alias');

moduleAlias.addAliases({
	'@root'  : __dirname,
	'@redis': __dirname + '/lib/database/redis',
	'@mongodb': __dirname + '/lib/database/mongodb',
	'@config': __dirname + '/lib/components/config',
	'@log': __dirname + '/lib/components/log',
});

module.exports = require('./lib/');