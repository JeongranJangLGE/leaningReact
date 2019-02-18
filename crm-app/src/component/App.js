import React, { Component } from 'react';
import { List, View } from './containers';

function Header() {
	return (
		<div className="header">
			Customer Relationship Management System
		</div>
	);
}

class App extends Component {

	render() {
		return (
			<div className="app">
				<Header />
				<View />
				<List />
			</div>
		);
	}
}

export default App;
