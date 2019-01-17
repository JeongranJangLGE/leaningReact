import React, { Component } from 'react';

class CustomerList extends Component {
	handleItem = (e) => {
		const name = e.target.getAttribute('name');
		const selectedItem = JSON.parse(localStorage.getItem(name));

		this.props.displayItem(selectedItem);
	}

	createTasks = (mail, name) => {
		return(
			<li
				key={mail}
				name={mail}
				onClick={this.handleItem} >
				{name}
			</li>
		)
	}

	render () {
		const customers = this.props.customers;
		customers.sort((a, b) => a.name-b.name);
		const listItems = customers.map((customer) => {
			return this.createTasks(customer.mail, customer.name);
		});
		return(
			<div className="listContainer">
				<ul>{listItems}</ul>
			</div>
		);
	}
}

export default CustomerList;
