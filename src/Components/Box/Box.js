import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Box = () => {
  const [boxes, setBoxes] = useState([
    { id: 1, title: "One", x: 0, y: 0 },
    { id: 2, title: "Two", x: 0, y: 0 },
  ]);

  const [value, setValue] = useState("");

  const [selected, setSelected] = useState();

  const [open, setOpen] = useState(true);

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
      if (open === true) {
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
      }
    };
    window.addEventListener("keydown", handleDel);

    return () => {
      window.removeEventListener("keydown", handleDel);
    };
  }, [boxes, open, selected]);

  return (
    <>
      {/* {x} */}
      <button
        aria-expanded={open === true ? "true" : "false"}
        className="toggleButton"
        onClick={() => setOpen(!open)}
        style={{
          backgroundColor: open === false ? "#838383" : "",
          color: open === false ? "#ffffff" : "#000",
        }}
      >
        Toggle Buttons
      </button>
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
              color: id.id === selected ? "#fff" : "",
              transform: `translate(${id.x}px, ${id.y}px)`,
            }}
          >
            {/* <p>{id.id}</p> */}
            <p>{id.title}</p>
            <p>
              {id.x},{id.y}
            </p>
            <button onClick={() => removeBox(index)}>x</button>
          </div>
        ))}
        {/* {JSON.stringify(boxes)} */}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="basic-slide"
          id="name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={"Add a box"}
        />
      </form>
    </>
  );
};

export default Box;
