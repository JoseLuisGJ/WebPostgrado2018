/**
 *
 * LogoEsat
 *
 */

import React from "react";
import LogoEsatImg from "./logo_esat.svg";
import "./style.scss";

class LogoEsat extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="c-logo-esat">
        <img src={LogoEsatImg} />
      </div>
    );
  }
}

LogoEsat.propTypes = {};

export default LogoEsat;
