import React,{ useState } from 'react';
import styled from 'styled-components';
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";


const EmptyStar='../assets/icons8-star-24-empty.png'

const CrossCircle='../assets/outline_highlight_off_black_24dp.png'

const StyleImg=styled.img`
width: 50px;
height: 50px;
`
const StyledModal=Modal.styled`
width: 500px;
height: 500px;
display: absolute;
align-items: center;
justify-content: center;
background-color: white;

opacity: ${(props) => props.opacity};
transition: all 0.3s ease-in-out;
`


export default function RelatedAction ({product, overviewProduct}) {
  const [isRelated, setIsRelated]=useState(true);
  const [isOpen, setIsOpen]=useState(false);
  const [opacity, setOpacity]=useState(0);
  const [compareInfo, setCompareInfo]=useState([1,2,3]);

  const clickHandle=(e) => {
    toggleModal()
    comparisionData()
  }

  const toggleModal=(e) => {
    setOpacity(0);
    setIsOpen(!isOpen);
  }

  const afterOpen=() => {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }

  const beforeClose=() => {
    return new Promise((resolve) => {
      setOpacity(0);
      setTimeout(resolve, 300);
    });
  }


  const comparisionData=() => {
    const charArray=new Set();
    let compareData=[];

    product.features.forEach(entry => charArray.add(entry.feature));
    overviewProduct.features.forEach(entry => charArray.add(entry.feature));

    for(var i=0; charArray.size > i; i++) {
      let data={};
      let feature=Array.from(charArray)[i]
      const productA=product.features;
      const productB=overviewProduct.features;
      if(productA.some(entry => entry.feature === feature) && productB.some(entry => entry.feature === feature)) {
        data.feature=feature;
        data.valueA=product.features.find(entry => entry.feature === feature).value;
        data.valueB=overviewProduct.features.find(entry => entry.feature === feature).value;
        compareData.push(data);
      } else if (productA.some(entry => entry.feature === feature)) {
        data.feature=feature;
        data.valueA=product.features.find(entry => entry.feature === feature).value;
        data.valueB=null;
        compareData.push(data);
      } else {
        data.feature=feature;
        data.valueA=null;
        data.valueB=overviewProduct.features.find(entry => entry.feature === feature).value;
        compareData.push(data);
      }
    }
    setCompareInfo(compareData);
  }

  return (
    <div>
      <StyleImg onClick={(e) => clickHandle(e)} src= {isRelated? EmptyStar : CrossCircle}/>
      <StyledModal
        isOpen={isOpen}
        afterOpen={ afterOpen}
        beforeClose={beforeClose}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
        opacity={opacity}
        backgroundProps={{opacity}}
      >
        <div style={{padding: "8px",textAlign: "left"}}>COMPARING</div>
        <table style={{border: "1px solid black", width: "100%",tableLayout: "fixed"}}>
          <thead>
          <tr >
            <th style={{padding: "5px 8px 15px", textAlign: "left"}}>{product.name}</th>
            <th style={{textAlign: "center"}}></th>
            <th style={{padding: "5px 8px 15px", textAlign: "right"}}>{overviewProduct.name}</th>
          </tr>
          </thead>
          <tbody>
          {compareInfo.map((entry, index) => (
            <tr key={index}>
              <td style={{padding: "5px",textAlign: "left"}}>{entry.valueA === true ? "√" : entry.valueA}</td>
              <td style={{padding: "5px",textAlign: "center"}}>{entry.feature}</td>
              <td style={{padding: "5px",textAlign: "right"}}>{entry.valueB}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </StyledModal>
    </div>


  )
}