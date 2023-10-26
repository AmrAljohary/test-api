import React, { Component } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      logged: false,
      profileData: null,
      loading: true, // To track if the initial session check is complete
    };
  }

  componentDidMount() {
    // When the component mounts, check the session to see if the user is already logged in.
    this.checkSession();
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleLogin = () => {
    // Add a delay before the login request using setTimeout
    setTimeout(() => {
      const { email, password } = this.state;
      axios
        .post(
          "https://arabicedu.onrender.com/login",
          {
            email,
            password,
          },
          { withCredentials: true }
        )
        .then(() => {
          // After successful login, check the session and fetch profile data
          this.checkSession();
        })
        .catch((error) => {
          console.error("Login failed", error);
        });
    }, 1000); // 1000 milliseconds (1 second) delay
  };

  checkSession = () => {
    // Add a delay before the session check request using setTimeout
    setTimeout(() => {
      axios
        .get("https://arabicedu.onrender.com/", { withCredentials: true })
        .then((response) => {
          const { logged } = response.data;
          this.setState({ logged, loading: false });
          if (logged) {
            // If the user is logged in, fetch the profile data
            this.fetchProfileData();
          }
        })
        .catch((error) => {
          console.error("Failed to check session", error);
          this.setState({ loading: false });
        });
    }, 1000); // 1000 milliseconds (1 second) delay
  };

  fetchProfileData = () => {
    // Add a delay before the profile data request using setTimeout
    setTimeout(() => {
      axios
        .get("https://arabicedu.onrender.com/profile", { withCredentials: true })
        .then((response) => {
          this.setState({ profileData: response.data });
        })
        .catch((error) => {
          console.error("Failed to fetch profile data", error);
        });
    }, 1000); // 1000 milliseconds (1 second) delay
  };

  handleLogout = () => {
    // Add a delay before the logout request using setTimeout
    setTimeout(() => {
      axios
        .get("https://arabicedu.onrender.com/logout", { withCredentials: true })
        .then(() => {
          // After successful logout, reset the state
          this.setState({ logged: false, profileData: null });
        })
        .catch((error) => {
          console.error("Logout failed", error);
        });
    }, 1000); // 1000 milliseconds (1 second) delay
  };

  render() {
    const { logged, profileData, loading } = this.state;

    return (
      <div>
        <h1>Login Form</h1>
        {loading ? (
          <p>Loading...</p>
        ) : logged ? (
          <div>
            <h2>Welcome, you are logged in!</h2>
            <button onClick={this.handleLogout}>Logout</button>
            <div>
              <h2>Your Profile Data:</h2>
              <pre>{JSON.stringify(profileData, null, 2)}</pre>
            </div>
          </div>
        ) : (
          <div>
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={this.handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleInputChange}
            />
            <button onClick={this.handleLogin}>Login</button>
            <p>Not Logged In</p>
          </div>
        )}
      </div>
    );
  }
}

export default Login;
