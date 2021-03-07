import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import viewInventoryDataReducer from '../features/viewInventorySlice';
import { loadFromLocalStorage, saveToLocalStorage } from './reduxPersist';

const persistedState = loadFromLocalStorage();

export const store = configureStore({
	reducer: {
		user: userReducer,
		viewInventoryData: viewInventoryDataReducer,
	},
	preloadedState: persistedState,
});

store.subscribe(() => saveToLocalStorage(store.getState()));
