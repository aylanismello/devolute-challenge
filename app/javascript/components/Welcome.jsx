import React from "react";
import axios from "react";
// import Login from './login';

class Welcome extends React.Component {
  componentWillMount() {
    console.log("hello");
    axios
      .post("/users/sign_in")
      .then(r => {
        console.log(r);
      })
      .catch(r => {
        console.log(r);
      });
  }

  getInitialState = () => ({ page: "login " });

  changePage = newPage => {
    this.setState({ page: newPage });
  };

  render() {
    return <h1> YO YO YO! </h1>;
  }
}

export default Welcome;
