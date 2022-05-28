import React, { useEffect,useState } from 'react';
import styled from '@emotion/styled';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import EventIcon from '@mui/icons-material/Event';
import ArticleIcon from '@mui/icons-material/Article';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import ShareIcon from '@mui/icons-material/Share';
import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';
import { useStateValue } from '../StateProvider';
import PostModal from './PostModal';
import db from '../firebase';
import ReactPlayer from 'react-player';
import FlipMove from 'react-flip-move';



function Main() {
  const[{user},dispatch]=useStateValue();
  const[showModal,setShowModal]=useState('close');

  const handleClick=(e)=>{
    e.preventDefault();
    if(e.target !==e.currentTarget){
      return;
    }
    switch(showModal){
      case 'open': setShowModal("close");break;
      case 'close':setShowModal('open');break;
      default:setShowModal('close');break;
    }
  }
    
  const[posts,setPosts]=useState([]);

  useEffect(()=>{
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot=>(
      setPosts(snapshot.docs.map(doc=>doc.data()))
    ))
    // db.collection('posts').orderBy('timestamp','des').onSnapshot((snapshot)=>
    //         setPosts(snapshot.docs.map((doc)=>doc.data())))
  },[]);

  return (
  <Container>
    <ShareBox>
    <div>
      <img src={user.photoURL} alt="" />
      <button onClick={handleClick}>Start a Post</button>
    </div>
    <div>
      <Button>
        <AddPhotoAlternateIcon color="primary"/>
        <span>Photo</span>
      </Button>
   
      <Button>
        <VideoLibraryIcon color="success"/>
        <span>Video</span>
      </Button>
    
      <Button>
        <EventIcon color="secondary"/>
        <span>Event</span>
      </Button>
    
      <Button>
        <ArticleIcon color="warning"/>
        <span>Article</span>
      </Button>
    </div>
    </ShareBox>
    <div>

    <FlipMove>
    {posts.map(post=>(
      <Article>
      <SharedActor>
        <a><img src={post.userAvatar} alt="" />
          <div>
            <span>{post.Name}</span>
            <span>{post.Info}</span>
            <span>{post.timestamp?.toDate().toUTCString()}</span>
          </div>
        </a>
        <button><MoreHorizIcon/></button>
      </SharedActor>
      <Description>{post.Description}</Description>
      <SharedImg>
        {post.image && <img width="100%" src={post.image} alt="" />}
        {post.media && <ReactPlayer width="100%" url={post.media}/>}
      </SharedImg>
      <SocialCounts>
        <li>
          <Button>
          <ThumbUpIcon color="primary"/>
          <span>{post.likes}</span>
          </Button>
        </li>
        <li>
          <a>{post.Comments} Comments</a>
        </li>
      </SocialCounts>
      <SocialActions>
        <Button>
          <ThumbUpIcon color="primary"/>
          <span>Like</span>
        </Button>
        <Button>
          <CommentRoundedIcon color="primary"/>
          <span>Comment</span>
        </Button>
        <Button>
          <ShareIcon color="primary"/>
          <span>Share</span>
        </Button>
        <Button>
          <SendIcon color="primary"/>
          <span>Send</span>
        </Button>
      </SocialActions>
    </Article>
    ))}
    </FlipMove>
    
    </div>
    <PostModal showModal={showModal} handleClick={handleClick}/>
  </Container>
  )
}

export default Main 

const Container=styled.div`
  grid-area:main;
`;

const CommonCard=styled.div`
  text-align:center;
  overflow;hidden;
  margin-bottom:8px;
  background-color:#fff;
  border-radius:5px;
  position:relative;
  box-shadow:0 0 0 1px rgb(0 0 0 / 15%),0 0 0 rgb(0 0 0 /20%);

`;

const ShareBox=styled(CommonCard)`
  display:flex;
  flex-direction:column;
  color:#958b7b;
  margin 0 0 8px;
  background:white;
  div{
    button{
      outline:none;
      color:rgba(0,0,0,0.6);
      font-size:14px;
      line-height:1.5;
      min-width:48px;
      background:transparent;
      border:none;
      display:flex;
      align-items:center;
      font-weight:600;
      padding-top:10px;
      padding-bottom:10px;
    }
    &:first-child{
      padding:15px;
      display:flex;
      align-items:center;
      // padding:8px 16px 0px 16px;
      img{
        width:48px;
        border-radius:50%;
        margin-right:8px;
      }
      button{
        margin:4px 0;
        flex-grow:1;
        border-radius:35px;
        padding-left:16px;
        border:1px solid rgba(0,0,0,0.15);
        background-color:white;
        text-align:left;
        text-transform:inherit!important;
      }
    }
    &:nth-child(2){
      display:flex;
      flex-wrap:wrap;
      justify-content:space-around;
      padding:10px;
      button{
        text-transform:inherit!important;

        span{
          padding-left:6px;
          color:#70b5f9;
        }
      }
    }
    
  }
`;

const Article=styled(CommonCard)`
  padding:0;
  margin:0 0 8px;
  overflow:visible;
`;

const SharedActor=styled.div`
  padding-right:40px;
  display:flex;
  flex-wrap:nowarp;
  padding:12px 16px 0; 
  margin-bottom 8px:
  align-items:center;

  a{
    margin-right:12px;
    flex-grow:1;
    overflow:hidden;
    display:flex;
    text-decoration:none;

    img{
      width:48px;
      height:48px;
      border-radius:50%;
      object-fit:contain;
    }

    &>div{
      display:flex;
      flex-direction:column;
      flex-grow:1;
      flex-basis:0;
      margin-left:8px;
      overflow-hidden;

      span{
        text-align:left;
        &:first-child{
          font-size:14px;
          font-weight:700;
          color:rgba(0,0,0,1);
        }

        &:nth-child(n+1){
          font-size:12px;
          color:rgba(0,0,0,0.6);
        }
      }
    }
  }

  button{
    height:32px;
    position:absolute;
    right:12px;
    top:0;
    background-color:white;
    border:none;
    outline:none;

  }
`;

const Description=styled.div`
  padding:8px 16px;
  overflow:hidden;
  color:rgba(0,0,0,0.9);
  font-size:14px;
  text-align:left;
`;

const SharedImg=styled.div`
  width:100%;
  display:block;
  position:relative;
  background-color:#f9fafb
  img{
    object-fit:contain;
    width:100px;
    height:50px;
  }
`;

const SocialCounts=styled.ul`
  display:flex;
  align-items:center;
  overflow:auto;
  margin-left:13px;
  padding-top:0;
  padding-bottom:5px;
  border-bottom:1px solid #e9e5df;
  list-style:none;
  
  li{
    margin-right: 5px;
    font-size:12px;
  }

  button{
    display:flex;
    align-items:center;
    border:none;
    background-color:white;
    min-width:auto;
    border-radius:30px;
  }
  
`;

const SocialActions=styled.div`
  align-items:center;
  display:flex;
  justify-content:flex-start;
  margin:0;
  min-height:40px;
  padding-left:15px;
  padding-top:5px;
  padding-bottom:5px;
  button{
     display:flex;
     align-items:center;
     padding:8px;
     color:#0a66c2!important;
     text-transform:inherit!important;

     @media(min-width:768px){
       span{
         margin-left:8px;
       }
     }
  }
`;

