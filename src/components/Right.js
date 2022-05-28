import React from 'react';
import styled from '@emotion/styled';
import { Button } from '@mui/material';

function Right() {
  return (
    <Container>
      <FollowCard>
        <Title>
          <h1>Add to your Feed</h1>
          <img src="/images/feed-icon.svg" alt="" />
        </Title>
        <FeedList>
          <li>
            <a>
              <Avatar/>
            </a>
            <div>
              <span>#LinkedIn</span>
              <Button>Follow</Button>
            </div>
          </li>
          <li>
            <a><Avatar/></a>
              <div>
                <span>#Video</span>
                <Button>Follow</Button>
              </div>
          </li>
        </FeedList>
        <Recommendation>View All Recommendation
          <img src="/images/right-icon.svg" alt="" />          
        </Recommendation>
        </FollowCard>
    </Container>
  )
}

export default Right

const Container=styled.div`
  grid-area:rightside;
`;

const FollowCard=styled.div`
  text-align:center;
  overflow:hidden;
  border-radius:5px;
  margin-bottom:8px;
  background-color:#fff;
  box-shadow:0 0 0 1px rgb(0 0 0/15%), 0 0 0 rgb(0 0 0/ 20%);
  padding:12px
`;

const Title=styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  font-size:16px;
  width:100%;
  color:rgba(0, 0 ,0 ,0.6);
`;

const FeedList=styled.ul`
  margin-top:16px;
  li{
    display:flex;
    align-items:center;
    margin:12px 0;
    position:relative;
    font-size:14px;

    &>div{
      display:flex;
      flex-direction:column;
    }

    button{
      background-color:transparent;
      color:rgba(0,0,0,0.6);
      padding:8px;
      border-radius:15px;
      align-items:center;
      box-shadow: inset 0 0 0 1px rgba(0,0,0,0.6);
      box-sizing:border-box;
      font-weight:600;
      justify-content:center;
      max-height:50px;
      max-width:480px:
      text-align:center;
      outline:none;
    }
  }
`;

const Avatar=styled.div`
  background-image:url('/images/hash.svg');
  background-size:contain;
  background-position:center;
  background-repeat:no-repeat;
  width:48px;
  height:48px;
  margin-right:8px;
`;

const Recommendation=styled.div`
  color:#0a66c2;
  display:flex;
  align-items:center;
  font-size:14px;
`;
