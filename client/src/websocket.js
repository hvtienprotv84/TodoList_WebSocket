import { io } from "socket.io-client";
import { nanoid } from "nanoid";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production" ? undefined : "ws://localhost:8000";

class LoudSocket extends io {
  static registry = new FinalizationRegistry((id) => {
    console.log(`LoudSocket with id=${id} has been garbage collected`);
  });

  constructor(...args) {
    super(...args);
    const id = nanoid();
    this.id = id;
    console.log(`LoudSocket with id=${this.id} created`);
    LoudSocket.registry.register(this, id);
  }
}

// const socket = new LoudSocket("ws://localhost:8000", {
//   transports: ["websocket"],
//   autoConnect: false,
// });

export default LoudSocket;
