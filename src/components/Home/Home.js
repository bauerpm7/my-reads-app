//Vender
import React, { Fragment } from 'react';

// Components
import Description from './Description';
import Welcome from './Welcome';
import HomeHeader from './HomeHeader';

/**
 * Home Page Component, located at route /
 */
function Home() {
  return (
    <Fragment>
      <HomeHeader />
      <Welcome />
      <Description />
    </Fragment>
  );
}

export default Home;
