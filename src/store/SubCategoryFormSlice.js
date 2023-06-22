import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  subCategory: [],
};

export const SubCategoryFormSlice = createSlice({
  name: "Sub-category",
  initialState,
  reducers: {
    addSubCategory: (state, action) => {
      state.subCategory.push(action.payload);
    },
    editSubCategory: (state, action) => {
      const { index, ...rest } = action.payload;
      const existingUser = state.subCategory[index];
      if (existingUser)
        state.subCategory[index] = { ...state.subCategory[index], ...rest };
    },
    removeSubCategory: (state, action) => {
      state.subCategory.splice(action.payload.index, 1);
    },
    removeAllSubCategory: (state, action) => {
      const categoryId = action.payload;

      //       state.map((e, index) => {
      //         if (e.category === categoryId){
      // return index
      //         }})

      // let filtered = []
      // for (let i = 0; i < state.length; i++) {
      //   const el = state[i];
      //   if(el.category != categoryId) filtered.push(el);

      // }

      // state.subCategory = filtered

      state.subCategory = state.subCategory.filter(
        (el) => el.category !== categoryId
      );

      // item.map((e) => {  state.filter((event, index) => {
      //     if (event.category === e) {
      //       state.splice(index, 1);
      //       return true;
      //     }
      //   });
      // });
    },
  },
});
export const {
  addSubCategory,
  editSubCategory,
  removeSubCategory,
  removeAllSubCategory,
} = SubCategoryFormSlice.actions;
export default SubCategoryFormSlice.reducer;
