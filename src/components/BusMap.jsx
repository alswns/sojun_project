/*global kakao*/
import React from 'react';

class BusMap extends React.Component {
  constructor(props) {
    super(props)

  }
  marking=()=>{
    console.log('실행')
    const markers= this.props.datas.map(element => {
       
       return [element.tmY[0],element.tmX[0]]
   });
   
   
   this.props.on(markers)
  }

  componentDidUpdate() {
    if (this.props.datas) { 
      this.marking()
    }
  }



  render() {
    return (
      <div id='map' style={{ width: 100 + '%', position:'fixed',top:0,bottom:0,zIndex:-10 }} onClick={this.initMap}>
      </div>
    )
  }

}
export default BusMap;
