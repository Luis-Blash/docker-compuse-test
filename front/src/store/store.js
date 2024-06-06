import { configureStore } from "@reduxjs/toolkit";
import { isActiveSlice } from "./slices/example/example";

export const store = configureStore({
	reducer: {
		exampleName: isActiveSlice.reducer,
	},
});
