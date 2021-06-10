import React from 'react';
import styled from 'styled-components';


const DescriptionAndFeatures = styled.div`
  display: flex;
  flex-direction: row;
`

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Feature = styled.li`
`



const ProductDescription = ({currentProduct}) => {
  const slogan = currentProduct.slogan;
  const description = currentProduct.description;
  const features = currentProduct.features;



  return (
    <DescriptionAndFeatures>
      <DescriptionContainer>
        {slogan && <h2 className="product-slogan">{slogan}</h2>}
        {description && <p className="description">{description}</p>}
      </DescriptionContainer>
      <div>
        <ul>
          {features && features.map((feature, idx) => (
            <Feature key={idx}>{feature.feature}: {feature.value}</Feature>
          ))}
        </ul>
      </div>
    </DescriptionAndFeatures>
  )
}


export default ProductDescription;