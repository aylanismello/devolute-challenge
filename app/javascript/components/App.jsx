import React from "react";
import axios from "axios";
import { Grommet } from "grommet";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Login from "./Login";

class App extends React.Component {
  state = {
    user: undefined,
    errors: []
  };

  componentWillMount() {
    console.log("hello");
    // axios.post("/users/sign_in");
    // this.createUser();
  }

  login(user) {
    this.setState({ user });
  }

  logNewError(e) {
    toast(e, {
      position: "top-right",
      autoClose: 10000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false
    });
  }

  createUser({ email, password }) {
    debugger;
    axios
      .post("/users", {
        user: {
          email,
          password
        }
      })
      .then(success => {
        const { data } = success;
        this.login(data);
      })
      .catch(yo => {
        this.logNewError("problem seen");
        // console.log('failure')
        // console.log(yo);
      });
  }

  render() {
    return (
      <Grommet plain>
        <div id="page-wrap">
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
          />{" "}
          App
          <Login createUser={user => this.createUser(user)} />
        </div>
      </Grommet>
    );
  }
}

export default App;
