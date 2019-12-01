/*global kakao */
import React from 'react'
import SubwayMap from '../components/SubwayMap'
import { busid } from '../busid';
import axios from 'axios';
import * as xml from 'xml2js'
import Banner from '../components/Banner';
import SVG from './menu-24px.svg'
import './Main.css'
class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = ({
            id: undefined,
            datas: undefined,
            map: undefined,
            clusterer: undefined,
            value:7019,
            clicked:1
            
        })

    }


    componentDidMount() {
        

        var container = document.getElementById('map')
        var options = {
            center: new kakao.maps.LatLng(37.542351, 126.9645004),
            level: 7
        }
        var map = new kakao.maps.Map(container, options)

        var clusterer = new kakao.maps.MarkerClusterer({
            map: map,
            averageCenter: true,
            minLevel: 4,
           
        })

        this.setState({
            id: busid[this.state.value],
            map: map,
            clusterer: clusterer
        })
        const id = busid[this.state.value]

        this.getData(id)
         const play=setInterval(()=>this.getData(id),3000)
    }

    getData=(id)=>{
        var parser = new xml.Parser()
        axios.get('http://ws.bus.go.kr/api/rest/buspos/getLowBusPosByRtid?ServiceKey=0roO4f41n5M14%2BGxpA%2B2d2RG4eH4kpApBrwyKd6mkxon9CRFimdFL%2F7rjCUMZ3t8KvaTUZVQ3qg9ZEdh7DfdUw%3D%3D&busRouteId=' + id)
            .then(value => {
                

                return new Promise((res, rej) => {
                    parser.parseString(value.data, function (err, result) {
                        if (err) rej(err);
                        res(result);
                    })
                })
            })
            .then(data => {
                const XY = Object.values(data.ServiceResult.msgBody[0].itemList)
                this.setState({
                    datas: XY
                })
                console.log(XY)

            })
            .catch(value => {
                console.log(value)
                console.log(value.response)
                console.log('실패')
            })
        }
    
    sujung = markers => {
        this.state.clusterer.clear()
        const marker=markers.map(value=>{
            return new kakao.maps.Marker({
                position: new kakao.maps.LatLng(value[0], value[1])
            })
             
        })
        this.state.clusterer.addMarkers(marker)
        

        
    }
    onChange = e => {
        this.setState({ value: e.target.value });
      };
    clicked=()=>{
        this.setState({
            clicked:!this.state.clicked
        })
    }
    thisProm=()=>{
        var data=prompt()
        this.setState({
            value:data
        })
    }
    render() {


        return (
            <div>
                <img src={SVG} id='check' onClick={this.clicked}/>
                {this.state.clicked?<></>:<Banner click={this.thisProm}/>}
                {/* <input type="text" value={this.state.value} onChange={this.onChange}/> */}
                
                <SubwayMap id='map' datas={this.state.datas} map={this.state.map} on={this.sujung} />
            </div>
        )
    }
}
export default Main