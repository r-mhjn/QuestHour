var router = require('express').Router();

router.route('/').get((req, res) => {
	res.send('lol')
})

router.route('/lmao').get((req, res) => {
	res.send('lollmao')
})

module.exports = router