import { createSlice } from '@reduxjs/toolkit';

export const viewInventorySlice = createSlice({
	name: 'viewInventoryData',
	initialState: {
		viewInventoryData: [],
	},
	reducers: {
		inventoryData: (state, action) => {
			state.viewInventoryData = action.payload;
		},
        AddInventoryData: (state, action) => {
            state.viewInventoryData.push(action.payload);
		},
        UpdateInventoryData: (state, action) => {
			state.viewInventoryData = action.payload;
		},
	},
});

export const { inventoryData, AddInventoryData,UpdateInventoryData } = viewInventorySlice.actions;

export const selectViewInventData = (state) => state.viewInventoryData.viewInventoryData;

export default viewInventorySlice.reducer; 
