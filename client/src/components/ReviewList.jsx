import React, { useState, useEffect } from 'react';
import axios from 'axios';
import credentials from '../../../config.js'
// import API from '../../../server/router.js'
import Review from './Review.jsx'
const url = 'http://localhost:3000'

function ReviewList() {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ reviews, setReviews ] = useState([]);
  const [ productId, setProductId ] = useState(16057)

  //update reviews
  useEffect(() => {
    function getReviews() {
      setIsLoading(true)
      return axios({
        method: 'GET',
        url: `${url}/reviews/${productId}`,
        headers: { 'Authorization': credentials.TOKEN },
      })
      .then(res => {
        setReviews(res.data.results)
        setIsLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
    }
    getReviews();
  }, [])
  // return //cleanup

  return (
    isLoading ?
    <div> Loading Reviews... </div> :
    <div> Reviews:
        {reviews.map((review, index) => (
        <Review summary={review.summary} body={review.body} date={review.date} key={index} reviewer_name={review.reviewer_name} rating={review.rating}/>))}
    </div>
  )
}

// const getReviews = (product_id) => {
//   const params = new URLSearchParams({ sort: "newest", product_id: product_id, })
//   await axios({
//     method: 'GET',
//     url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews?${params}`,
//     headers: { 'Authorization': credentials.TOKEN },
//   })
//   .then(res => {
//     setReviews(res.data.results)
//     console.log(res.data.results);
//   })
// }

// class ReviewList extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       product: "",
//       reviews: [],
//     }
//     this.getProductList = this.getProductList.bind(this);
//     this.getReviews = this.getReviews.bind(this);
//     this.updateState = this.updateState.bind(this);
//   }

//   componentDidMount() {
//     this.getProductList()
//     this.getReviews(16057)
//   }

//   getProductList() {
//     axios({
//       method: 'GET',
//       url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/',
//       headers: { 'Authorization': credentials.TOKEN },
//     })
//     .then(res => {
//       console.log(res.data)
//       // this.updateReviews(data)
//     })
//     .catch(err => {
//       console.log(err)
//     })
//   }

//   updateState(state, value) {
//     this.setState({
//       [state]: value,
//     })

//   }

//   render() {
//     var mappedReviews = this.state.reviews.map((review, index) => (
//         <Review summary={review.summary} body={review.body} date={review.date} key={index} reviewer_name={review.reviewer_name} rating={review.rating}/>
//       )
//     )

//     return (
//       <div>
//         Reviews:
//         {mappedReviews}
//       </div>
//     )
//   }
// }

// function ReviewList() {
//   const [reviews setReviews] = useState([]);

//   return (
//     <div></div>
//   )
// }

export default ReviewList