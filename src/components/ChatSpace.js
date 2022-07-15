import React, { useRef } from 'react';
import styled from 'styled-components';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SendIcon from '@mui/icons-material/Send';
import { useSelector } from 'react-redux';
import {
  doc,
  getDoc,
  addDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../firebase';
import { useEffect } from 'react';
import { useState } from 'react';
import MessageItem from './MessageItem';

const ChatContainer = styled.div`
  flex: 0.8;
  padding: 10px;
  position: relative;
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;

  h3,
  h4 {
    display: flex;
    align-items: center;
  }

  h3,
  h4,
  .MuiSvgIcon-root {
    &:hover {
      cursor: pointer;
    }
  }

  h4 {
    color: #505050;
  }

  > h3 > .MuiSvgIcon-root {
    margin-left: 5px;
  }

  > h4 > .MuiSvgIcon-root {
    margin: 0 5px;
  }
`;

const ChatMessages = styled.div`
  margin-top: 20px;
  margin-left: 10px;
  overflow: scroll;
  height: 80%;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ChatFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 30px;
  width: 100%;

  form {
    width: 80%;
    border: 1px solid black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 15px;
  }

  input {
    border: none;
    flex: 1;
    outline: none;
  }

  button {
    background: none;
    border: none;
    color: rgb(43, 9, 42);

    &:hover {
      cursor: pointer;
    }
  }
`;

function ChatSpace() {
  const roomId = useSelector((state) => state.app.roomId);
  const user = useSelector((state) => state.user.userDetails);

  const [roomData, setRoomData] = useState(null);
  const [message, setMessage] = useState('');
  const [snapshot, setSnapshot] = useState([]);

  const scrollRef = useRef(null);

  const scrollToBottom = () => {
    scrollRef.current.scrollIntoView({
      behavior: 'smooth',
    });
  };
  if (scrollRef.current) scrollToBottom();

  useEffect(() => {
    const fetchMessages = async () => {
      const docRef = doc(db, 'rooms', roomId);
      const colRef = collection(docRef, 'room-messages');
      const q = query(colRef, orderBy('createdAt'));
      const unSub = await onSnapshot(q, (querySnapshot) => {
        setSnapshot(querySnapshot.docs);
      });

      return () => unSub();
    };

    if (roomId) fetchMessages();
  }, [roomId]);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      const docRef = doc(db, '/rooms', roomId);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setRoomData(docSnap.data());
        // console.log('Document data:', docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    };
    if (roomId) fetchRoomDetails();
  }, [roomId]);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (roomId && message) {
      try {
        const docRef = doc(db, '/rooms', roomId);
        const colRef = collection(docRef, 'room-messages');
        //eslint-disable-next-line
        const messageData = await addDoc(colRef, {
          message: message,
          userName: user.userName,
          userImage: user.userImage,
          createdAt: serverTimestamp(),
        });
        setMessage('');
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    } else {
      console.log('Please select Room');
    }
  };

  return (
    <ChatContainer>
      <ChatHeader>
        <h3>
          {roomData ? roomData.name : ''}
          <StarBorderIcon />
        </h3>
        <h4>
          Details <InfoOutlinedIcon />
        </h4>
      </ChatHeader>
      <hr />
      <ChatMessages>
        {snapshot.map((message) => (
          <MessageItem
            key={message.id}
            messageInfo={message.data()}
            id={message.id}
          />
        ))}
        <div ref={scrollRef} />
      </ChatMessages>
      <ChatFooter>
        <form>
          <input
            type="text"
            name="message"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Send Message in ${roomData ? roomData.name : ''}`}
            autoComplete="off"
          />
          <button type="submit" onClick={sendMessage}>
            <SendIcon />
          </button>
        </form>
      </ChatFooter>
    </ChatContainer>
  );
}

export default ChatSpace;
