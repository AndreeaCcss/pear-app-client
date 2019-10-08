import React from "react";
import { Container, Row, Col } from "reactstrap";
import Peer from "simple-peer";

import ReactPlayer from "react-player";
import io from "socket.io-client";

// import Highlight from "../components/Highlight";
// import Loading from "../components/Loading";
// import { useAuth0 } from "../react-auth0-spa";

class Chat extends React.Component {
  // const { loading, user, auth0 } = useAuth0();
  // const f = useAuth0();

  // if (loading || !user) {
  //   return <Loading />;
  // }
  // const getIdToken = async () => {
  //   const id = await f.getIdTokenClaims();
  //   console.log("user", id.__raw);
  // };

  // getIdToken();

  state = {
    videoSrc: null,
    playing: false,
    peerVideoSrc: null,
    gotAnswer: false,
    peer: null
  };

  initPear = (type, stream) => {
    let peer = new Peer({
      initiator: type == "init" ? true : false,
      stream: stream,
      trickle: false
    });
    const that = this;
    peer.on("stream", function(stream) {
      that.setState({
        peerVideoSrc: stream,
        playing: true
      });
    });
    return peer;
  };

  makePeer = (socket, stream) => {
    let peer = this.initPear("init", stream);
    const gotAnswer = this.state.gotAnswer;
    peer.on("signal", function(data) {
      if (!gotAnswer) {
        socket.emit("Offer", data);
      }
    });
    this.setState({
      peer: peer
    });
  };

  connectToPeer = (offer, socket, stream) => {
    let peer = this.initPear("notInit", stream);
    peer.on("signal", data => {
      socket.emit("Answer", data);
    });
    peer.signal(offer);
    this.setState({
      peer: peer
    });
  };

  signalAnswer = answer => {
    this.setState({
      gotAnswer: true
    });
    let peer = this.state.peer;
    peer.signal(answer);
  };

  removePeer = () => {
    if (this.state.peer) {
      this.state.peer.destroy();
      this.setState({
        peer: null
      });
    }
  };

  componentDidMount = () => {
    let socket = io("http://localhost:4000");
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(stream => {
        socket.emit("NewClient");
        this.setState({
          videoSrc: stream,
          playing: true
        });

        socket.on("BackOffer", offer => {
          this.connectToPeer(offer, socket, stream);
        });
        socket.on("BackAnswer", answer => {
          this.signalAnswer(answer);
        });
        socket.on("CreatePeer", () => this.makePeer(socket, stream));
        socket.on("Disconnect", () => this.removePeer());
      })
      .catch(err => document.write(err));
  };

  render() {
    return (
      <Container className="mb-5">
        <div className="container-fluid">
          <div className="row h-10 w-100">
            <div className="col"></div>
          </div>
          <div className="row h-90 w-100">
            <div className="col-12 col-sm-6 d-flex justify-content-center">
              <div className="embed-responsive embed-responsive-16by9">
                <ReactPlayer
                  url={this.state.videoSrc}
                  playing={this.state.playing}
                />
              </div>
            </div>
            <div className="col-12 col-sm-6 d-flex justify-content-center">
              <div
                id="peerDiv"
                className="embed-responsive embed-responsive-16by9"
              >
                <div className="centered" id="muteText">
                  <ReactPlayer
                    url={this.state.peerVideoSrc}
                    playing={this.state.playing}
                    className="embed-responsive-item"
                    id="peerVideo"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

export default Chat;
