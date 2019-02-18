const customer = () => {
	const customers = (localStorage.getItem('customers')) ?
		JSON.parse(localStorage.getItem('customers')) : [];
	return ({
		get: (key) => {
			return customers().get().find(item => item.mail === key)
		},
		getIndex: (key) => {
			return customers().get().findIndex(item => item.mail === key)
		}
	})
};

const customers = () => {
	return ({
		has: ()=> {
			return localStorage.getItem('customers') ? true : false
		},
		get: () => {
			return JSON.parse(localStorage.getItem('customers'));
		},
		set: (newCustomers) => {
			localStorage.clear('customers');
			localStorage.setItem('customers', JSON.stringify(newCustomers))
		}
	});
};
const storage = {
	hasData: () => customers().has(),
	getIndex: (key) => customer().getIndex(key),
	getCustomer: (key) => customer().get(key),
	getCustomers: () => customers().get(),
	setCustomers: (newCustomers) => customers().set(newCustomers)
};

export default storage;
