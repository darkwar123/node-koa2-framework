const {
	appDir,
	mongodb,
} = require('../../components/config');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

mongoose.Promise = Promise;

const modelsDir = path.join(appDir, 'models');

mongoose.set('useCreateIndex', true);
const connection = mongoose.createConnection(mongodb.url, {
	useNewUrlParser: true,
});

const models = fs.readdirSync(modelsDir);

for (let i of models) {
	const name = i.replace(/\.js$/i, '');
	i = require(path.resolve(modelsDir, i));

	connection.model(name, i);
}

module.exports = connection;