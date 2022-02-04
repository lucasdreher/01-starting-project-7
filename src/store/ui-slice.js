import { createSlice } from '@reduxjs/toolkit';

const initialState = { cartIsVisible: false, notification: null };
const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		toggle(state) {
			state.cartIsVisible = !state.cartIsVisible;
		},
		showNotification(state, action) {
			state.notification = {
				status: action.payload.status,
				name: action.payload.name,
				message: action.payload.message
			};
		}
	}
});

export const uiActions = uiSlice.actions;

export default uiSlice;
