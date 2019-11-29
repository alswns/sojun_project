/*global kakao*/
import React from 'react';

class SubwayMap extends React.Component {
  constructor(props) {
    super(props)

  }


  componentDidUpdate() {
    if (this.props.datas) { 
        this.props.datas.forEach(element => {
        this.props.on(element.tmY[0],element.tmX[0])

      });
    }
  }



  render() {
    return (
      <div id='map' style={{ width: 100 + '%', position:'fixed',top:0,bottom:0,zIndex:-10 }} onClick={this.initMap}>
      </div>
    )
  }

}
export default SubwayMap;
