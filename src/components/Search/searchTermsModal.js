import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import { Button, Typography } from 'material-ui';

import { searchTerms } from '../../SearchTerms';

const styles = theme => ({
  backdrop: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 20
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 5,
    width: '80%',
    maxHeight: '70%',
    margin: '0 auto',
    marginTop: '20%',
    padding: 20,
    textAlign: 'center',
    overflowY: 'auto'
  },
  closeButtonContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  searchTermsList: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'auto',
    paddingTop: 20,
    paddingBottom: 20
  },
  term: {
    paddingRight: 15,
    lineHeight: 0
  }
});

class SearchTermsModal extends React.Component {
  render() {
    const { classes, onClose, show, children } = this.props;
    // Render nothing if the "show" prop is false
    if (!show) {
      return null;
    }

    return (
      <div className={classes.backdrop}>
        <div className={classes.modal}>
          <Typography variant="display1" component="h2">
            Search Terms
          </Typography>
          <div className={classes.searchTermsList}>
            {searchTerms.map(term => (
              <p key={searchTerms.indexOf(term)} className={classes.term}>
                - {term}
              </p>
            ))}
          </div>
          <div className={classes.closeButtonContainer}>
            <Button onClick={onClose} variant="raised" color="primary">
              Close
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

SearchTermsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchTermsModal);
