import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="main_container">
      <ul>
        <li>
          <Link to={`/show-category`}>Show Category</Link>
        </li>
        <li>
          <Link to={`/show-sub-category`}>Show Sub Category</Link>
        </li>
      </ul>

      <div>
        <ul>
          <li>
            <Link to={`/add-category`}>Add Category</Link>
          </li>
          <li>
            <Link to={`/add-sub-category`}>Add Sub Category</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
