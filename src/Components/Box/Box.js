import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Box = () => {
  const [boxes, setBoxes] = useState([
    { id: 1, title: "One", x: 0, y: 0 },
    { id: 2, title: "Two", x: 0, y: 0 },
  ]);

  const [value, setValue] = useState("");

  const [selected, setSelected] = useState();

  const [xCord, setX] = useState(5);
  const [yCord, setY] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const uid = uuidv4();
    const Boxx = { id: uid, title: value, x: 0, y: 0 };
    setBoxes((prev) => [...prev, Boxx]);
    setValue("");
  };

  const removeBox = (index) => {
    const newBoxes = [...boxes];
    newBoxes.splice(index, 1);
    setBoxes(newBoxes);
  };

  useEffect(() => {
    const handleDel = (event) => {
      if (event.keyCode === 46) {
        // const newBoxes = [...boxes];
        const newBox = boxes.filter((t) => t.id !== selected);
        setBoxes(newBox);
      }

      if (event.keyCode === 68) {
        // let objIndex = boxes.findIndex((obj) => obj.id === selected);
        // boxes[objIndex].x = xCord;
        // const newX = boxes[objIndex].x + 10;
        setBoxes((prev) =>
          prev.map((box) =>
            box.id === selected ? { ...box, x: box.x + 10 } : box
          )
        );
      }

      if (event.keyCode === 65) {
        setBoxes((prev) =>
          prev.map((box) =>
            box.id === selected ? { ...box, x: box.x - 10 } : box
          )
        );
      }

      if (event.keyCode === 83) {
        setBoxes((prev) =>
          prev.map((box) =>
            box.id === selected ? { ...box, y: box.y + 10 } : box
          )
        );
      }

      if (event.keyCode === 87) {
        setBoxes((prev) =>
          prev.map((box) =>
            box.id === selected ? { ...box, y: box.y - 10 } : box
          )
        );
      }
    };
    window.addEventListener("keydown", handleDel);

    return () => {
      window.removeEventListener("keydown", handleDel);
    };
  }, [boxes, selected, xCord]);

  return (
    <>
      {/* {x} */}
      <div className="boxesContainer">
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
              transform: `translate(${id.x}px, ${id.y}px)`,
              zIndex: id.id,
            }}
          >
            {/* <p>{id.id}</p> */}
            <p>{id.title}</p>
            {id.x},{id.y}
            <button onClick={() => removeBox(index)}>x</button>
          </div>
        ))}
        {/* {JSON.stringify(boxes)} */}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={"Add a box"}
        />
      </form>

      {/* <button onClick={handleW}>W</button> */}
    </>
  );
};

export default Box;
