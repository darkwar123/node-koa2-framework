const {
	appDir,
} = require('@config');
const path = require('path');

module.exports = require(path.resolve(path.join(appDir, '/ws/router')));