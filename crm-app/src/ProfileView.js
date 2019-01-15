import React, { Component } from 'react';

function addButton (name, handle) {
	return (
		<button type="button" onClick={handle}>
			{name}
		</button>
	);
}

function enableElement (element) {
	if (element.hasAttribute('disabled')) {
		element.disabled = false;
	}
}

function disableElement (element) {
	element.setAttribute('disabled', true);
}

class ProfileView extends Component {
	constructor (props) {
		super(props);
		this.formRef = React.createRef();
	}

	handleSave = (e) => {
		const name = e.target.name.value;
		const mail = e.target.mail.value;
		const phone = e.target.phone.value;

		if (name !== '' || mail !== '' || phone !== '') {
			const info = {
				name: name,
				mail: mail,
				phone: phone
			}
			this.props.onSave(mail, info);
		}
		e.preventDefault();
	}

	handleCancel = (e) => {
		const form = e.target.form;
		enableElement(form.mail);
		this.clearForm(form);
		this.props.onCancel();
		e.preventDefault();
	}

	handleDelete = (e) => {
		const form = e.target.form;
		this.props.onDelete(form.mail.value);
		e.preventDefault();
	}

	clearForm = (target) => {
		target.name.value = '';
		target.mail.value = '';
		target.phone.value = '';
	}

	setCustomerInfo = (customer) => {
		if (customer && customer != null) {
			const form = this.formRef.current;
			form.name.value = customer.name;
			form.mail.value = customer.mail;
			form.phone.value = customer.phone;
		}
	}

	componentWillUpdate (nextProps, nextState) {
		const customer =nextProps.customer;
		const form = this.formRef.current;

		if (customer != null) {
			this.setCustomerInfo(customer);
			disableElement(form.mail);
			this.deleteButton = addButton('Delete', this.handleDelete);
		} else {
			this.clearForm(form);
			enableElement(form.mail);
			this.deleteButton = null;
		}
	}

	render () {
		return(
			<div className="viewContainer">
				<form
					ref={this.formRef}
					onSubmit={this.handleSave}>
					<div>
						<label>Name: </label>
						<input
							name="name"
							type="text"
							placeholder="username"
							required
						/>
					</div>
					<div>
						<label>E-mail: </label>
						<input
							name="mail"
							type="email"
							placeholder="username@mail.com"
							required
						/>
					</div>
					<div>
						<label>Phone: </label>
						<input
							name="phone"
							type="text"
							placeholder="phone number: 010-xxxx-xxxx"
							pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
							required
						/>
					</div>
					<button type="submit">
						Save
					</button>
					<button
						type="button"
						onClick={this.handleCancel}>
						Cancel
					</button>
					{this.deleteButton}
				</form>
			</div>
		);
	}
}

export default ProfileView;