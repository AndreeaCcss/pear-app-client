import React from "react";
import { Container, Row, Col } from "reactstrap";
import Peer from "simple-peer";
import { withRouter } from "react-router";

import ReactPlayer from "react-player";
import io from "socket.io-client";

// import Highlight from "../components/Highlight";
// import Loading from "../components/Loading";
// import { useAuth0 } from "../react-auth0-spa";
// import Loading from "../components/Loading";

class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      videoSrc: null,
      playing: false,
      peerVideoSrc: null,
      gotAnswer: false,
      me: null,
      peer: null,
      auth: this.auth,
      socket: null
    };
  }

  initPeer = (type, stream) => {
    let peer = new Peer({
      initiator: type == "init" ? true : false,
      stream: stream,
      trickle: false
    });
    console.log("type", type, "stream in initPeer", stream);
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
    let me = this.initPeer("init", stream);
    const gotAnswer = this.state.gotAnswer;
    console.log("makePeer gotAnswer", gotAnswer);
    me.on("signal", function(data) {
      if (!gotAnswer) {
        socket.emit("Offer", data);
      }
    });
    console.log("setting me in state", me);
    this.setState({
      me: me
    });
  };

  connectToPeer = (offer, socket, stream) => {
    let peer = this.initPeer("notInit", stream);
    console.log("connectToPear");
    peer.on("signal", data => {
      socket.emit("Answer", data);
      console.log("connectToPear  emit Answer");
    });
    console.log("connectToPeer", peer, "offer", offer);
    peer.signal(offer);
    this.setState({
      peer: peer
    });
  };

  signalAnswer = answer => {
    if (this.state.me) {
      this.setState({
        gotAnswer: true
      });
      let peer = this.state.me;
      console.log("signalAnswer", peer, "answer", answer);
      peer.signal(answer);
    } else {
      console.log("Ignored signalAnswer");
    }
  };

  removePeer = () => {
    if (this.state.peer) {
      console.log("removePeer", this.state.peer);
      this.state.peer.destroy();
      this.setState({
        peer: null,
        peerVideoSrc: null
      });
    } else {
      console.log("Ignored removePeer");
    }
  };

  removeMe = () => {
    console.log("removeMe clickd =>", this.state.me);
    if (this.state.me) {
      console.log("removeMe", this.state.me);
      // this.state.me.destroy();
      // this.state.peer.destroy();
      this.state.socket.emit("Disconnect");
    }

    this.state.videoSrc.getTracks().forEach(track => track.stop());
    this.setState({
      me: null,
      videoSrc: null
    });
    this.props.history.push("/join-chat");
  };

  componentDidMount = () => {
    // let socket = io("http://localhost:4000");
    //let socket = io("http://d65a323b.ngrok.io");
    let socket = io("https://vast-beach-23446.herokuapp.com");
    const roomId = this.props.match.params.id;

    socket.room = roomId;
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(stream => {
        socket.emit("NewClient", { roomId });

        this.setState({
          videoSrc: stream,
          playing: true,
          socket
        });
        // socket.emit("joinedRoom", { id: this.props.match.params.id });

        // socket.on("joinedRoom", ()  => {

        // })
        socket.on("BackOffer", offer => {
          this.connectToPeer(offer, socket, stream);
        });
        socket.on("BackAnswer", answer => {
          this.signalAnswer(answer);
        });

        socket.on("CreatePeer", () => {
          console.log("received CreatePeer");
          this.makePeer(socket, stream);
        });
        socket.on("Disconnect", () => this.removePeer());
      })
      .catch(err => document.write(err));
  };

  onClick = () => {};
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
                  volume={0}
                />
              </div>
            </div>
            <div className="col-12 col-sm-6 d-flex justify-content-center">
              <div
                id="peerDiv"
                className="embed-responsive embed-responsive-16by9"
              >
                <div className="centered" id="muteText">
                  {this.state.peerVideoSrc && (
                    <ReactPlayer
                      url={this.state.peerVideoSrc}
                      playing={this.state.peerVideoSrc !== null}
                      className="embed-responsive-item"
                      id="peerVideo"
                    />
                  )}
                </div>
              </div>
              <button onClick={this.removeMe}>leave call</button>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

export default withRouter(Chat);
