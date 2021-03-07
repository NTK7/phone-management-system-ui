import { createSlice } from '@reduxjs/toolkit';

export const orderSlice = createSlice({
	name: 'orderData',
	initialState: {
		orderData: [],
		billingData: [],
	},
	reducers: {
		addOrderData: (state, action) => {
			state.orderData = action.payload;
		},
        addBillingData: (state, action) => {
            state.billingData = action.payload;
		},
	},
});

export const { addOrderData, addBillingData } = orderSlice.actions;

export const selectOrderData = (state) => state.order.orderData;
export const selectBillingData = (state) => state.order.billingData;

export default orderSlice.reducer; 
