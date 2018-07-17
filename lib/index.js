const fs = require('fs');
const log = require('@log');
const path = require('path');
const http = require('http');
// const http2 = require('http2');
const koa = require('default-koa-server');
const ws = require('default-socket.io-server');
const wsRouter = require('./router/ws/index');
const http2Router = require('./router/http2/index');
const { components: wsComponents, modules: wsModules } = require('./components/ws/index');
const { components: http2Components, modules: http2Modules } = require('./components/http2/index');
const {
	appDir,
	environment,
} = require('@config');

const options = {
	// key: fs.readFileSync(path.join(appDir, '/resources/ssl/key.pem')),
	// cert: fs.readFileSync(path.join(appDir, '/resources/ssl/cert.pem'))
};

log.info(`Running in ${environment} mode.`);
log.info(`Config is %O`, require('@config'));

module.exports = function({ port = 3000, wsPrefix } = {}) {
	const app = koa({
		router: http2Router,
		middlewares: http2Components,
	});

	if (environment === 'production') {
		app.proxy = true;
	}

	for (let module of http2Modules) {
		module(app);
	}

	let httpServer = http.createServer(options, app.callback()).listen(port, () => {
		log.info('Running http server on port %s', port);
	});

	const wsApp = ws({
		server: httpServer,
		prefix: wsPrefix,
		router: wsRouter,
		middlewares: wsComponents,
	});

	for (let module of wsModules) {
		module(wsApp);
	}

	return httpServer;
};