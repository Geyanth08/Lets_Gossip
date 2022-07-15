import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CircleIcon from '@mui/icons-material/Circle';
import SideBarItem from './SideBarItem';
import ChatIcon from '@mui/icons-material/Chat';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import AppsIcon from '@mui/icons-material/Apps';
import PeopleIcon from '@mui/icons-material/People';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import AddIcon from '@mui/icons-material/Add';
import DraftsIcon from '@mui/icons-material/Drafts';
import InboxIcon from '@mui/icons-material/Inbox';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { db } from '../firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useSelector } from 'react-redux';

const SideBarContainer = styled.div`
  flex: 0.2;
  background-color: rgb(43, 9, 42);
  height: 82vh;
  overflow-y: scroll;
  border-radius: 0px 0px 0px 20px;

  hr {
    border: none;
    height: 1px;
    background-color: gray;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SideBarHeader = styled.div`
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  align-items: center;

  .header__left .MuiSvgIcon-root {
    color: green;
    font-size: 10px;
    margin-right: 5px;
  }

  .user {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;
const SideBarList = styled.div`
  margin-top: 5px;
`;
const SideBarChannels = styled.div``;

function SideBar() {
  const [snapshot, setSnapshot] = useState([]);
  const user = useSelector((state) => state.user.userDetails);

  useEffect(() => {
    const colRef = collection(db, 'rooms');
    const q = query(colRef, orderBy('createdAt', 'desc'));

    const unSub = onSnapshot(q, (querySnapshot) => {
      setSnapshot(querySnapshot.docs);
    });

    return () => unSub();
  }, []);

  return (
    <SideBarContainer>
      <SideBarHeader>
        <div className="header__left">
          <h3>LETS GOSSIP 🚀</h3>
          <div className="user">
            <CircleIcon fontSize="small" />
            <p>{user.userName}</p>
          </div>
        </div>
      </SideBarHeader>
      <hr />
      <SideBarList>
        <SideBarItem Icon={ChatIcon} title="Threads" />
        <SideBarItem Icon={InboxIcon} title="Mentions and Reactions" />
        <SideBarItem Icon={DraftsIcon} title="Saved Items" />
        <SideBarItem Icon={BookmarkBorderIcon} title="Channel Browser" />
        <SideBarItem Icon={PeopleIcon} title="People and User Groups" />
        <SideBarItem Icon={AppsIcon} title="Apps" />
        <SideBarItem Icon={FileCopyIcon} title="File Browser" />
      </SideBarList>
      <hr />
      <SideBarChannels>
        <SideBarItem Icon={KeyboardArrowDownIcon} title="Channels" />
        <hr />
        <SideBarItem Icon={AddIcon} addChannelOption title="Add Channel" />
        {snapshot.map((room) => (
          <SideBarItem title={room.data().name} key={room.id} id={room.id} />
        ))}
      </SideBarChannels>
    </SideBarContainer>
  );
}

export default SideBar;
