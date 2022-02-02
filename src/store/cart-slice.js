import { createSlice } from '@reduxjs/toolkit';

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
			const existingItem = state.item.find((item) => item.id === newItem.id);
			if (!existingItem) {
				state.items.push({
					itemId: newItem.id,
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
		removeItemToCart(state, action) {
			state.totalQuantity--;
			const id = action.payload;
			const existingItem = state.items.filter((item) => item.id === id);
			if (existingItem.quantity === 1) {
				state.items = state.items.filter((item) => item.id !== id);
			} else {
				existingItem.quantity--;
				existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
			}
		}
	}
});

export const cartActions = cartSlice.actions;

export default cartSlice;
