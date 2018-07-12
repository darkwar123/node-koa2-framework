const {
	port,
	environment,
} = require('@config');
const os = require('os');
const cluster = require('cluster');
const koaFramework = require('koa2-framework');

if (environment === 'development') {
	koaFramework({ port: Number(port) });
} else {
	if (cluster.isMaster) {
		let workers = [];
		let cpus = os.cpus().length;
		let spawn = function spawn (i) {
			workers[i] = cluster.fork({
				id: i,
			});

			workers[i].on('exit', () => {
				log.error(`Worker #${i} is down, restarting`);
				spawn(i);
			});
		};

		for(let i = 0; i < cpus; i++){
			spawn(i);
		}
	} else {
		koaFramework({ port: Number(process.env.id) + Number(port) });
	}
}