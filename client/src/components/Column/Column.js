import styles from "./Column.module.scss";

import { useState, useEffect } from "react";

import Card from "../Card/Card.js";
import CardForm from "../CardForm/CardForm.js";
import LoudSocket from "../../websocket.js";

import { nanoid } from "nanoid";

const Column = ({ title, icon, id }) => {
  const [socket, setSocket] = useState();
  const columnId = 1;
  const [cards, setCards] = useState([]);

  const forceUpdate = () => {
    setForceUpdateCounter((prevCounter) => prevCounter + 1);
  };

  useEffect(() => {
    const socket = new LoudSocket("ws://localhost:8000", {
      transports: ["websocket"],
      autoConnect: false,
    });
    setSocket(socket);

    socket.connect();
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("disconnect", () => {
      console.log("disconnected");
    });

    socket.on("updateCards", (data) => {
      console.log("updateCards", data);
      setCards([...data]);
    });

    return () => {
      socket.disconnect();
      socket.off("connect");
      socket.off("disconnect");
      socket.off("updateCards");
    };
  }, []);

  const addCard = (columnId, title) => {
    console.log("add card", columnId, title);
    socket.emit("addCard", {
      id: nanoid(),
      columnId: columnId,
      title: title,
      isFavorite: false,
      checksum: nanoid(), // this is a hack to force update
    });
  };

  const removeCard = (cardId) => {
    console.log("removeCard", cardId);
    socket.emit("removeCard", cardId);
  };

  const editCard = (id, columnId, title, isFavorite) => {
    console.log("editCard", id, columnId, title, isFavorite);
    socket.emit("updateCard", {
      id,
      columnId,
      title,
      isFavorite,
      checksum: nanoid(), // this is a hack to force update
    });
  };

  const element = (
    <article className={styles.column}>
      <h1 className={styles.title}>
        <span className={styles.icon + " fa fa-" + icon}></span>
        {title}
      </h1>
      <ul className={styles.cards}>
        {cards.map((card) => (
          <Card
            key={card.checksum}
            id={card.id}
            title={card.title}
            columnId={card.columnId}
            isFavorite={card.isFavorite}
            removeCard={(id) => removeCard(id)}
            editCard={(id, columnId, title, isFavorite) => {
              editCard(id, columnId, title, isFavorite);
            }}
          />
        ))}
      </ul>
      <CardForm
        columnId={columnId}
        onSubmit={(columnId, title) => addCard(columnId, title)}
      />
    </article>
  );
  return element;
};

export default Column;
