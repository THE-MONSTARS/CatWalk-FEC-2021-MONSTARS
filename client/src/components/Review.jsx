import React from 'react';

const Review = (props) => {
  return (
    <div>
      <br></br>
        <div> <b>{props.summary}</b> </div>
        <div> Reviewer Name: {props.reviewer_name} </div>
        <div> Review: {props.body} </div>
        <div> Rating: {props.rating} </div>
        <div> Date of Review: {props.date} </div>
    </div>
  )
}

export default Review;