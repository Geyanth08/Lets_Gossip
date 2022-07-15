import { Avatar } from '@mui/material';
import React from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector, useDispatch } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { updateUser } from '../features/userSlice';

const HeaderContainer = styled.div`
  background-color: rgb(43, 9, 42);
  color: white;
  border-radius: 20px 20px 0px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8vh;
`;

const HeaderLeft = styled.div`
  display: flex;
  flex: 25%;
  padding: 10px;
  justify-content: space-between;
  align-items: center;

  .MuiAvatar-root:hover {
    cursor: pointer;
  }

  .MuiSvgIcon-root {
    cursor: pointer;
  }
`;

const HeaderMiddle = styled.div`
  flex: 75%;
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    background-color: rgba(120, 120, 120, 0.5);
    padding: 5px;
    border-radius: 5px;
    border: none;
    width: 50%;
    margin-left: 10px;
    outline: none;
    color: white;

    ::placeholder {
      color: rgba(255, 255, 255, 0.8);
    }
  }
`;

const HeaderRight = styled.div`
  flex: 25%;
  display: flex;
  padding: 10px;
  justify-content: flex-end;
  cursor: pointer;

  .MuiSvgIcon-root {
    margin-right: 5px;
  }
`;

function Header() {
  const user = useSelector((state) => state.user.userDetails);
  const dispatch = useDispatch();

  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(updateUser(''));
        console.log('logout');
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  return (
    <HeaderContainer>
      <HeaderLeft>
        <Avatar
          src={
            user.userImage || 'https://randomuser.me/api/portraits/men/11.jpg'
          }
        />
        <AccessTimeIcon />
      </HeaderLeft>
      <HeaderMiddle>
        <SearchIcon />
        <input
          type="text"
          name="text"
          id="text"
          placeholder="search people"
          autoComplete="off"
        />
      </HeaderMiddle>
      <HeaderRight onClick={logout}>
        <LogoutIcon /> <p>Logout</p>
      </HeaderRight>
    </HeaderContainer>
  );
}

export default Header;
