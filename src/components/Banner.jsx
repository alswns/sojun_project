import React from "react"
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const Wrapper=styled.div`
width:100%;
height:68px;
display:flex;
padding:20px 58px;
box-sizing:border-box;
position:fixed;
    top:0;
    left:0;
    right:0;
z-index:9000;
background-color:rgba(163,207,255,0.9);


`

const Logo=styled.img`
height:100%;
margin-right:30px;
`

const NavText=styled.ul`
align-items:center;
display:flex;
flex:1;
`
const NavTextItem=styled.li`
        list-style:none;
&>a{
color:gray;
margin-right:10px;
font-weight: bolder;
&:hover{
        color: black
}; 
}
`
const NavIcon=styled.ul`
        display: flex;
        
`
const NavIconItem=styled.li`
        height: 100%;
        width: fit-content;
        list-style:none;
        margin-right:3px;
`
const Img=styled.img`
        list-style:none;
        height: 100%;
`
// const setFont=(event)=>{
//         let asd =document.getElementsByClassName('asd')
//         for(let a=0;a<asd.length;a++){
//                 asd[a].style.fontWeight='normal'
//                 asd[a].style.color='#e5e5e5'
//         }
//         event.target.style.fontWeight='bold'
//         event.target.style.color='#fff'
                
// }
const setFont=()=>{
      
}
const Banner = props => {

        return (
        <>
                <Wrapper>
                        
                       
                        <NavText>
                        <NavTextItem className='asd'><a href="/bus"> 버스</a></NavTextItem>
                        <NavTextItem className='asd' ><a href="/subway">지하철</a></NavTextItem>
                        <NavTextItem className='asd' onClick={()=>props.click()}>설정</NavTextItem>
                        
                        </NavText>

                        <NavIcon>
                                <NavIconItem>
                                <Img src="/search.svg" alt=""/>
                                </NavIconItem>
                                <NavIconItem>
                                        
                                <Img src="/gift.svg" alt=""/>
                                </NavIconItem>
                                <NavIconItem>
                                        
                                <Img src="/bell.svg" alt=""/>
                                </NavIconItem>
                        </NavIcon>


                        
                </Wrapper>
        </>
        )
}
export default Banner