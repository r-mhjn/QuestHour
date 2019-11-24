import React, { useState, useEffect } from 'react'
import { Paper, Typography, Checkbox } from '@material-ui/core'
import Axios from '../../axiosConfig'

export default function CreateTest() {
	const [questionsArray, setQuestionsArray] = useState([])
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
		return questionsArray.map((question, index) => <Paper key={index} style={{ padding: 10, margin: 10,display:'flex' }} >
			<Checkbox color='primary' onChange={(e) => { e.target.checked ? addToSelected(question) : removeFromSelected(question) }} />
			<Typography  variant='h5'>{question.question}</Typography>
		</Paper>)
	}
	return (
		<div style={{ marginTop: 50 }}>
			{getQuestionsList()}
		</div>
	)
}
