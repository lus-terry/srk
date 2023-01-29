import styled from "styled-components";

export const EventDiv = styled.div `
position: relative;
height:100%;
  `

export const EventCell = styled.td `



height: 100px; /* set height to 100% */
  width: 100/7%;
  
overflow: hidden;
text-align: center;
border: 2px solid lightgrey;
padding: 0;

  `

export const EventDayNumber = styled.div `
vertical-align: top;
 align:center;
  //background-color:##D8D8D8;
  font-family: Arial, sans-serif; /* font-family */
  font-weight: bold;
  line-height:21px;

  `

export const Event = styled.div `
 position: absolute;

 margin-left: auto;
margin-right: auto;
left: 0;
right: 0;
text-align: center;
  
  allign:center;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 5px;

  background-color:#ADD8E6;
  text-align: center;
  font-family: Arial, sans-serif;
  font-size: 16px; 
  line-height: 1.5; 
  color: #333; 
  overflow: hidden;


  &:hover {
    height: 93px;
    border: 1px solid #ccc;
    border-radius: 5px;
    
    background-color:#ADD8E6;
    text-align: center;
    font-family: Arial, sans-serif;
    font-size: 16px; 
    line-height: 1.5; 
    color: #333; 
    transition: all 0.2s ease-in-out;
    box-shadow: 0px 9px 4px -6px grey;
    
    transform: scaleY(1.1);
 
    cursor: pointer;
  }

    &:hover + EventDayNumber {
  visibility: hidden;
  display: none;
  }


`

export const EventName = styled.div `
  background-color:#ADD8E6;
  text-align: center;
  font-family: Arial, sans-serif; /* font-family */
  font-weight: bold;
  text-transform: uppercase;
  color: #333; /* text color */
  
`

export const EventTime = styled.div `
  background-color:#ADD8E6;
  text-align: center;
  font-family: Arial, sans-serif; /* font-family */
  font-weight: bold;
  text-transform: uppercase;
  color: #333; /* text color */

`
export const EventClassroom = styled.div `
  background-color:#ADD8E6;
  text-align: center;
  font-family: Arial, sans-serif; /* font-family */
  font-weight: bold;
  text-transform: uppercase;
  color: #333; /* text color */
  
`


