const redis = require('@redis');
const mongodb = require('@mongodb');
const router = require('node-socket.io-router').Router();

router.get('/', (req, res, next) => {
	res.send('IUser interface');
});

module.exports = router;