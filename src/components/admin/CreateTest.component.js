import React, { useState, useEffect } from 'react'
import { Paper, Typography, Checkbox, Button, TextField } from '@material-ui/core'
import Axios from '../../axiosConfig'
import CreateQuestionDialog from './CreateQuestionDialog.component'

export default function CreateTest(props) {
	console.log('test props', props)
	const [questionsArray, setQuestionsArray] = useState([])
	const [dialogOpen, setDialogOpen] = useState(false)

	let selected = []
	let testDetails = {
		name: '',
		minutes: 0,
		questions: []
	}
	useEffect(() => {
		Axios.get('/admin/questions')
			.then(res => {
				setQuestionsArray(res.data);
			})
			.catch(err => {
				console.log(err)
			})
	}, [])

	const addToSelected = (question) => {
		console.log(question)
		testDetails.questions.push(question)
		console.log(selected)
	}
	const removeFromSelected = (question) => {
		console.log(question)
		testDetails.questions = testDetails.questions.filter(quest => quest._id !== question._id);
		console.log(selected)
	}

	const getQuestionsList = () => {
		return questionsArray.map((question, index) => <Paper key={index} style={{ padding: 10, margin: 10, display: 'flex' }} >
			<Checkbox color='primary' onChange={(e) => { e.target.checked ? addToSelected(question) : removeFromSelected(question) }} />
			<Typography variant='h5'>{question.question}</Typography>
		</Paper>)
	}
	const addQuestion = (question) => {
		setQuestionsArray([...questionsArray, question]);
	}

	const createTest = () => {
		Axios.post('/admin/tests/add', testDetails)
			.then(res => {
				console.log(res.data)
				alert('test created!');
			})
			.catch(err => {
				console.log(err)
			})
	}

	return (
		<>
			<TextField
				autoFocus
				variant="outlined"
				margin="normal"
				required
				fullWidth
				label="Test name"
				name="option"

				onChange={e => { testDetails.name = e.target.value }}
			/>
			<TextField
				type='number'
				variant="outlined"
				margin="normal"
				required
				fullWidth
				label="Test duration (minutes)"
				name="option"
				onChange={e => { testDetails.minutes = e.target.value }}
			/>
			<Typography variant='h4'>Duration (minutes):</Typography>
			<Typography variant='h3' style={{ paddingTop: 50, display: 'inline-block' }}>Select questions or </Typography>
			<Button variant='outlined' size='large' style={{ marginTop: -15, marginLeft: 20 }} onClick={() => { setDialogOpen(true) }} >Create a question</Button>
			<CreateQuestionDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} addQuestion={addQuestion} />
			<div style={{ marginTop: 50 }}>
				{getQuestionsList()}
			</div>
			<Button variant='contained' color='primary' onClick={createTest} >Create test</Button>
		</>
	)
}
