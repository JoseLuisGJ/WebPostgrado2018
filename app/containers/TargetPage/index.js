/*
 * TargetPage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from "react";
import PropTypes from "prop-types";
import { TweenMax, TweenLite, TimelineLite, Power1 } from "gsap";


import "./style.scss";



export class TargetPage extends React.Component {

  constructor() {
    super();
    this.state = {
    };
  }
  componentDidMount() {

  }

  onExit(){
    window.alert("sad");
  }

  prueba = () =>{
    console.log("TargetPage event");
  }


  render() {
    return (
      <div className="wrapper-target" >
      Pagina 2
      </div>
    );
  }
}

TargetPage.propTypes = {};

export default TargetPage;
