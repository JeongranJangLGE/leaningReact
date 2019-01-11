import React, { Component } from 'react';

class CustomerList extends Component {
  handleItem = (e) => {
    const name = e.target.getAttribute('name');
    const selectedItem = JSON.parse(localStorage.getItem(name));

    this.props.displayItem(selectedItem);
  }

  createTasks = (item) => {
    return(
      <li
        key={item.mail}
        name={item.mail}
        onClick={this.handleItem} >
        {item.name}
      </li>
     )
  }

  render() {
    const customers = this.props.customers;
    customers.sort((a, b) => a.name-b.name);
    const listItems = customers.map(this.createTasks);
    return(
      <div className="listContainer">
        <ul>
          {listItems}
        </ul>
      </div>
    );
  }
}

export default CustomerList;
