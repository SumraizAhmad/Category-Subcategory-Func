import React from "react";
import { Route, Routes } from "react-router-dom";
import CategoryForm from "../components/form/categoryForm/CategoryForm";
import SubCategoryForm from "../components/form/subCategoryForm/SubCategoryForm";
import DisplayCategory from "../components/displayData/displayCategory/DisplayCategory";
import DisplaySubCategory from "../components/displayData/displaySubCategory/DisplaySubCategory";

const Routing = () => {
  return (
    <div>
      <Routes>
        <Route path="/add-category" element={<CategoryForm />}></Route>
        <Route path="/show-category" element={<DisplayCategory />}></Route>
        <Route path="/add-sub-category" element={<SubCategoryForm />}></Route>
        <Route path="/show-sub-category" element={<DisplaySubCategory />}></Route>
      </Routes>
    </div>
  );
};

export default Routing;
