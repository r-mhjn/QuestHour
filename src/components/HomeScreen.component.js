import React from 'react'
import { Button, Typography } from '@material-ui/core/'
import { Link } from 'react-router-dom'
// import coverLogo from '../logo/vector/default-monochrome.svg'
// import SearchItemsInput from './SearchItemsInput.component';

export default function HomeScreen(props) {
	return (
		<div style={{ textAlign: "center", paddingTop: 100 }}>
			{/* <img src={coverLogo} alt='cover' style={{ maxHeight: 300, marginBottom: 50 }} /> */}
			<Typography variant='h1' align='center'>Welcome programmer!</Typography>
			{/* <SearchItemsInput /> */}
			<div style={{ marginTop: 100 }}></div>
			{props.loginInfo.type === 'admin' ? <Link to='/admin/createTest'><Button variant='outlined' size='large' >Create a test</Button></Link> : ''}

		</div>
	)
}