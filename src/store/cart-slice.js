import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './ui-slice';

const initialState = {
	items: [],
	totalQuantity: 0,
	totalPrice: 0
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItemToCart(state, action) {
			state.totalQuantity++;
			const newItem = action.payload;
			const existingItem = state.items.find((item) => item.id === newItem.id);
			if (!existingItem) {
				state.items.push({
					id: newItem.id,
					name: newItem.name,
					price: newItem.price,
					quantity: 1,
					totalPrice: newItem.price
				});
			} else {
				existingItem.quantity++;
				existingItem.totalPrice = existingItem.totalPrice + newItem.price;
			}
		},
		removeItemFromCart(state, action) {
			state.totalQuantity--;
			const id = action.payload;
			const existingItem = state.items.find((item) => item.id === id);
			if (existingItem.quantity === 1) {
				state.items = state.items.filter((item) => item.id !== id);
			} else {
				existingItem.quantity--;
				existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
			}
		}
	}
});

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

export const cartActions = cartSlice.actions;

export default cartSlice;
