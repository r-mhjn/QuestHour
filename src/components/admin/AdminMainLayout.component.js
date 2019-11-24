import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AdminHomeScreen from './AdminHomeScreen.component'

// import coverLogo from '../logo/vector/default-monochrome.svg'
// import SearchItemsInput from './SearchItemsInput.component';

export default function AdminMainLayout(props) {
	return (
		<Router>
			<Route path='/' component={AdminHomeScreen} />
		</Router>
	)
}