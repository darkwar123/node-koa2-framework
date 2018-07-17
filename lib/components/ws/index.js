const {
	appDir,
} = require('../../components/config');
const fs = require('fs');
const path = require('path');

// Сканируем папку с компонентами
const componentsDir = path.join(appDir, '/ws/components/');
const components = fs.readdirSync(componentsDir)
	.map((x) => require(path.resolve(componentsDir, x)));

// Сканируем папку с модулями
const modulesDir = path.join(appDir, '/ws/modules/');
const modules = fs.readdirSync(modulesDir)
	.map((x) => require(path.resolve(modulesDir, x)));

module.exports = { components, modules };