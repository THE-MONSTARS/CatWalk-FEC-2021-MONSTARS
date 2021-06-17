import React from 'react';
import styled from 'styled-components';


const DescriptionAndFeatures = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 80%;
  min-width: 600px;
  max-width: 900px;
  margin: 1.5rem 0 3.5rem 70px;

`

const DescriptionContainer = styled.div`
  font-family: 'Roboto';
  font-size: 11px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-basis: 60%;
`

const ProductSlogan = styled.h2`
  font-family: 'Roboto-Bold';
  font-size: 14px;
  margin-bottom: 6px;
`

const Feature = styled.li`
  font-family: 'Roboto';
`



const ProductDescription = ({currentProduct}) => {
  const slogan = currentProduct.slogan;
  const description = currentProduct.description;
  const features = currentProduct.features;



  return (
    <DescriptionAndFeatures>
      <DescriptionContainer>
        {slogan &&
        <ProductSlogan>{slogan}</ProductSlogan>}
        {description && <p className="description">{description}</p>}
      </DescriptionContainer>
      <div>
        {/* <ul>
          {features && features.map((feature, idx) => (
            <Feature key={idx}>{feature.feature}: {feature.value}</Feature>
          ))}
        </ul> */}
      </div>
    </DescriptionAndFeatures>
  )
}


export default ProductDescription;