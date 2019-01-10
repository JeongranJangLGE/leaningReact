import React, { Component } from 'react';

/*
 * https://medium.com/@everdimension/how-to-handle-forms-with-just-react-ac066c48bd4f
 */

class ProfileView extends Component {
  constructor(props) {
    super(props);
    this.btnSettings = {
      leftBtn: "Save",
      rightBtn: "Cancel",
      handleLeftBtn: this.handleSave,
      handleRightBtn: this.handleCancel
    };
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
      this.clearForm(e);
    }
    e.preventDefault();
  }

  handleCancel = (e) => {
    this.clearFormByUsingRef();
    e.preventDefault();
  }

  handleModify = (e) => {
    // email check => if user change email, cannot save and leave the warning message
    const name = e.target.name.value;
    const mail = e.target.mail.value;
    const phone = e.target.phone.value;
    if (name !== '' || mail !== '' || phone !== '') {
      const info = {
        name: name,
        mail: mail,
        phone: phone
      }
      this.props.onModify(mail, info);
      this.clearForm(e);
    }

    e.preventDefault();
  }

  handleDelete = (e) => {
    const mail = e.target.form.mail.value;
    this.props.onDelete(mail);
    this.clearFormByUsingRef();
    e.preventDefault();
  }
  clearForm = (e) => {
    e.target.name.value = '';
    e.target.mail.value = '';
    e.target.phone.value = '';
  }

  clearFormByUsingRef = () => {
    const form = this.formRef.current;
    form.name.value = '';
    form.mail.value = '';
    form.phone.value = '';
  }

  setCustomerInfo = (customer) => {
    if (customer && customer != null && customer !== undefined) {
      const form =this.formRef.current;
      form.name.value = customer.name;
      form.mail.value = customer.mail;
      form.phone.value = customer.phone;
    }
  }

  setButtons = (customer, isEmpty) => {
    if (isEmpty) {
      const form = this.formRef.current;
      form.mail.setAttribute('disabled', 'disabled');
      this.buttonSet = {
        leftbutton: "Save",
        rightbutton: "Cancel",
        handleLeftButton: this.handleSave,
        handleRightButton: this.handleCancel
      };
    } else {
      const form = this.formRef.current;
      form.mail.setAttribute('disabled', 'disabled');
      this.buttonSet = {
        leftbutton: "Save",
        rightbutton: "Delete",
        handleLeftButton: this.handleModify,
        handleRightButton: this.handleDelete
      };
    }
  }
  setBaseButtons() {
    this.buttonSet = {
        leftbutton: "Save",
        rightbutton: "Cancel",
        handleLeftButton: this.handleSave,
        handleRightButton: this.handleCancel
      };
  }

  setButtonsForDisplay() {
    this.buttonSet = {
        leftbutton: "Save",
        rightbutton: "Delete",
        handleLeftButton: this.handleModify,
        handleRightButton: this.handleDelete
      };
  }

  enableElement(element) {
    element.removeAttribute('disabled');
  }

  disableElement(element) {
    element.setAttribute('disabled', 'disabled');
  }

  componentWillRecieveProps() {
    const customer = this.props.customer;
    const element = this.formRef.current.mail;

    if (customer && customer != null) {
      this.setCustomerInfo(customer);
    }

    if (customer === null) {
      this.enableElement(element);
    } else {
      this.disableElement(element);
    }
  }

  render() {
    const customer = this.props.customer;

    if (customer && customer != null && customer !== undefined) {
      const element = this.formRef.current.mail;
      this.setCustomerInfo(customer);
      this.setButtonsForDisplay();
      this.disableElement(element);
    } else {
      this.setBaseButtons();
    }

    return(
      <div className="viewContainer">
        <form ref={this.formRef} onSubmit={this.buttonSet.handleLeftButton}>
          <div className="formGroup">
            <label>Name: </label>
            <input name="name" type="text" placeholder="username" required />
          </div>
          <div className="formGroup">
            <label>E-mail: </label>
            <input name="mail" type="email" placeholder="username@mail.com" required />
          </div>
          <div className="formGroup">
            <label>Phone: </label>
            <input name="phone" type="text" placeholder="phone number: 010-xxxx-xxxx" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" required />
          </div>
          <button type="submit">{this.buttonSet.leftbutton}</button>
          <button type="button" onClick={this.buttonSet.handleRightButton}>{this.buttonSet.rightbutton}</button>
        </form>
      </div>
    );
  }
}

export default ProfileView;
