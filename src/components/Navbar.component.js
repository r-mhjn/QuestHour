import React from 'react'
// import profileLogo from '../logo/profile.png'
import { Typography } from '@material-ui/core'
// import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone';
import { Link } from 'react-router-dom'

export default function Navbar(props) {
	return (
		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
			<Link to='/' >
				{/* <img src={profileLogo} alt='logo' style={{ height: 70 }} /> */}
				<Typography variant='h4'>QuestHour</Typography>
			</Link>
			<div style={{ paddingTop: 10 }}>
				<Typography style={{ display: 'inline' }} variant='h5'> Welcome, {props.loginInfo.loggedIn ? props.loginInfo.username + ' ' : ''}</Typography>
				{
					!props.loginInfo.loggedIn ? <Link to='login' className='login-btn' ><Typography style={{ display: 'inline' }} variant='h5'>Login</Typography></Link> :
						<Link to='/' className='logout-btn' ><Typography style={{ display: 'inline' }} onClick={()=>{props.onLogout()}} variant='h5'>Logout</Typography></Link>
				}
			</div>
		</div>
	)
}