import React, { useState, useEffect, useRef } from "react";
import Header from "../pages/Header";
import { db } from "../Services/firebase";
import { auth } from "../Services/firebase";
import { Button, Spinner } from "react-bootstrap";

function Chat() {
  const [user, setUser] = useState(auth().currentUser);
  const [content, setContent] = useState("");
  const [chat, setChat] = useState([]);
  const [readError, setreadError] = useState(null);
  const [writeError, setWriteError] = useState(null);
  const [loadingChats, setLoadingChats] = useState(false);
  const refInput = useRef();

  useEffect(() => {
    setreadError(null);
    setLoadingChats(true);
    const { current } = refInput;
    try {
      db.ref("chat").on("value", (snapshot) => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        chats.sort((a, b) => {
          return a.timestamp - b.timestamp;
        });
        setChat(chats);
        current.scrollBy(0, current.scrollHeight);
      });
      setLoadingChats(false);
    } catch (error) {
      setreadError(error.message);
      setLoadingChats(false);
    }
  }, []);

  async function onhandleSubmit(event) {
    event.preventDefault();

    setWriteError(null);
    const { current } = refInput;
    try {
      db.ref("chat").push({
        content: content,
        timestamp: Date.now(),
        uid: user.uid,
      });
      setContent("");
      current.scrollBy(0, current.scrollHeight);
    } catch (error) {
      setWriteError(error.message);
    }
  }

  function formatTime(timestamp) {
    const d = new Date(timestamp);
    const time = `${d.getDate()}/${
      d.getMonth() + 1
    }/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    return time;
  }

  return (
    <div>
      <Header />
      <div className="chat-area" ref={refInput}>
        {/* loading indicator */}
        {loadingChats ? (
          <Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </Button>
        ) : (
          ""
        )}
        {/* chat area */}
        {chat.map((chats) => {
          return (
            <p
              key={chats.timestamp}
              className={
                "chat-bubble " + (user.uid === chats.uid ? "current-user" : "")
              }
            >
              {chats.content}
              <br />
              <span className="chat-time float-right">
                {formatTime(chats.timestamp)}
              </span>
            </p>
          );
        })}
      </div>

      <form className="mx-3" onSubmit={onhandleSubmit}>
        <textarea
          className="form-control"
          style={{ width: "50%" }}
          name="content"
          onChange={(event) => {
            setContent(event.target.value);
          }}
          value={content}
        ></textarea>
        {writeError ? <p className="text-danger">{writeError}</p> : null}

        <button type="submit" className="btn btn-success px-5 mt-4">
          Send
        </button>
      </form>
      <div className="py-5 mx-3">
        Login in as: <strong className="text-info">{user.email}</strong>
      </div>
    </div>
  );
}

export default Chat;
