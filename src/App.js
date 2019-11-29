/*global kakao*/
import React from 'react';
import { busid } from './busid';
import axios from 'axios';
import * as xml from 'xml2js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: undefined,
      datas: []
    }
    const kakao_url='//dapi.kakao.com/v2/maps/sdk.js?appkey=d57ec211fed9d00b69216b3170814af4'
    
    
    var container=document.getElementById('map')
    var options={
        center: new kakao.maps.LatLng(33,126),
        level:3
    }
      var map=new kakao.maps.Map(container,options)
    
  
}

  
  
  
  componentDidMount() {
    var parser=new xml.Parser()
    
  
    this.setState({
      id: busid[7019]
    })
    const id = busid[7019]

    

    axios.get('http://ws.bus.go.kr/api/rest/buspos/getLowBusPosByRtid?ServiceKey=0roO4f41n5M14%2BGxpA%2B2d2RG4eH4kpApBrwyKd6mkxon9CRFimdFL%2F7rjCUMZ3t8KvaTUZVQ3qg9ZEdh7DfdUw%3D%3D&busRouteId=' + id)
      .then(value => {
        console.log(value)
        console.log('성공')
        
        return new Promise((res, rej) => {
          parser.parseString(value.data,function(err,result){
            if(err) rej(err);
            res(result);
          })
        })
      })
      .then(data => {
        console.log(data.ServiceResult.msgBody[0].itemList);
        
        console.log(Object.values(data.ServiceResult.msgBody[0].itemList))
        
        this.setState({
          datas:Array(Object.values(data.ServiceResult.msgBody[0].itemList))
        })
      })
      .catch(value => {
        console.log(value)
        console.log(value.response)
        console.log('실패')
      })
      
      var options = { //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        level: 3 //지도의 레벨(확대, 축소 정도)
      };
      var container=document.getElementById('map')
      var map=new kakao.maps.Map(container,options)
      
      

  }


  render() {
    return (
      <>
        <div>{JSON.stringify(this.state.datas)}</div>
        <div id='map'></div>
        
        
      </>
    )
  }
}

export default App;
