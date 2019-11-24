import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AdminHomeScreen from './AdminHomeScreen.component'
import CreateTest from './CreateTest.component'

// import coverLogo from '../logo/vector/default-monochrome.svg'
// import SearchItemsInput from './SearchItemsInput.component';

export default function AdminMainLayout(props) {
	return (
		<Router>
			<Route path='/admin' exact component={AdminHomeScreen} />
			<Route path='/admin/createTest' render={(thisprops) => <CreateTest loginInfo={props.loginInfo} {...thisprops} />} />
		</Router>
	)
}