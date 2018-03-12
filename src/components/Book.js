import React, { Component } from 'react';
import Card, { CardContent, CardActions,} from 'material-ui/Card'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';


const styles = theme => ({
  card: {
    width: 210,
    height: 400,
  },
  media: {
    height:215,

  },
  thumbnail: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop:5,
    height:210,
    width:180
  },
  title: {
    fontSize: 18,
    lineHeight: 1
  }, 
  cardContent: {
    height:80
  }
});

class Book extends Component {
  

  shelfSelectChange(selectValue) {
        let {libraryBook, updateBook} = this.props;
        libraryBook.shelf = selectValue;
        updateBook(libraryBook);
      }

  render() {
  
    const { classes, libraryBook:{title, authors, imageLinks, shelf}} = this.props
    
    return (
      <div>
        <Card className={classes.card}>
          <CardContent className={classes.media}>
            <img src={imageLinks.thumbnail} alt = {title} className={classes.thumbnail} />
          </CardContent>
          <CardContent className= {classes.cardContent}>
            <Typography component="h3" className = {classes.title} >
              {title}
            </Typography>
            <Typography component="p">
              by: {authors}
            </Typography>
          </CardContent>
          <CardActions>
            <select
              value={shelf}
              onChange={(event) => this.shelfSelectChange(event.target.value)}
            >
              <option value="message">Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </CardActions>
        </Card>
      </div>
    );
  }
}

Book.propTypes = {
  classes: PropTypes.object.isRequired,
  libraryBook: PropTypes.object,
  updateBook: PropTypes.func
};


export default withStyles(styles)(Book);