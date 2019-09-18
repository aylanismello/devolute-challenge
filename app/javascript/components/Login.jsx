import React from "react";
import { FormField, TextInput, Button, Heading, Form } from "grommet";

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

  getSecondaryAction(loginState, switchToLogin, switchToSignIn) {
    if (loginState === "login") {
      return <Button label="or sign up" onClick={switchToSignIn} />;
    } else {
      return <Button label="or login" onClick={switchToLogin} />;
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
        {user ? null : (
          <Heading size="medium">{this.getLoginText(loginState)}</Heading>
        )}

        {user
          ? null
          : this.getSecondaryAction(loginState, switchToLogin, switchToSignIn)}

        {user ? (
          <Button label="Sign Out" onClick={signOut} />
        ) : (
          <Form
            onSubmit={e => {
              console.log("submit");
              debugger;
            }}
          >
            <FormField label="email">
              <TextInput
                type="email"
                onChange={e =>
                  this.setState({
                    user: { ...this.state.user, email: e.target.value }
                  })
                }
                value={this.state.user.email}
              />
            </FormField>
            
            <FormField label="password">
              <TextInput
                type="password"
                placeholder="password"
                value={this.state.user.password}
                onChange={e =>
                  this.setState({
                    user: { ...this.state.user, password: e.target.value }
                  })
                }
              />
            </FormField>

            {/* <input
           
            /> */}
            <Button
              label="Go"
              onClick={() => {
                loginState === "createUser"
                  ? createUser(this.state.user)
                  : postLogin(this.state.user);
              }}
            />
          </Form>
        )}
      </div>
    );
  }
}

export default Login;
