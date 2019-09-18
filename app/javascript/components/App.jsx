import React, { useCallback } from "react";
import axios from "axios";
import { Grommet, Box, Image, Grid } from "grommet";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import ReactLoading from "react-loading";
import styled from "styled-components";
import Login from "./Login";
import MyDropzone from "./MyDropzone";
import Photo from "./Photo";

const ContentBox = styled(Box)`
  max-width: 600px;
  margin: 0 auto;
`;

class App extends React.Component {
  state = Object.freeze({
    user: undefined,
    errors: [],
    uploading: false,
    loading: false,
    loginState: "createUser",
    photos: [],
    // keyed in by ID
    photoDataUrls: {}
  });

  // login, createUser, loggedIn

  componentWillMount() {
    console.log("hello");
    // axios.post("/users/sign_in");
    // this.createUser();
  }

  login(user) {
    this.setState({ user });
    this.fetchPhotos(user);
  }

  fetchPhotoDataUrls() {
    this.state.photos.forEach(photo => {
      axios
        .get(photo.photo_url_full)
        .then(success => {
          const { data } = success;
          console.log(success);
          const newPhotoDataUrl = {};
          newPhotoDataUrl[photo.id] = data;

          this.setState({
            photoDataUrls: { ...this.state.photoDataUrls, ...newPhotoDataUrl }
          });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  fetchPhotos({ id }) {
    axios
      .get(`/users/${id}/photos`)
      .then(success => {
        const {
          data: { photos }
        } = success;
        this.setState({ photos }, () => {
          this.fetchPhotoDataUrls();
        });
      })
      .catch(err => {
        this.logNewError("Problem fetching photos.");
      });
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
          <ContentBox className="content">
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
              <Box>
                {this.state.uploading ? (
                  <ReactLoading color="#7d4cdb" width={50} height={50} />
                ) : (
                  <MyDropzone
                    user={this.state.user}
                    uploading={uploading}
                    fetchPhotos={() => this.fetchPhotos(this.state.user)}
                    setUploading={uploading => this.setUploading(uploading)}
                  />
                )}

                <Grid gap="small">
                  {this.state.photos.reverse().map(photo => (
                    <Photo
                      id={photo.id}
                      name={photo.name}
                      src={this.state.photoDataUrls[photo.id]}
                    />
                  ))}
                </Grid>
              </Box>
            )}
          </ContentBox>
        </div>
      </Grommet>
    );
  }
}

export default App;
