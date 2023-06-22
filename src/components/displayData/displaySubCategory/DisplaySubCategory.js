import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./DisplaySubCategory.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import { removeSubCategory } from "../../../store/SubCategoryFormSlice";
import EditSubCategory from "../../editData/EditSubCategory";

const DisplaySubCategory = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [dataIndex, setDataIndex] = useState();
  const dispatch = useDispatch();

  const selector = useSelector((state) => state.subCategory.subCategory);
  const mainCat = useSelector((state) => state.category.category);

  const FoundMain = ({ id }) => {
    const category = mainCat.find((cat) => cat.id === id);
    return category?.name;
  };

  const onHandleRemove = (index) => {
    dispatch(removeSubCategory(index));
  };
  return (
    <div>
      <h1>DisplaySubCategory</h1>
      {selector.length >= 1 ? (
        <table>
          <tr>
            <th>Category Name</th>
            <th>Sub Category Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          {selector.map((item, index) => {
            return (
              <tr key={index}>
                <td>
                  <FoundMain id={item.category} />
                </td>
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
                      <EditSubCategory
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

export default DisplaySubCategory;
