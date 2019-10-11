import React from "react";
import { Container } from "reactstrap";
import Peer from "simple-peer";
import { withRouter } from "react-router";
import ReactPlayer from "react-player";
import io from "socket.io-client";

import url from "../constants";

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
      console.log("connectToPear  emit Answer", data);
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
    if (this.state.me) {
      console.log("removeMe", this.state.me);
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
    let socket = io(url);
    const roomId = this.props.match.params.id;

    socket.room = roomId;
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(stream => {
        socket.emit("NewClient", { roomId });
        console.log("emitted  new client", stream);

        this.setState({
          videoSrc: stream,
          playing: true,
          socket
        });

        socket.on("CreatePeer", () => {
          console.log("received CreatePeer");
          this.makePeer(socket, stream);
        });

        socket.on("BackOffer", offer => {
          console.log("revcived back offer", offer);

          this.connectToPeer(offer, socket, stream);
        });
        socket.on("BackAnswer", answer => {
          console.log("revcived back answer", answer);
          this.signalAnswer(answer);
        });

        socket.on("Disconnect", () => {
          console.log("received disconnect on");
          this.removePeer();
        });
      })
      .catch(err => document.write(err));
  };

  onClick = () => {};
  render() {
    return (
      <Container>
        <div>
          <div className="row h-10 w-100">
            <div className="col">
              <button onClick={this.removeMe} id="leave-call-btn">
                Leave call
              </button>
            </div>
          </div>
          <div className="videos-container">
            <div>
              <div className="my-video-div">
                <ReactPlayer
                  url={this.state.videoSrc}
                  playing={this.state.playing}
                  volume={0}
                  className="my-video"
                  width="520"
                  height="440"
                />
              </div>
            </div>
            <div className="peer-video-div">
              <div id="peerDiv">
                <div id="muteText">
                  {this.state.peerVideoSrc && (
                    <ReactPlayer
                      url={this.state.peerVideoSrc}
                      playing={this.state.peerVideoSrc !== null}
                      className="peer-video"
                      id="peerVideo"
                      width="520"
                      height="440"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

export default withRouter(Chat);
