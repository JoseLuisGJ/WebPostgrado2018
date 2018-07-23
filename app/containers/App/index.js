/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from "react";
import { Helmet } from "react-helmet";
import { Switch, Route } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
// Components
import LogoEsat from "components/LogoEsat";
import DotsMenu from "components/DotsMenu";
// Pages
import IntroPage from "containers/IntroPage";
import TargetPage from "containers/TargetPage";

export default function App() {
  return (
    <div>
      <Helmet
        titleTemplate="%s - Postgrado Web"
        defaultTitle="Postgrado Web - ESAT"
      >
        <meta name="description" content="Postgrado Web - ESAT" />
      </Helmet>
      <LogoEsat />
      <DotsMenu />
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              classNames="fade"
              timeout={700}
              onEntering={(node, done) => console.log('entering')}
              onEntered={(node, done) => console.log('entered')}
              onExiting={(node, done) => console.log(done)}
              onExited={(node, done) => console.log('exited')}
            >
              <Switch location={location}>
                <Route exact path="/" render={()=><IntroPage prueba="2" />}  />
                <Route path="/target" component={TargetPage} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    </div>
  );
}
