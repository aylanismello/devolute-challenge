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

  render() {
    const { changePage, createUser } = this.props;

    return (
      <div>
        <h2>Login</h2>
        <form
          onSubmit={e => {
            console.log("submit");
            debugger;
          }}
        >
          <input
            placeholder="email"
            onChange={e => this.setState({ user: { ...this.state.user, email: e.target.value } })}
            value={this.state.user.email}
          />
          <input
            type="password"
            placeholder="password"
            value={this.state.user.password}
            onChange={e =>
              this.setState({ user: { ...this.state.user, password: e.target.value } })
            }
          />
          <Button
            label="Go"
            onClick={() => {
              createUser(this.state.user);
            }}
          />
        </form>
      </div>
    );
  }
}

export default Login;
