import React from 'react';
import './Home.css';
import Left from './Left';
import Main from './Main';
import Right from './Right';
import styled from '@emotion/styled';

function Home() {
  return (
    <div className='home'>
      <div className="home__section">
        <h5>
          <a>Hiring in a hurry?</a>
        </h5>
        <p>Find talented pros in record time with Upwork and keep business moving</p>
      </div>
      <Layout>
        <Left/>
        <Main/>
        <Right/>
      </Layout>
    </div>
  )
}

export default Home


const Layout=styled.div`
  display:grid;
  grid-template-areas:'leftside main rightside';
  grid-template-columns: minmax(0,5fr) minmax(0,12fr) minmax(300px,7fr);  column-gap:25px;
  grid-template-row:auto;
  @media(max-width:768px){
    margin:25px 0;
    display:flex;
    flex-direction:column;
    padding:5 5px;
  }
`;