var router = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('./adminAuth/strategy');

const questionsRouter = require('./admin_routes/question');
const testsRouter = require('./admin_routes/test');
// const passengersRouter = require('./admin_routes/passenger');
// const driversRouter = require('./admin_routes/driver');
// const busesRouter = require('./admin_routes/bus');

// router.route('/login').post((req, res, next) => {
// 	passport.authenticate('admin-login', {
// 		session: false,
// 	}, (err, admin, info) => {
// 		if (err) {
// 			return res.status(400).json(err);
// 		}
// 		if (admin) {
// 			payload = {
// 				_id: admin._id,
// 				ip: req.ip
// 			};
// 			const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60*60*24 });
// 			return res.json({ token });
// 		} else {
// 			return res.status(401).json('Unauthorized');
// 		}
// 	})(req, res, next);
// });

router.route('/login').post(passport.authenticate('admin-login', { session: false }), (req, res) => {
	console.log(req.cookies);
	let payload = {
		admin: {
			_id: req.user._id,
		},
		lastLogin: new Date()
	}
	jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 * 60 }, (err, token) => {
		if (err) {
			res.status(400).json(err);
		}

		res.cookie('jwt', token, {
			httpOnly: true,
			// sameSite:true,
			// signed:true,
			// secure:true
		});

		res.json(token);
	});
});

router.route('/logout').get(passport.authenticate('jwt', { session: false }), (req, res) => {
	res.clearCookie("jwt", { path: "/", httpOnly: true });
	res.json('logged out!');
});

router.use('/questions', passport.authenticate('jwt', { session: false }), questionsRouter);
router.use('/tests', passport.authenticate('jwt', { session: false }), testsRouter);
// router.use('/passengers', passport.authenticate('jwt', { session: false }), passengersRouter);
// router.use('/drivers', passport.authenticate('jwt', { session: false }), driversRouter);
// router.use('/buses', passport.authenticate('jwt', { session: false }), busesRouter);

module.exports = router;