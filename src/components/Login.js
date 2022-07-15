import React from 'react';
import styled from 'styled-components';
import GoogleIcon from '@mui/icons-material/Google';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { updateUser } from '../features/userSlice';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const LoginInfo = styled.div`
  width: 400px;
  height: 400px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  box-shadow: 0px 0px 19px 3px rgba(255, 255, 255, 0.5);

  img {
    width: 350px;
    height: 100px;
    margin-bottom: 100px;
  }

  button {
    background-color: #db4437;
    border: none;
    padding: 5px 10px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;

    &:hover {
      cursor: pointer;
      box-shadow: 0px 0px 19px 3px rgba(219, 68, 55, 0.9);
      transform: scale(1.05);
    }
  }

  p {
    margin-left: 5px;
    font-weight: bold;
  }
`;

function Login() {
  const dispatch = useDispatch();
  const login = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        const details = {
          userName: user.displayName,
          userImage: user.photoURL,
        };
        dispatch(updateUser(details));
        // console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <LoginContainer>
      <LoginInfo>
        <img src="/logo.png" alt="logo" />
        <button onClick={login}>
          <GoogleIcon fontSize="small" /> <p>Sign In With Google</p>
        </button>
      </LoginInfo>
    </LoginContainer>
  );
}

export default Login;
