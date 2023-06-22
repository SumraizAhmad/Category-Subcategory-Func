import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./DisplayCategory.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import { removeCategory } from "../../../store/CategoryFormSlice";
import EditCategory from "../../editData/EditCategory";
import { removeAllSubCategory } from "../../../store/SubCategoryFormSlice";

const DisplayCategory = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [dataIndex, setDataIndex] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.category.category);
  
  const filteredData = selector.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const onHandleRemove = (index) => {
    let findId = selector[index].id;

    dispatch(removeAllSubCategory(findId));
    dispatch(removeCategory(index));
  };

  return (
    <div>
      <h1>DisplayCategory</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search..."
      />
      {filteredData.length >= 1 ? (
        <table>
          <tr>
            <th>Category Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          {filteredData.map((item, index) => {
            return (
              <tr key={index}>
                <td>
                  <p>{item.name}</p>
                </td>
                <td>
                  <p>{item.description}</p>
                </td>
                <td>
                  <img src={item?.image?.value} />
                </td>
                <td>
                  <span>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setModalShow(true);
                        setDataIndex(index);
                      }}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} className="icon" />
                    </Button>
                    {modalShow ? (
                      <EditCategory
                        show={modalShow}
                        index={dataIndex}
                        onHide={() => setModalShow(false)}
                      />
                    ) : (
                      ""
                    )}
                  </span>
                </td>
                <td>
                  <span>
                    <Button onClick={() => onHandleRemove(index)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </span>
                </td>
              </tr>
            );
          })}
        </table>
      ) : (
        "No item is selected"
      )}
    </div>
  );
};

export default DisplayCategory;



