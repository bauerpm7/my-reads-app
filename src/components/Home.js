import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles';
import { Typography, Icon, Button } from 'material-ui'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const styles = {
  title:{
    color: 'white'
  },
  container:{
    backgroundColor: "#3f51b5",
    minHeight: 400,
    width: '100%',
    paddingTop:30,
    textAlign: 'center'
  },
  bookIcon: {
    color: 'white',
    fontSize: 180,
    paddingTop: 30
  },
  buttonContainer: {
    paddingTop: 50
  },
  links: {
    textDecoration: 'none',
    marginLeft:20,
    marginRight:20,
    marginBottom: 50
  },
  button:{
    width: 175,

  }

};

class Home extends Component{
  render() {
    const { classes } = this.props;
    return(
      <div className={classes.container}>
        <Typography 
        variant='display2' 
        component='h1'
        className={classes.title}
        > Welcome to My Reads</Typography>
        <Icon className={classes.bookIcon}>book</Icon>
        <div className={classes.buttonContainer}>
          <Link
            to='/library'
            className={classes.links}>
          <Button
          className={classes.button}
          variant='raised'
          color='secondary'
          size='large'
          >My Library</Button>
          </Link>
          <Link
            to='/search'
            className={classes.links}>
          <Button
          className={classes.button}
          variant='raised'
          color='secondary'
          size='large'
          >Search</Button>
          </Link>
        </div>
      </div>

    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);