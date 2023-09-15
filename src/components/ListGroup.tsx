import { useState, useReducer } from "react";
import Button from "./Button";
import Modal from "./Modal";
import Alert from "./Alert";

interface ICity {
  city: string;
  country: string;
}

interface IProps {
  items: ICity[];
  heading: string;
  forceUpdate: React.DispatchWithoutAction;
}

function ListGroup({ items, heading, forceUpdate }: IProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);

  const addClick = () => {
    setOpenAddModal(true);
  };

  const editClick = () => {
    setOpenEditModal(true);
  };

  const deleteClick = () => {
    setOpenRemoveModal(true);
  };

  const checkItemsLength = () => {
    return items.length === 0 && <Alert>There is no items in list.</Alert>;
  };

  return (
    <>
      <div className="always-on-top">
        <h1>{heading}</h1>
        <div className="buttons-block">
          <Button
            buttonText="Add new"
            buttonType="primary"
            buttonSize="full"
            buttonMargin={false}
            clickHandle={addClick}
          ></Button>
        </div>
      </div>
      {checkItemsLength()}
      <ul className="list-group">
        {items.map((item, index) => (
          <div className="item-container" key={index}>
            <li
              className={
                selectedIndex === index
                  ? "list-group-item active"
                  : "list-group-item"
              }
              onClick={() => setSelectedIndex(index)}
            >
              <div className="text-li">
                {item["city"]}, {item["country"]}
              </div>
              <div className="btns-li">
                <Button
                  buttonText="Edit"
                  buttonType="warning"
                  buttonSize="small"
                  buttonMargin={true}
                  clickHandle={editClick}
                ></Button>
                <Button
                  buttonText="Remove"
                  buttonType="danger"
                  buttonSize="small"
                  buttonMargin={true}
                  clickHandle={deleteClick}
                ></Button>
              </div>
            </li>
          </div>
        ))}
      </ul>
      {openAddModal && (
        <Modal
          modalTitle="Add new city"
          modalBody="add"
          item={{ city: "", country: "" }}
          index={selectedIndex}
          items={items}
          closeHandle={setOpenAddModal}
          forceUpdate={forceUpdate}
        />
      )}
      {openEditModal && (
        <Modal
          modalTitle="Edit city"
          modalBody="edit"
          item={items[selectedIndex]}
          index={selectedIndex}
          items={items}
          closeHandle={setOpenEditModal}
          forceUpdate={forceUpdate}
        />
      )}
      {openRemoveModal && (
        <Modal
          modalTitle="Remove city"
          modalBody="remove"
          item={items[selectedIndex]}
          index={selectedIndex}
          items={items}
          closeHandle={setOpenRemoveModal}
          forceUpdate={forceUpdate}
        />
      )}
    </>
  );
}

export default ListGroup;
