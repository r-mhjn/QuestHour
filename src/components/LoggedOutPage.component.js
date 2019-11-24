import React from 'react'
import { Button, Typography } from '@material-ui/core/'
import { Link } from 'react-router-dom'
// import coverLogo from '../logo/vector/default-monochrome.svg'
// import SearchItemsInput from './SearchItemsInput.component';

export default function HomeScreen(props) {
	return (
		<div style={{ textAlign: "center", paddingTop: 100 }}>
			{/* <img src={coverLogo} alt='cover' style={{ maxHeight: 300, marginBottom: 50 }} /> */}
			<Typography variant='h1' align='center'>QuestHour</Typography>
			{/* <SearchItemsInput /> */}
			<div style={{ marginTop: 100 }}></div>
			<Link to='/admin'><Button variant='outlined' size='large' >Teacher Login</Button></Link>
			<Link to='/user'><Button variant='outlined' size='large' >Student Login</Button></Link>

		</div>
	)
}