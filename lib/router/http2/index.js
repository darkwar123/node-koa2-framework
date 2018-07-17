const {
	appDir,
} = require('../../components/config');
const path = require('path');

module.exports = require(path.resolve(path.join(appDir, '/http2/router')));