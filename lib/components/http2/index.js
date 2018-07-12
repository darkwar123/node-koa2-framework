const {
	appDir,
} = require('@config');
const fs = require('fs');
const path = require('path');

// Сканируем папку с компонентами
const componentsDir = path.join(appDir, '/http2/components/');
const components = fs.readdirSync(componentsDir)
	.map((x) => require(path.resolve(componentsDir, x)));

module.exports = components;