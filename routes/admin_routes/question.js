var router = require('express').Router();
const Question = require('../../models/question.model');

//do pagination
router.route('/').get((req, res) => {
	Question.find()
		.then(questions => res.json(questions))
		.catch(err => res.status(400).json(err));
});

router.route('/add').post((req, res) => {
	// console.log(req.user,req.admin)
	let new_question = new Question({
		question: req.body.question,
		marks: req.body.marks,
		options: req.body.options,
		correct: req.body.correct,
		author: req.user._id
	});
	new_question.save()
		.then(question => {
			res.json(question);
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

router.route('/delete/:id').delete((req, res) => {
	Question.findByIdAndDelete(req.params.id)
		.then(() => {
			res.json('ok');
		})
		.catch(err => {
			res.status(400).json(err);
		})
});

module.exports = router;