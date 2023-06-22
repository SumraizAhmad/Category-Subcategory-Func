import { createSlice } from "@reduxjs/toolkit";
const initialState = { category: [] };

export const CategoryFormSlice = createSlice({
  name: "add-to-category",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.category.push(action.payload);
    },
    editCategory: (state, action) => {
      const { index, ...rest } = action.payload;
      const existingUser = state.category[index];
      if (existingUser)
        state.category[index] = { ...state.category[index], ...rest };
    },
    removeCategory: (state, action) => {
      state.category.splice(action.payload, 1);
    },
  },
});
export const { addCategory, editCategory, removeCategory } =
  CategoryFormSlice.actions;
export default CategoryFormSlice.reducer;
