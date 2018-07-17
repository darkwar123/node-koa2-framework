const {
	redis,
} = require('../../components/config');
const node_redis = require("redis");
const client = node_redis.createClient(redis.url);

module.exports = client;