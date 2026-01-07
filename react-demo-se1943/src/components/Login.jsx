import React from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  componentDidMount() {
    console.log('Login component mounted');
  }
  componentWillUnmount() {
    console.log('Login component unmounted');
  }
  
  render() {
    <div>
      <h1>Login</h1>
      <form>
        <input
          type="text"
          placeholder="Username"
          value={this.state.username}
          onChange={(e) => this.setState({ username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={this.state.password}
          onChange={(e) => this.setState({ password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  }
}
export default Login;