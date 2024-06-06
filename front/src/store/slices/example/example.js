import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isActive: false,
};

export const isActiveSlice = createSlice({
	name: "modalAlert",
	// estado inicial definido en la parte superior line:3
	initialState,
	// todas las acciones que puden modificar el store
	reducers: {
		toggleActive: (state, { payload }) => {
			state.isActive = payload;
		},
	},
});

export const { toggleActive } = isActiveSlice.actions;
