import React from 'react';
import styled from 'styled-components';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useDispatch } from 'react-redux';
import { updateRoom } from '../features/appSlice';

const SideBarItemContainer = styled.div`
  color: #eeeeff;
  display: flex;
  flex: 1;
  padding: 10px;

  > p {
    margin-left: 10px;
  }

  &:hover {
    cursor: pointer;
    color: white;
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

function SideBarItem({ Icon, title, addChannelOption, id }) {
  const dispatch = useDispatch();

  const addChannel = async () => {
    if (addChannelOption && !id) {
      let room = prompt('Enter name of NEW room 👇');
      if (room) {
        try {
          const docRef = await addDoc(collection(db, 'rooms'), {
            name: room,
            createdAt: serverTimestamp(),
          });
          console.log('Document written with ID: ', docRef.id);
        } catch (e) {
          console.error('Error adding document: ', e);
        }
      }
    } else if (id) {
      dispatch(updateRoom(id));
    }
  };

  return (
    <SideBarItemContainer onClick={addChannel}>
      {Icon ? <Icon /> : <h3>#</h3>}
      <p>{title}</p>
    </SideBarItemContainer>
  );
}

export default SideBarItem;
