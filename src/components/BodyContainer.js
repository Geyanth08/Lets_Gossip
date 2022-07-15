import React from 'react';
import styled from 'styled-components';
import ChatSpace from './ChatSpace';
import SideBar from './SideBar';
import { useSelector } from 'react-redux';
import ChatEmpty from './ChatEmpty';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 82vh;
`;

function BodyContainer() {
  const roomId = useSelector((state) => state.app.roomId);

  return (
    <Container>
      <SideBar />
      {roomId ? <ChatSpace /> : <ChatEmpty />}
    </Container>
  );
}

export default BodyContainer;
