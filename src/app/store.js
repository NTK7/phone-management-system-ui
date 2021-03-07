import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import viewInventoryDataReducer from '../features/viewInventorySlice';
import orderReducer from '../features/OrderDataSlice';
import { loadFromLocalStorage, saveToLocalStorage } from './reduxPersist';

const persistedState = loadFromLocalStorage();

export const store = configureStore({
	reducer: {
		user: userReducer,
		viewInventoryData: viewInventoryDataReducer,
		order: orderReducer,
	},
	preloadedState: persistedState,
});

store.subscribe(() => saveToLocalStorage(store.getState()));
