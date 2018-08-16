const assert = require('assert');
const environment = String(process.env.NODE_ENV).trim();

const configs = {
	production: function() {
		return {
			appDir: 'app',
			environment: 'production',
			redis: { url: assertEnvVar('REDIS_URL', 'Ссылка на redis redis://user:pass@localhost:port/database') },
			mongodb: { url: assertEnvVar('MONGODB_URL', 'Ссылка на mongodb mongodb://user:pass@localhost:port/database') },
		};
	},
	development: function() {
		return {
			appDir: 'app',
			environment: 'development',
			redis: { url: optionalEnvVar('REDIS_URL', 'Ссылка на redis redis://user:pass@localhost:port/database', 'redis://localhost:6379') },
			mongodb: { url: optionalEnvVar('MONGODB_URL', 'Ссылка на mongodb mongodb://user:pass@localhost:port/database', 'mongodb://localhost:27017/database') },
		};
	},
};

let config = configs[environment];
assert(config, `koa2-framework: Configuration ${environment} does not exist, NODE_ENV must be one of ${Object.keys(configs)}`);

config = config();

module.exports = config;

function assertEnvVar(envVar, description) {
	let value = process.env[envVar];

	if (typeof value === 'string') {
		value = value.trim()
	}

	assert(value !== null && value !== undefined, `koa2-framework: Environment variable ${envVar} (currently is ${value}) must be present. Description: ${description}`);

	return value;
}

function optionalEnvVar(envVar, description, defaultValue) {
	let value = process.env[envVar];

	if (typeof value === 'string') {
		value = value.trim()
	}

	if (value === null || value === undefined) {
		if (defaultValue === undefined) {
			console.warn(`koa2-framework: Optional environment variable ${envVar} not present. Description: ${description}`);
		} else {
			console.warn(`koa2-framework: Optional environment variable ${envVar} not present. Description: ${description}. Using default value ${defaultValue}`);
		}
	}

	return value || defaultValue;
}
