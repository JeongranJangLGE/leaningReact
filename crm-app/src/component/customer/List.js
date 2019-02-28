import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import {displayCustomer} from '../../actions';

export const CustomerList = ({customers = [], onDisplayItem = f => f}) => {
	const handleItem = (e) => onDisplayItem(e.target.getAttribute('index'));

	return (
		<div className="listContainer">
			<ul>
				{
					(customers.length === 0) ?
					<p>No customer listed. (Add a customer)</p> :
						customers.map((customer, index) =>
							<li
								key={customer.mail}
								name={customer.mail}
								index={index}
								onClick={handleItem}
							>
								{customer.name}
							</li>
						)
				}
			</ul>
		</div>
	)
};

CustomerList.propTypes = {
	customers: PropTypes.array,
	onDisplayItem: PropTypes.func
};

const List = connect(
	state => ({
		customers: state.customers
	}),
	dispatch => ({
		onDisplayItem (index) {
			dispatch(displayCustomer(index))
		}
	})
)(CustomerList);

export default List;
