const fs = require('fs');
const log = require('@log');
const path = require('path');
const http2 = require('http2');
const koa = require('default-koa-server');
const http2Router = require('./router/http2/index');
const http2Components = require('./components/http2/index');
const {
	appDir,
	environment,
} = require('@config');

const options = {
	key: fs.readFileSync(path.join(appDir, '/resources/ssl/key.pem')),
	cert: fs.readFileSync(path.join(appDir, '/resources/ssl/cert.pem'))
};

log.info(`Running in ${environment} mode.`);
log.info(`Config is %O`, require('@config'));

module.exports = function({ port = 3000 } = {}) {
	const app = koa({
		router: http2Router,
		middlewares: http2Components,
	});

	if (environment === 'production') {
		app.proxy = true;
	}

	return http2.createSecureServer(options, app.callback()).listen(port, () => {
		log.info('Running server on port %s', port);
	});
};