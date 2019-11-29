/*global kakao */
import React from 'react'
import SubwayMap from '../components/SubwayMap'
import { busid } from '../busid';
import axios from 'axios';
import * as xml from 'xml2js'

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = ({
            id: undefined,
            datas: undefined,
            map: undefined,
            clusterer: undefined,
            value:7019
            
        })

    }


    componentDidMount() {
        var parser = new xml.Parser()

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

        var marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(37.542351, 126.9645004)
        })

        //clusterer.addMarker(marker)

        this.setState({
            id: busid[7019],
            map: map,
            clusterer: clusterer
        })
        const id = busid[7019]



        axios.get('http://ws.bus.go.kr/api/rest/buspos/getLowBusPosByRtid?ServiceKey=0roO4f41n5M14%2BGxpA%2B2d2RG4eH4kpApBrwyKd6mkxon9CRFimdFL%2F7rjCUMZ3t8KvaTUZVQ3qg9ZEdh7DfdUw%3D%3D&busRouteId=' + id)
            .then(value => {
                console.log(value)
                console.log('성공')

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

            })
            .catch(value => {
                console.log(value)
                console.log(value.response)
                console.log('실패')
            })
    }

    sujung = (x, y) => {
        var marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(x, y)
        })

        this.state.clusterer.addMarker(marker)
    }
    onChange = e => {
        this.setState({ value: e.target.value });
      };
    render() {


        return (
            <div>
                <div >
                    banner
                </div>
                <input type="text" value={this.state.value} onChange={this.onChange}/>

                <SubwayMap id='map' datas={this.state.datas} map={this.state.map} on={this.sujung} />
            </div>
        )
    }
}
export default Main