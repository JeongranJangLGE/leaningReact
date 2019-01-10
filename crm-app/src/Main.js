import React, { Component } from 'react';
import CustomerList from './CustomerList';
import ProfileView from './ProfileView';


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerForDisplay: null,
      customers: []
    };
  }

  insertCustomer = (key, newCustomer) => {
    const pos = this.searchCustomer(key);

    if ( pos < 0) {
      this.setCustomerInLocalStorage(key, newCustomer);

      const customers = [...this.state.customers, newCustomer];
      this.setState({
        isClear: true,
        customers: customers
      });
    }
  }

  updateCustomer = (key, updatedCustomer) => {
    const pos = this.searchCustomer(key);
    const customers = [...this.state.customers];

    if (pos > -1) {
      this.setCustomerInLocalStorage(key, updatedCustomer);
      customers.splice(pos, 1);
      customers.push(updatedCustomer);
      this.setState({
        customerForDisplay: null,
        customers: customers
      });
    }
  }

  displayCustomer = (customer) => {
    this.setState({
      customerForDisplay: customer
    });
  }

  searchCustomer = (key) => {
    const customers = [...this.state.customers];
    const pos = customers.findIndex(customer => (customer.mail === key));
    //const found = customers.map(customer => customer.mail).indexOf(key);
    return pos;
  }

  searchCustomerAsPhone = () => {
  }

  deleteCustomer = (key) => {
    const customers = [...this.state.customers];
    const pos = customers.map(customer => customer.mail).indexOf(key);
    customers.splice(pos, 1);
    this.removeCustomerFromLocalStorage(key);

    this.setState({
      customerForDisplay: null,
      customers:customers
    });
  }

  getCustomerFromLocalStorage = (key) => {
    const customer =  JSON.parse(localStorage.getItem(key));
    return customer;
  }

  setCustomerInLocalStorage = (key, customer) => {
    localStorage.setItem(key, JSON.stringify(customer));
  }

  removeCustomerFromLocalStorage = (key) => {
    localStorage.removeItem(key);
  }

  componentDidMount() {
    const customers = [];
    for (let key in localStorage) {
      const customerInfo = this.getCustomerFromLocalStorage(key);
      if (customerInfo != null) {
        customers.push(customerInfo);
      }
    }

    if (customers.length > 0) {
      this.setState({
        customers
      });
    }
  }

  render() {
    return(
      <div className="main">
        <CustomerList
          customers={this.state.customers}
          displayItem={this.displayCustomer}
        />
        <ProfileView
          onSave={this.insertCustomer}
          onModify={this.updateCustomer}
          onDelete={this.deleteCustomer}
          customer={this.state.customerForDisplay}
          isClear={this.state.isClear}
        />
      </div>
    );
  }
}

export default Main;
