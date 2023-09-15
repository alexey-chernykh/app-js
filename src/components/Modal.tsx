import { ChangeEvent, useState, useEffect } from "react";

interface ICity {
  city: string;
  country: string;
}

interface IProps {
  modalTitle: string;
  modalBody: "add" | "edit" | "remove";
  item: ICity;
  index: number;
  items: ICity[];
  closeHandle: (state: boolean) => void;
  forceUpdate: React.DispatchWithoutAction;
}

const postAddCity = async (
  o: ICity,
  items: ICity[],
  forceUpdate: () => void
) => {
  try {
    const response = await fetch("http://localhost:5000/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(o),
    });
    const json = await response.json();
    console.log("Успех:", JSON.stringify(json));
    items.push(o);
    forceUpdate();
  } catch (error) {
    console.error("Ошибка:", error);
  }
};

const postEditCity = async (
  i: number,
  o: ICity,
  items: ICity[],
  forceUpdate: () => void
) => {
  try {
    const response = await fetch("http://localhost:5000/api", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ object: o, index: i }),
    });
    const json = await response.json();
    console.log("Успех:", JSON.stringify(json));
    items[i] = o;
    forceUpdate();
  } catch (error) {
    console.error("Ошибка:", error);
  }
};

const postRemoveCity = async (
  i: number,
  items: ICity[],
  forceUpdate: () => void
) => {
  try {
    const response = await fetch("http://localhost:5000/api", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ index: i }),
    });
    const json = await response.json();
    console.log("Успех:", JSON.stringify(json));
    items.splice(i, 1);
    i = -1;
    forceUpdate();
  } catch (error) {
    console.error("Ошибка:", error);
  }
};

function Modal({
  modalTitle,
  modalBody,
  item,
  index,
  items,
  closeHandle,
  forceUpdate,
}: IProps) {
  const [editCity, setEditCity] = useState(item);
  const handleChangeCity = (event: ChangeEvent<HTMLInputElement>) => {
    setEditCity({ city: event.target.value, country: editCity.country });
  };
  const handleChangeCountry = (event: ChangeEvent<HTMLInputElement>) => {
    setEditCity({ city: editCity.city, country: event.target.value });
  };

  const buildModalBody = (bodyType: string, item: ICity) => {
    switch (bodyType) {
      case "add":
        return (
          <>
            <input
              className="m-2 form-control form-control-lg"
              type="text"
              placeholder="City"
              value={editCity.city}
              onChange={handleChangeCity}
              aria-label=".form-control-lg example"
            ></input>
            <input
              className="m-2 form-control form-control-lg"
              type="text"
              placeholder="Country"
              value={editCity.country}
              onChange={handleChangeCountry}
              aria-label=".form-control-lg example"
            ></input>
            <button
              type="button"
              className="m-2 w-100 btn btn-primary btn-lg"
              onClick={() => {
                postAddCity(editCity, items, forceUpdate);
                closeHandle(false);
              }}
            >
              Add
            </button>
          </>
        );
      case "edit":
        return (
          <>
            <input
              className="m-2 form-control form-control-lg"
              type="text"
              value={editCity.city}
              onChange={handleChangeCity}
              placeholder="City"
              aria-label=".form-control-lg example"
            ></input>
            <input
              className="m-2 form-control form-control-lg"
              type="text"
              value={editCity.country}
              onChange={handleChangeCountry}
              placeholder="Country"
              aria-label=".form-control-lg example"
            ></input>
            <button
              type="button"
              className="m-2 w-100 btn btn-warning btn-lg"
              onClick={() => {
                postEditCity(index, editCity, items, forceUpdate);
                closeHandle(false);
              }}
            >
              Edit
            </button>
          </>
        );
      case "remove":
        return (
          <>
            <p className="remove-text">
              Are you sure want to remove {item.city}, {item.country}? It will
              be removed permanently.
            </p>
            <div className="remove-buttons">
              <button
                type="button"
                className="m-2 w-50-m btn btn-success btn-lg"
                onClick={() => {
                  postRemoveCity(index, items, forceUpdate);
                  closeHandle(false);
                }}
              >
                Yes
              </button>
              <button
                onClick={() => {
                  closeHandle(false);
                }}
                type="button"
                className="m-2 w-50-m btn btn-danger btn-lg"
              >
                No
              </button>
            </div>
          </>
        );
    }
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <button
          type="button"
          className="btn-close modal-close-button"
          aria-label="close"
          onClick={() => {
            closeHandle(false);
          }}
        ></button>
        <div className="modal-title">
          <h1>{modalTitle}</h1>
        </div>
        <div className="modal-body">{buildModalBody(modalBody, item)}</div>
      </div>
    </div>
  );
}

export default Modal;
