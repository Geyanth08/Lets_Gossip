import React from 'react';
import styled from 'styled-components';
import BodyContainer from './components/BodyContainer';
import Header from './components/Header';
import Login from './components/Login';
import { useSelector } from 'react-redux';

const AppContainer = styled.div`
  height: 100vh;
  position: relative;
  background-color: rgba(75, 21, 75, 0.9);
`;

const MainContainer = styled.div`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 95%;
  height: 90vh;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 0px 15px 10px rgba(43, 9, 42, 0.8);
`;

function App() {
  const user = useSelector((state) => state.user.userDetails);

  return (
    <AppContainer>
      {user ? (
        <MainContainer>
          <Header />
          <BodyContainer />
        </MainContainer>
      ) : (
        <Login />
      )}
    </AppContainer>
  );
}

export default App;
