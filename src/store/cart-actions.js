import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

export const fetchCartData = () => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await fetch('https://react-http-88f71-default-rtdb.europe-west1.firebasedatabase.app/cart.json');

			if (!response.ok) {
				throw new Error('Could not fetch cart data!');
			}

			const data = await response.json();

			return data;
		};

		try {
			const cartData = await fetchData();
			dispatch(cartActions.replaceCart(cartData));
		} catch (error) {
			dispatch(
				uiActions.showNotification({
					status: 'error',
					name: 'Error!',
					message: 'Fetching cart data failed!'
				})
			);
		}
	};
};

export const sendCartData = (cart) => {
	return async (dispatch) => {
		dispatch(
			uiActions.showNotification({
				status: 'pending',
				name: 'Sending...',
				message: 'Sending cart data!'
			})
		);

		const sendRequest = async () => {
			const response = await fetch(
				'https://react-http-88f71-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
				{
					method: 'PUT',
					body: JSON.stringify(cart)
				}
			);

			if (!response.ok) {
				throw new Error('Sending cart data failed');
			}
		};

		try {
			await sendRequest();
			dispatch(
				uiActions.showNotification({
					status: 'success',
					name: 'Success!',
					message: 'Sent cart data successfully!'
				})
			);
		} catch (error) {
			dispatch(
				uiActions.showNotification({
					status: 'error',
					name: 'Error!',
					message: 'Sending cart data failed!'
				})
			);
		}
	};
};
