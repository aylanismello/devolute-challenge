import React, { useCallback } from "react";
import axios from "axios";
import { Grommet } from "grommet";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Login from "./Login";
import MyDropzone from "./MyDropzone";

class App extends React.Component {
  state = Object.freeze({
    user: undefined,
    errors: [],
    uploading: false,
    loading: false,
    loginState: "createUser"
  });

  // login, createUser, loggedIn

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

  setUploading(uploading) {
    this.setState({ uploading });
  }

  createUser({ email, password }) {
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
        this.setState({ loginState: "loggedIn " });
      })
      .catch(yo => {
        this.logNewError("problem seen");
      });
  }

  postLogin({ email, password }) {
    axios
      .post("/users/sign_in", {
        user: {
          email,
          password
        }
      })
      .then(success => {
        const { data } = success;
        this.login(data);
        this.setState({ loginState: "loggedIn " });
      })
      .catch(yo => {
        this.logNewError("problem seen");
        // console.log('failure')
        // console.log(yo);
      });
  }

  getIsLogin() {}

  signOut() {
    this.setState({ user: undefined, loginState: "login" });
  }

  render() {
    const { uploading } = this.state;

    return (
      <Grommet plain>
        <div id="page-wrap">
          {this.state.uploading ? "UPLOADING" : ""}
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
          <Login
            loginState={this.state.loginState}
            postLogin={user => this.postLogin(user)}
            createUser={user => this.createUser(user)}
            user={this.state.user}
            signOut={() => this.signOut()}
            switchToSignIn={() => this.setState({ loginState: "createUser" })}
            switchToLogin={() => {
              this.setState({ loginState: "login" });
            }}
          />
          {this.state.user && (
            <MyDropzone
              user={this.state.user}
              uploading={uploading}
              setUploading={uploading => this.setUploading(uploading)}
            />
          )}
        </div>
      </Grommet>
    );
  }
}

export default App;
