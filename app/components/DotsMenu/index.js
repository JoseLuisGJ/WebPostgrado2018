/**
*
* DotsMenu
*
*/

import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';


class DotsMenu extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="c-dots-menu">
        Menu
        <ul>
          <li><Link to="/">Apartado 1</Link></li>
          <li><Link to="/target">Apartado 2</Link></li>
        </ul>
      </div>
    );
  }
}

DotsMenu.propTypes = {

};

export default DotsMenu;
