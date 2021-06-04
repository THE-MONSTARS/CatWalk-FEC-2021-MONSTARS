import React from 'react';
import ReviewList from './ReviewList.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      something: ''
    }
  }

  componentDidMount() {

  }

  componentDidRender() {

  }

  render() {
    return (
      <div>
        Hello from React!

        <ReviewList />
      </div>

    );
  }
}

export default App;