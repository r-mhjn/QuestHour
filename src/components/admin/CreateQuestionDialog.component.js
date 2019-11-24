import React from 'react'
import { Dialog, DialogTitle, TextField, Button } from '@material-ui/core'
import Axios from '../../axiosConfig'

export default function CreateQuestionDialog(props) {
	const closeDialog = () => {
		props.setDialogOpen(false);
	}
	let questionDetails = {
		question: '',
		options: ['', '', '', ''],
		marks: 0,
		correct: 0
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		console.log('sending', questionDetails)
		Axios.post('/admin/questions/add', questionDetails)
			.then(res => {
				props.addQuestion(res.data);
				closeDialog();
			})
			.catch()
	}
	return (
		<>
			<Dialog open={props.dialogOpen} onClose={closeDialog}>
				<div style={{ padding: 50 }}>
					<DialogTitle>Create Question</DialogTitle>
					<form onSubmit={handleSubmit}>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							label="Question"
							name="question"
							autoFocus
							onChange={e => { questionDetails.question = e.target.value }}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							label="Option One"
							name="option"

							onChange={e => { questionDetails.options[0] = e.target.value }}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							label="Option Two"
							name="option"

							onChange={e => { questionDetails.options[1] = e.target.value }}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							label="Option Three"
							name="option"

							onChange={e => { questionDetails.options[2] = e.target.value }}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							label="Option Four"
							name="option"

							onChange={e => { questionDetails.options[3] = e.target.value }}
						/>
						<TextField
							type='number'
							min='1'
							max='4'
							variant="outlined"
							margin="normal"
							required
							fullWidth
							label="Correct"
							name="correct"
							onChange={e => { questionDetails.correct = parseInt(e.target.value) - 1 }}
						/>
						<TextField
							type='number'
							variant="outlined"
							margin="normal"
							required
							fullWidth
							label="Marks"
							name="question"
							onChange={e => { questionDetails.marks = parseInt(e.target.value) }}
						/>
						<Button variant='contained' color='primary' type='submit'>Add Question</Button>
						<Button >Cancel</Button>
					</form>
				</div>

			</Dialog>
		</>
	)
}
