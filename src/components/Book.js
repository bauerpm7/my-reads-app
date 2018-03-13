import React, { Component } from 'react';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  card: {
    width: 210,
    height: 400
  },
  media: {
    height: 215
  },
  thumbnail: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: 5,
    height: 210,
    width: 180
  },
  title: {
    fontSize: 18,
    lineHeight: 1
  },
  cardContent: {
    height: 80
  }
});

class Book extends Component {
  shelfSelectChange(selectValue) {
    let { book, updateBook } = this.props;
    book.shelf = selectValue;
    updateBook(book);
  }

  render() {
    let author;
    let bookCover;
    const {
      classes,
      book: { title, authors, imageLinks, shelf, previewLink }
    } = this.props;

    //if there is no authors property then label the authors as anonymous
    //otherwise list others separated by a comma
    if (!authors) {
      author = <Typography component="p">by: Anonymous</Typography>;
    } else {
      author = <Typography component="p">by: {authors.join(', ')}</Typography>;
    }
    //if there is no imageLinks property then use a placeholder image
    //otherwise use the imageLinks prop as source for image
    if (!imageLinks) {
      bookCover = <img src="http://via.placeholder.com/180x215" alt={title} />;
    } else {
      bookCover = (
        <img
          src={imageLinks.thumbnail}
          alt={title}
          className={classes.thumbnail}
        />
      );
    }

    return (
      <div>
        <Card className={classes.card}>
          <CardContent className={classes.media}>
            <a href={previewLink}>{bookCover}</a>
          </CardContent>
          <CardContent className={classes.cardContent}>
            <Typography component="h3" className={classes.title}>
              {title}
            </Typography>
            {author}
          </CardContent>
          <CardActions>
            <select
              value={shelf}
              onChange={event => this.shelfSelectChange(event.target.value)}
            >
              <option value="none">Select Shelf...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">Remove from Library</option>
            </select>
          </CardActions>
        </Card>
      </div>
    );
  }
}

Book.propTypes = {
  classes: PropTypes.object.isRequired,
  book: PropTypes.object,
  updateBook: PropTypes.func
};

export default withStyles(styles)(Book);
