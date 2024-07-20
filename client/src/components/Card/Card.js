import styles from "./Card.module.scss";

import TextInput from "../TextInput/TextInput.js";

import { useState } from "react";

const Card = (props) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(props.title);

  // const toggleFavorite = () => {
  //   console.log("toggleFavorite", props.id);
  //   // dispatch(toggleFavoriteCard(props.id));
  // };

  let isFavoriteClass = styles.isFavorite;
  if (!props.isFavorite) {
    isFavoriteClass = "";
  }

  const editingElement = editing ? (
    <TextInput
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  ) : (
    <span>{title}</span>
  );

  const editingHandler = () => {
    if (editing) {
      props.editCard(props.id, props.columnId, title, props.isFavorite);
    }
    setEditing(!editing);
  };

  const element = (
    <li className={styles.card}>
      {editingElement}
      <div className={styles.controls}>
        <button
          onClick={() => editingHandler()}
          className={`fa ` + (editing ? `fa-check` : `fa-pencil`)}
        ></button>
        {/* <button
          onClick={toggleFavorite}
          className={` ${isFavoriteClass} fa fa-star-o`}
        ></button> */}
        <button
          onClick={() => props.removeCard(props.id)}
          className={` fa fa-trash`}
        ></button>
      </div>
    </li>
  );

  return element;
};
export default Card;
