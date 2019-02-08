import C from './constants'

export const addCustomer  = (name, mail, phone) =>
	({
		type: C.ADD_CUSTOMER,
		name,
		mail,
		phone
	})

export const updateCustomer = (index, name, phone) =>
	({
		type: C.UPDATE_CUSTOMER,
		index,
		name,
		phone
	})

export const deleteCustomer = (key) =>
	({
		type: C.DELETE_CUSTOMER,
		key
	})

export const displayCustomer = (index) =>
	({
		type: C.DISPLAY_CUSTOMER,
		index
	})

export const clearCustomerView = () =>
	({
		type: C.CLEAR_CUSTOMER_VIEW,
	})


