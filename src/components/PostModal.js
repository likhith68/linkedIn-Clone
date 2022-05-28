import React, { useEffect,useState } from 'react';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { Avatar } from '@mui/material';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ReactPlayer from 'react-player';
import { useStateValue } from '../StateProvider';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import db from '../firebase';


function PostModal(props){
    const[input,setInput]=useState('');
    const[shareImage,setShareImage]=useState("");
    const[videoLink,setVideoLink]=useState('');
    const[assetArea,setAssetArea]=useState('');
    const[{user},dispatch]=useStateValue();

    const handleChange=(e)=>{
        const image=e.target.files[0];

        if(image==="" || image===undefined){
            alert(`Not and Image, the file is a  ${typeof image}`);
            return;
        }
        setShareImage(image);
    };

    const switchAssetArea=(area)=>{
        setShareImage('');
        setVideoLink('');
        setAssetArea(area);
    }
   
    const reset =(e)=>{
        setInput("");
        setShareImage('');
        setVideoLink('');
        setAssetArea('');
        props.handleClick(e);

    }

    const sendPost =e=>{
        e.preventDefault();
        
        if(shareImage){
            db.collection('posts').add({
                Description:input,
                Info:user.email, 
                Name:user.displayName,
                Comments:12,
                likes:49,
                image:URL.createObjectURL(shareImage),
                media:'',
                timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                userAvatar:user.photoURL,
              })
        }
        else if(videoLink){
            db.collection('posts').add({
                Description:input,
                Info:user.email, 
                Name:user.displayName,
                Comments:12,
                likes:49,
                image:'',
                media:videoLink,
                timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                userAvatar:user.photoURL,
              })
        }

        else if(input){
            db.collection('posts').add({
                Description:input,
                Info:user.email, 
                Name:user.displayName,
                Comments:12,
                likes:49,
                image:'',
                media:'',
                timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                userAvatar:user.photoURL,
              })
        }
        
        reset(e);
      }

     const resetShowModal=(event)=>{
          reset(event);
      }

  return (
      <>
      {props.showModal==="open" && 
          <Container>
              <form action="">
              <Content>
              <Header>
                  <h2>Create a Post</h2>
                  <Button onClick={resetShowModal}>X</Button>
              </Header>
              <SharedContent>
                  <UserInfo>
                      <Avatar src={user.photoURL}/>
                      <span>{user.displayName}</span>
                  </UserInfo>
                  <Editor>
                      <textarea value={input} onChange={(e)=>setInput(e.target.value)} placeholder="What do you want to talk about?" autoFocus={true} />

                      {assetArea==="image"?(
                      <UploadImage>
                        <input type="file" accept="image/gif, image/jpeg , image/png" name="image" id="file" onChange={handleChange}/>
                        {shareImage && <img src={URL.createObjectURL(shareImage)}/>}
                        </UploadImage>
                      ):(
                        assetArea==="media" &&(
                        <>
                            <input type="text" placeholder='Enter a video link' value={videoLink} onChange={(e)=>setVideoLink(e.target.value)}/>
                            {videoLink && <ReactPlayer width="100%" url={videoLink}/>}
                        </>)
                        )}
                  </Editor>
              </SharedContent>
              <SharedCreation>
                  <AttachAssets>
                      <Button onClick={()=>switchAssetArea('image')}>
                          <AddPhotoAlternateIcon/>
                      </Button>
                      <Button onClick={()=>switchAssetArea('media')}>
                          <VideoLibraryIcon/>
                      </Button>
                  </AttachAssets>
                  <ShareComment>
                      <Button>
                          <CommentOutlinedIcon/>Anyone
                      </Button>
                  </ShareComment>
                  <PostButton disabled={!input?true:false}><Button onClick={sendPost}>Post</Button></PostButton>
              </SharedCreation>
          </Content>
        </form>
    </Container>
      }
      </>
  )
}

export default PostModal;

const Container=styled.div`
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    z-index:9999;
    color:black;
    background-color:rgba(0,0,0,0.8);
    animation:fadeIn 0.3s;
`;

const Content=styled.div`
    width:100%;
    max-width:552px;
    background-color:white;
    max-height:90%;
    // overflow:initial;
    // position:relative:
    display:flex;
    flex-direction:column;
    border-radius:5px;
    margin:40px auto;
`;

const Header=styled.div`
    display:block;
    padding:16px 20px;
    border-bottom:1px solid rgba(0,0,0,0.15);
    font-size:15px;
    line-height:1.5;
    color:rgba(0,0,0,0.6);
    display:flex;
    justify-content:space-between;
    align-items:center;
    button{
        height:40px!important;
        width:40px!important;
        min-width:auto;
        color:rgba(0,0,0,0.5)!important;
        border:1px solid rgba(0,0,0,0.3)
    }

`;

const SharedContent=styled.div`
    display:flex;
    flex-direction:column;
    flex-grow:1;
    overflow-y:auto;
    background:transparent;
    vertical-align:baseline;
    padding:8px 12px;
`;

const UserInfo=styled.div`
    display:flex;
    align-items:center;
    padding:12px 24px;

    span{
        font-weight:600;
        font-size:16px;
        line-height:1.5;
        margin-left:5px;
    }
`;

const SharedCreation=styled.div`
    display:flex;
    justify-content:space-between;
    padding:12px 24px 12px 24px;

`;

const AttachAssets=styled.div`
    display:flex;
    align-items:center;
    padding-right:8px;
    button{
        display:flex;
        align-items:center;
        height:40px;
        min-width:auto;
        color:rgba(0,0,0,0.5);
        text-transform:inherit!important;
        border:1px solid rgba(0,0,0,0.3)
    }
`;

const ShareComment=styled.div`
    padding-left:8px;
    margin-right:auto;
    border-left:1px solid rgba(0,0,0,0.15);
    button{
        display:flex;
        align-items:center;
        height:40px;
        min-width:auto;
        color:rgba(0,0,0,0.5);
        text-transform:inherit!important;
        border:1px solid rgba(0,0,0,0.3)
    }
`;

const PostButton=styled.div`
    button{
        min-width:68px;
        border-radius:20px;
        padding-left:16px;
        padding-right:16px;
        background:${(props)=> (props.disabled? 'rgba(0,0,0,0.8)!important':'#0a66c2')};
        color:white;
        text-transform:inherit!important;
        &:hover{
            background-color:${(props)=> (props.disabled? 'lightgray!important':'#004182!important')};
        }
    }
`;

const Editor=styled.div`
    padding:12px 24px;
    textarea{
        width:100%;
        min-height:100px;
        resize:none;
    }
    input{
        width:100%;
        height:35px;
        font-size:16px;
        margin-bottom:20px;
    }
`;

const UploadImage=styled.div`
    text-align:center;
    img{
        width:100%;
    }
`;
