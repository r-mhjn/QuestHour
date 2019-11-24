import React, { useState, useEffect } from 'react'
import { Paper, Typography, Checkbox, Button } from '@material-ui/core'
import Axios from '../../axiosConfig'
import CreateQuestionDialog from './CreateQuestionDialog.component'

export default function CreateTest(props) {
	console.log('test props', props)
	const [questionsArray, setQuestionsArray] = useState([])
	const [dialogOpen, setDialogOpen] = useState(false)
	let selected = []
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
		selected.push(question)
		console.log(selected)
	}
	const removeFromSelected = (question) => {
		console.log(question)
		selected = selected.filter(quest => quest._id !== question._id);
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
	return (
		<>
			<Typography variant='h3' style={{ paddingTop: 50, display: 'inline-block' }}>Select questions or </Typography>
			<Button variant='outlined' size='large' style={{ marginTop: -15, marginLeft: 20 }} onClick={() => { setDialogOpen(true) }} >Create a question</Button>
			<CreateQuestionDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} addQuestion={addQuestion} />
			<div style={{ marginTop: 50 }}>
				{getQuestionsList()}
			</div>
			<Button variant='contained' color='primary' ></Button>
		</>
	)
}
