import React, { Component } from 'react';
import Main from './Main';

function Header() {
	return (
		<div className="header">
			<p>
				Customer Relationship Management System
			</p>
		</div>
	);
}

class App extends Component {
	render() {
		return (
			<div className="app">
				<Header />
				<Main />
			</div>
		);
	}
}

export default App;
