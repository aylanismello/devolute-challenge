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

const MyGrid = styled.div`
  grid-template-columns: repeat(3, auto);
  display: grid;
  grid-gap: 2rem;
`;

class App extends React.Component {
  state = Object.freeze({
    user: undefined,
    errors: [],
    uploading: false,
    loading: false,
    // states: login, createUser, loggedIn
    loginState: "createUser",
    photos: [],
    // keyed in by ID
    photoDataUrls: {}
  });

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
          const newPhotoDataUrl = {};
          newPhotoDataUrl[photo.id] = data;

          this.setState({
            photoDataUrls: { ...this.state.photoDataUrls, ...newPhotoDataUrl }
          });
        })
        .catch(err => {
          this.logNewError(err);
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
      .catch(err => {
        this.logNewError(err);
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
      .catch(err => {
        this.logNewError(err);
      });
  }
  
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
                <MyDropzone
                  user={this.state.user}
                  uploading={uploading}
                  fetchPhotos={() => this.fetchPhotos(this.state.user)}
                  setUploading={uploading => this.setUploading(uploading)}
                />

                <h4>My Images:</h4>
                <MyGrid className="MyGrid">
                  {this.state.photos.reverse().map(photo => (
                    <Photo
                      id={photo.id}
                      name={photo.name}
                      src={this.state.photoDataUrls[photo.id]}
                    />
                  ))}
                </MyGrid>
              </Box>
            )}
          </ContentBox>
        </div>
      </Grommet>
    );
  }
}

export default App;
