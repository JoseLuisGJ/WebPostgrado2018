/*
 * IntroPage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from "react";
import PropTypes from "prop-types";
import { TweenMax, TweenLite, TimelineLite, Power1 } from "gsap";
import ShuffleText from "shuffle-text";
import GlitchBoy from "components/GlitchBoy";

import "./style.scss";

let textFirst = true;

export class IntroPage extends React.Component {
  constructor() {
    super();
    this.state = {
      animating: false
    };
  }
  componentDidMount() {
    TweenLite.set(this.wrapper, { visibility: "visible" });
    const tl = new TimelineLite();
    tl.from(
      this.title,
      1,
      { opacity: 0, x: -200, ease: Power1.easeOut, delay: 1 },
      "0"
    );
    tl.from(
      this.subtitle,
      1,
      { opacity: 0, x: 250, ease: Power1.easeOut, delay: 1 },
      "-=0.5"
    );
    //tl.from(this.GlitchBoyCanvas, 10, { opacity: 0 }, "0");
    //window.alert(this.props.route.logo);
    setTimeout(this.startGlitch, 3000);
  }

  startGlitch = () => {
    this.changeTitle();
    this.GlitchBoyCanvas.startGlitch();
    setTimeout(this.stopGlitch, 1000);
  };

  stopGlitch = () => {
    this.GlitchBoyCanvas.stopGlitch();
    setTimeout(this.startGlitch, 3000);
  };

  changeTitle = () => {
    if (textFirst) {
      this.textShuffle.innerHTML = "mind";
    } else {
      this.textShuffle.innerHTML = "career";
    }
    textFirst = !textFirst;
    this.text = new ShuffleText(this.textShuffle);
    this.text.start();
    
  }

  prueba = () =>{
    console.log("TargetPage event");
  }

  render() {
    return (
      <div
        className="wrapper-home"
        ref={el => {
          this.wrapper = el;
        }}
      >
        <h1
          ref={el => {
            this.title = el;
          }}
        >
          Disrupt your{" "}
          <span
            ref={el => {
              this.textShuffle = el;
            }}
            id="text-shuffle"
          >
            career
          </span>
        </h1>
        <GlitchBoy
          ref={el => {
            this.GlitchBoyCanvas = el;
          }}
        />
        <h2
          ref={el => {
            this.subtitle = el;
          }}
        >
          Postgrado en diseño web y programación
          <b> frontend</b>
        </h2>
      </div>
    );
  }
}

IntroPage.propTypes = {};

export default IntroPage;
