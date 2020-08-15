import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Box = () => {
  const [boxes, setBoxes] = useState([]);

  const [value, setValue] = useState("");

  const [selected, setSelected] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const uid = uuidv4();
    const Boxx = { id: uid, title: value };
    setBoxes((prev) => [...prev, Boxx]);
    setValue("");
  };

  const removeBox = (index) => {
    const newBoxes = [...boxes];
    newBoxes.splice(index, 1);
    setBoxes(newBoxes);
  };

  return (
    <div>
      {boxes.length === 0 && <p>Add Boxes</p>}
      {boxes.map((id, index) => (
        <div
          className="box"
          key={index}
          onClick={() => {
            setSelected(id.id);
            console.info(selected);
          }}
          style={{
            backgroundColor: id.id === selected ? "#144bae" : "",
            color: id.id === selected ? "#ccc" : "",
          }}
        >
          {/* <p>{id.id}</p> */}
          <p>{id.title}</p>
          <button onClick={() => removeBox(index)}>x</button>
        </div>
      ))}

      {/* {JSON.stringify(boxes)} */}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Box;
