import styled from 'styled-components';
import React from 'react';

const ChatEmptyContainer = styled.div`
  flex: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;

  h3 {
    color: #808080;
  }
`;

function ChatEmpty() {
  return (
    <ChatEmptyContainer>
      <h3>Enter into a channel, to start messaging your Gossip 🗣️</h3>
    </ChatEmptyContainer>
  );
}

export default ChatEmpty;
