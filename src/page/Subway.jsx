/*global kakao */
import React from 'react'
import SubwayMap from '../components/SubwayMap'
import { busid } from '../busid';
import axios from 'axios';
import * as xml from 'xml2js'
import {line1} from '../subway/line1'
import Banner from '../components/Banner';
import SVG from './menu-24px.svg'
import './Main.css'
import SUBWAY from './subway-24px.svg'

class Subway extends React.Component {
    constructor(props) {
        super(props)
        this.state = ({
            id: undefined,
            datas: undefined,
            map: undefined,
            clusterer: undefined,
            value:7019,
            clicked:1,
            subway:[],
            onclick:0,
            markers:0
            
        })

    }

    
    
    get_subway=()=>{
        var places = new kakao.maps.services.Places();
        const datas=[]
        return new Promise((resolve, reject)=>{
            line1.map(value=>{
        
        
        
                places.keywordSearch(value.역명, (result,status)=>{
                    if (status === kakao.maps.services.Status.OK) {
                        datas.push([result[0].y,result[0].x])
                    }
                });
            }
            )
            resolve(datas)
        })
    }

    componentDidMount() {
        
        this.get_subway().then(value=>{
            console.log(value)
            this.setState({
                subway:value,
                
            })
            // rerender()
        }
        ).catch(value=>{
            console.log(value)
        })
        


        
        
        var container = document.getElementById('map')
        var options = {
            center: new kakao.maps.LatLng(37.542351, 126.9645004),
            level: 3
        }
        var map = new kakao.maps.Map(container, options)

        var clusterer = new kakao.maps.MarkerClusterer({
            map: map,
            averageCenter: true,
            minLevel: 4,
            
        })

        this.setState({
        
            map: map,
            clusterer: clusterer
        })
        

        
    }

   
    
    sujung = (subway) => {
        
        this.state.clusterer.clear()
        
        var imageSrc = SUBWAY, // 마커이미지의 주소입니다    
        imageSize = new kakao.maps.Size(30, 30) // 마커이미지의 크기입니다
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize)
        console.log(this.state.subway)
        const marker=this.state.subway.map(value=>{
            
            
            return new kakao.maps.Marker({
                map:this.state.map,
                position: new kakao.maps.LatLng(value[0], value[1]),
                image:markerImage
            })
        })
        
    

        // const marker=subway.map(value=>{
        //     console.log(value)
        //     return new kakao.maps.Marker({
                
        //         position: new kakao.maps.LatLng(value[0], value[1]),
        //         image:markerImage
        //     })
             
        // })
        
        // this.state.clusterer.addMarkers(marker)
        

        
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
                
                <SubwayMap id='map' ohno={this.state.subway} datas={this.state.datas} map={this.state.map} on={this.sujung} />
            </div>
        )
    }
}
export default Subway