import React from "react";
import { FormField, TextInput, Button } from "grommet";

class Login extends React.Component {
  state = {
    user: {
      email: "",
      password: ""
    }
  };

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  getLoginText(loginState) {
    if (loginState === "login") {
      return "Login";
    } else if (loginState === "createUser") {
      return "Sign Up";
    } else {
      return "";
    }
  }

  // getLoginAction(loginState) {
  //   if (loginState === "login") {
  //     return "Login";
  //   } else if (loginState === "createUser") {
  //     return "Sign Up";
  //   } else {
  //     return "";
  //   }
  // }

  getSecondaryAction(loginState, switchToLogin, switchToSignIn) {
    if (loginState === "login") {
      return <button onClick={switchToSignIn}> or sign up</button>;
    } else {
      return <button onClick={switchToLogin}> or login</button>;
    }
  }
  render() {
    const {
      changePage,
      createUser,
      loginState,
      loginUser,
      signOut,
      postLogin,
      switchToSignIn,
      switchToLogin,
      user
    } = this.props;

    return (
      <div>
        {user ? null : <h2>{this.getLoginText(loginState)}</h2>}

        {user
          ? null
          : this.getSecondaryAction(loginState, switchToLogin, switchToSignIn)}

        {user ? (
          <button onClick={signOut}> Sign Out </button>
        ) : (
          <form
            onSubmit={e => {
              console.log("submit");
              debugger;
            }}
          >
            <input
              placeholder="email"
              onChange={e =>
                this.setState({
                  user: { ...this.state.user, email: e.target.value }
                })
              }
              value={this.state.user.email}
            />
            <input
              type="password"
              placeholder="password"
              value={this.state.user.password}
              onChange={e =>
                this.setState({
                  user: { ...this.state.user, password: e.target.value }
                })
              }
            />
            <Button
              label="Go"
              onClick={() => {
                loginState === "createUser"
                  ? createUser(this.state.user)
                  : postLogin(this.state.user);
              }}
            />
          </form>
        )}
      </div>
    );
  }
}

export default Login;
