import React, { Component } from 'react';
import CustomerList from './CustomerList';
import ProfileView from './ProfileView';

function sortByName(a, b) {
  const aName = a.name.toUpperCase();
  const bName = b.name.toUpperCase();

  if (aName < bName) {
    return -1;
  } else if(aName > bName) {
    return 1;
  } else {
    return 0;
  }
}

function getCustomerFromLocalStorage(key) {
  const customer =  JSON.parse(localStorage.getItem(key));
  return customer;
}

function setCustomerInLocalStorage(key, customer) {
  if (customer !== null) {
    localStorage.setItem(key, JSON.stringify(customer));
  }
}

function removeCustomerFromLocalStorage(key) {
  return localStorage.removeItem(key);
}

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerForDisplay: null,
      customers: []
    };
  }

  saveCustomer = (key, customer) => {
    const pos = this.searchCustomer(key);

    if (pos < 0) {
      this.insertCustomer(key, customer);
    } else {
      this.updateCustomer(key, pos, customer);
    }
  }

  insertCustomer = (key, newCustomer) => {
    const customers = [...this.state.customers, newCustomer];

    setCustomerInLocalStorage(key, newCustomer);
    customers.sort((a, b) => sortByName(a, b));
    this.setState({
      customerForDisplay: null,
      customers: customers
    });
  }

  updateCustomer = (key, pos, updatedCustomer) => {
    const customers = [...this.state.customers];

    setCustomerInLocalStorage(key, updatedCustomer);
    customers.splice(pos, 1);
    customers.push(updatedCustomer);
    customers.sort((a, b) => sortByName(a, b));
    this.setState({
      customerForDisplay: null,
      customers: customers
    });
  }

  displayCustomer = (customer) => {
    this.setState({
      customerForDisplay: customer
    });
  }

  searchCustomer = (key) => {
    const customers = [...this.state.customers];
    const pos = customers.findIndex(customer => (customer.mail === key));
    return pos;
  }

  deleteCustomer = (key) => {
    const customers = [...this.state.customers];
    const pos = customers.map(customer => customer.mail).indexOf(key);

    customers.splice(pos, 1);
    removeCustomerFromLocalStorage(key);

    this.setState({
      customerForDisplay: null,
      customers:customers
    });
  }

  componentDidMount() {
    const customers = [];
    for (let key in localStorage) {
      const customerInfo = getCustomerFromLocalStorage(key);
      if (customerInfo != null) {
        customers.push(customerInfo);
      }
    }

    if (customers.length > 0) {
      customers.sort((a, b) => sortByName(a, b));
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
          onSave={this.saveCustomer}
          onModify={this.saveCustomer}
          onDelete={this.deleteCustomer}
          customer={this.state.customerForDisplay}
          isClear={this.state.isClear}
        />
      </div>
    );
  }
}

export default Main;
