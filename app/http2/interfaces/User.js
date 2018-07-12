const redis = require('@redis');
const mongodb = require('@mongodb');
const router = require('koa-router')();

router.get('/', async (ctx) => {
	ctx.body = 'IUser interface';
});

module.exports = router;