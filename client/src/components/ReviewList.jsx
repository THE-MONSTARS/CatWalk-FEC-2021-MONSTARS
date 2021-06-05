import React, { useState, useEffect } from 'react';
import axios from 'axios';
import credentials from '../../../config.js'

class ReviewList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reviews: [],
    }
    this.updateReviews = this.updateReviews.bind(this);
  }

  componentDidMount() {
    axios({
      method: 'GET',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/',
      headers: { 'Authorization': credentials.TOKEN },
    })
    .then(res => {
      console.log(res.data)
      // this.updateReviews(data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  updateReviews(data) {
    this.setState({
      reviews: data,
    })

  }

  render() {
    return (
      <div>ReviewList</div>
    )
  }
}

// function ReviewList() {
//   const [reviews setReviews] = useState([]);

//   return (
//     <div></div>
//   )
// }










export default ReviewList