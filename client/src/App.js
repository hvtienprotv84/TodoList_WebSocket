import "./App.css";
import { useEffect, useState } from "react";
import Container from "./components/Container/Container";
import Column from "./components/Column/Column";
import ConnectionSwitch from "./components/ConnectionSwitch/ConnectionSwitch";

const App = () => {
  return (
    <div>
      <Container>
        <Column title="To Do List" icon="star" id="todolist"></Column>
      </Container>
    </div>
  );
};

export default App;
