import React from 'react';
import styled from 'styled-components';

const MessageContainer = styled.div`
  display: flex;
  margin-bottom: 10px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    margin-right: 10px;
  }
`;

const MessageInfo = styled.div`
  span {
    margin-left: 10px;
    color: #343434;
    font-weight: normal;
    font-size: small;
  }
`;

function MessageItem({ id, messageInfo }) {
  return (
    <MessageContainer id={id}>
      <img src={messageInfo.userImage} alt="profile" />
      <MessageInfo>
        <h4>
          {messageInfo.userName}
          <span>
            {messageInfo.createdAt &&
              messageInfo.createdAt.toDate().toDateString() +
                ' ' +
                messageInfo.createdAt.toDate().toLocaleTimeString('en-US')}
          </span>
        </h4>
        <p>{messageInfo.message}</p>
      </MessageInfo>
    </MessageContainer>
  );
}

export default MessageItem;
