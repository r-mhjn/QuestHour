import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import Navbar from './Navbar.component'
// import HomeScreen from './HomeScreen.component'
import LoggedOutPage from './LoggedOutPage.component'

import AdminMainLayout from './admin/AdminMainLayout.component'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Login from './Login.component'

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
	try {
		localLoginInfo = JSON.parse(localStorage.loginInfo)
		console.log('found login info on local')
	} catch (error) {
		localLoginInfo = { loggedIn: false }
	}
	console.log(localStorage)

	console.log(localLoginInfo)
	const [loginInfo, setLoginInfo] = useState(localLoginInfo);
	// const { loggedIn, username } = JSON.parse(localStorage.loginInfo);
	const onLogout = () => {
		localStorage.loginInfo = JSON.stringify({ loggedIn: false });
		setLoginInfo({ loggedIn: false, username: '' });
	}

	if(loginInfo.loggedIn && window.location.pathname==='/'){
		if(loginInfo.type==='admin'){
			window.history.pushState("object or string", "Title", "/admin/");
		}else{
			window.history.pushState("object or string", "Title", "/user/");
		}
	}

	return (
		<>
			<ThemeProvider theme={theme}>

				<Container maxWidth='lg'>
					<div style={{ paddingTop: 60 }} >
						{loginInfo.loggedIn ?
							<Router>
								<Navbar loginInfo={loginInfo} onLogout={onLogout} />
								{/* <Route path='/' exact render={(props) => <HomeScreen loginInfo={loginInfo} {...props} />} /> */}
								{loginInfo.type === 'admin' ?
									<Route path='/admin' render={(props) => <AdminMainLayout loginInfo={loginInfo} {...props} />} />
									// <AdminMainLayout loginInfo={loginInfo} />
									:
									<Route path='' />

								}
								{/* <Route path='/admin/createTest' render={(props) => <CreateTest loginInfo={loginInfo} {...props} />} /> */}
							</Router>
							:
							<Router>
								<Route path='/' exact component={LoggedOutPage} />
								<Route path='/admin' render={(props) => <Login loginType='admin' setLoginInfo={setLoginInfo} {...props} />} />
							</Router>
						}
					</div>
				</Container>
			</ThemeProvider>
		</>
	)
}