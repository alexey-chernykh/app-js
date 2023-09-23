import ListGroup from "./ListGroup";
import { useEffect, useState, useReducer } from "react";
import Navigation from "./Navigation";

interface ICity {
  city: string;
  country: string;
}
function Cities() {
  const [v, forceUpdate] = useReducer((x) => x + 1, 0);
  const [backendData, setBackendData] = useState<ICity[]>([
    { city: "", country: "" },
  ]);

  useEffect(() => {
    fetch("http://localhost:5000/api")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, [v]);

  return (
    <div>
      <Navigation />
      <ListGroup
        items={backendData}
        heading="Cities"
        forceUpdate={forceUpdate}
      />
    </div>
  );
}

export default Cities;
