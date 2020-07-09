var router = require('express').Router();
// const Question = require('../../database/models/question.model');
const Test = require('../../database/models/test.model');

//do pagination
router.route('/').get((req, res) => {
	Test.find().populate('questions')
		.then(tests => res.json(tests))
		.catch(err => res.status(400).json(err));
});

router.route('/add').post((req, res) => {
	// console.log(req.user,req.admin)
	const getQuestionIds = () => {
		return req.body.questions.map(question => question._id)
	}
	let new_test = new Test({
		questions: getQuestionIds(),
		name: req.body.name,
		minutes: req.body.minutes,
		author: req.user._id
	});
	new_test.save()
		.then(test => {
			res.json(test);
		})
		.catch(err => {
			res.status(400).json(err);
		})
});

// router.route('/update/:id').put((req, res) => {
// 	Route.findById(req.params.id)
// 		.then(old_route => {
// 			old_route.bus_stops = req.body.bus_stops;
// 			old_route.save()
// 				.then(() => Route.find())
// 				.then(routes => res.json(routes))
// 				.catch(err => res.status(400).json(err));
// 		})
// 		.catch(err => res.status(400).json(err));
// });

// router.route('/delete/:id').delete((req, res) => {
// 	Question.findByIdAndDelete(req.params.id)
// 		.then(() => {
// 			res.json('ok');
// 		})
// 		.catch(err => {
// 			res.status(400).json(err);
// 		})
// });

module.exports = router;