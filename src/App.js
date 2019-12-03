/*global kakao*/
import React from 'react';
import Main from './page/Main';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import Subway from './page/Subway';
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
      <Router>
      <Route path='/' exact>
            <Subway></Subway>
          </Route>
          <Route path='/subway' exact>
            <Subway></Subway>
          </Route>
          <Route path='/bus' exact>
            <Main></Main>
          </Route>

      </Router>
        
        
      </>
    )
  }
}

export default App;
