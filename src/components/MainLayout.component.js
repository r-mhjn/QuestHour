import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import Navbar from './Navbar.component'
import HomeScreen from './HomeScreen.component'
import AdminLogin from './Login.component'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CreateTest from './CreateTest.component';
// import SearchResults from './SearchResults.component';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: 'rgb(80, 163, 251)'
		},
		secondary: {
			main: 'rgb(220, 234, 255)'
		}
	}
});

export default function MainLayout() {
	let localLoginInfo = {}
	if (localStorage.loginInfo) {
		localLoginInfo = { ...JSON.parse(localStorage.loginInfo) }
	} else {
		localLoginInfo = { loggedIn: false }
	}
	console.log(localLoginInfo)
	const [loginInfo, setLoginInfo] = useState(localLoginInfo);
	// const { loggedIn, username } = JSON.parse(localStorage.loginInfo);
	const logout = () => {
		setLoginInfo({ loggedIn: false, username: '' });
	}

	return (
		<>
			<ThemeProvider theme={theme}>

				<Container maxWidth='lg'>
					<div style={{ paddingTop: 60 }} >
						{loginInfo.loggedIn ? <Router>
							<Navbar loginInfo={loginInfo} logout={logout} />
							<Route path='/' exact render={(props) => <HomeScreen loginInfo={loginInfo} {...props} />} />
							<Route path='/admin/createTest' render={(props) => <CreateTest loginInfo={loginInfo} {...props} />} />
							{/* <Route path='/products' component={SearchResults} /> 
							<Route path='/transactions' exact component={HomeScreen} />
							<Route path='/cart' exact component={HomeScreen} /> */}
						</Router> : <AdminLogin setLoginInfo={setLoginInfo} />}
					</div>
				</Container>
			</ThemeProvider>
		</>
	)
}