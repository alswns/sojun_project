/*global kakao*/
import React from 'react';
import Main from './page/Main';
import { createGlobalStyle } from 'styled-components'
const GlobalStyle = createGlobalStyle`
  *{
    margin:0;
    padding:0;
  }
  a{
    text-decoration:none;
    color:white;
  }

`
 
class App extends React.Component {
  constructor(props) {
    super(props)
   
}

  
  
  


  render() {
    return (
      <>
      <GlobalStyle/>
        <Main />
        
      </>
    )
  }
}

export default App;
