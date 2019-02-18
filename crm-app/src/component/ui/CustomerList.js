import PropTypes from 'prop-types';
import React from 'react';

const CustomerList = ({customers=[], onDisplayItem=f=>f}) => {
	const handleItem = (e) => {
		const index = e.target.getAttribute('index');
		onDisplayItem(index);
	}

	return(
		<div className="listContainer">
			<ul>
				{(customers.length === 0) ?
				<p>No customer listed. (Add a customer)</p> :
					customers.map((customer, index) =>
						<li key={customer.mail}
						name={customer.mail}
						index={index}
						onClick={handleItem}>
						{customer.name}
					</li>
					)
				}
			</ul>
		</div>
	)
}

CustomerList.propTypes = {
	customers: PropTypes.array,
	onDisplayItem:PropTypes.func
}

export default CustomerList;
