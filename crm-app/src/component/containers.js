import { connect } from 'react-redux';
import { addCustomer, updateCustomer, deleteCustomer, displayCustomer, resetCustomer } from '../actions';
import CustomerList from './ui/CustomerList';
import ProfileView from './ui/ProfileView';

export const List = connect(
	state => ({
		customers: state.customers
	}),
	dispatch => ({
		onDisplayItem(index) {
			dispatch(displayCustomer(index))
		}
	})
)(CustomerList);

export const View = connect (
	state => ({
		displayedIndex: state.displayedIndex,
		customers: state.customers
	}),
	dispatch => ({
		onAdd(name, mail, phone) {
			dispatch(addCustomer(name, mail, phone))
		},
		onUpdate(index, name, phone) {
			dispatch(updateCustomer(index, name, phone))
		},
		onCancel() {
			dispatch(resetCustomer())
		},
		onDelete(index) {
			dispatch(deleteCustomer(index))
		}
	})
)(ProfileView);
