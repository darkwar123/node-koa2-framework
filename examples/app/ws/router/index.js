const fs = require('fs');
const path = require('path');
const redis = require('@redis');
const mongodb = require('@mongodb');
const router = require('node-socket.io-router').Router();

// Сканируем папку с интерфейсами
const interfacesDir = path.join(__dirname, '../interfaces/');
const interfaces = fs.readdirSync(interfacesDir)
	.map((x) => /(.+)\.js$/i.exec(x)[1]);

// Привязываем интерфейсы к текущему роутеру
for (let name of interfaces) {
	router.use('/api/I' + name, require(
		path.resolve(interfacesDir, name)
	));
}

module.exports = router;