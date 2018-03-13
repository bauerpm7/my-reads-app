import React, { Fragment } from 'react';
import Description from './Description';
import Welcome from './Welcome';
import HomeHeader from './HomeHeader';

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
