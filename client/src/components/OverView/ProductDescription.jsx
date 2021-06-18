import React, { useState, useEffect } from 'react';
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

const FeatureContainer = styled.div`
  border-left: 2px groove #343a40;
  padding-left: 8vw;
`

const Feature = styled.li`
  font-family: 'Roboto';
  font-size: 12px;
  margin: 10px 0;

`
const FeatureBold = styled.b`
  font-family: 'Roboto';
  font-size: 14px;
  border-bottom: 1px dotted #343a40;
  padding 2px;
`


const ProductDescription = ({currentProduct}) => {
  // const [ slogan, setSlogan ] = useState(currentProduct.slogan)
  // const [ description, setDescription ] = useState(currentProduct.description)
  const slogan = currentProduct.slogan;
  const description = currentProduct.description;
  const features = currentProduct.features;

  return (
    <DescriptionAndFeatures>
      <DescriptionContainer>
        {slogan &&
        <ProductSlogan>{slogan}</ProductSlogan>
        }
        {description && <p className="description">{description}</p>}
      </DescriptionContainer>
      <FeatureContainer>
        <ul>
          {features && features.map((feature, idx) => (
            <Feature key={idx}><FeatureBold>{feature.feature}</FeatureBold> -        {feature.value}</Feature>
          ))}
        </ul>
      </FeatureContainer>
    </DescriptionAndFeatures>
  )
}


export default ProductDescription;