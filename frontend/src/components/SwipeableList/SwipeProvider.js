import React from 'react';
import PropTypes from 'prop-types';
import {cursorPosition} from './helper';
import {Container, Content, SwipeContent } from './styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import editIcon from '../../icons/edit.svg';
import deleteIcon from '../../icons/delete.svg';

const styles = theme => ({
    button: {
      minWidth: '0',
      width: '48px',
      height: '48px',
      margin: '0 10px',
      padding: '0',
      border: `1.5px solid ${theme.palette.primary.main}`,
      borderRadius: '5px',
      '& img': {
          width: '70%',
      },
      '& .icon': {
        fill: 'black'
      }
    }
});

class SwipeProvider extends React.Component {
    
    state = {
        touching: null,
        translate: 0,
    }

    componentDidMount() {
        this.forceUpdate() // to get ref dimensions
    }

    componentWillUnmount() {
        this.addEventListenerToMoveAndUp(true)
    }

    // ------------------------------------
    // EVENT LISTENERS
    // ------------------------------------

    onMouseDown = (e) => {
        if (this.props.disabled) return;
        if (this.state.touching) return;

        this.startTouchPosition = cursorPosition(e);
        this.initTranslate = this.state.translate;
        this.setState({ touching: true }, () => this.addEventListenerToMoveAndUp());
    }

    onMouseMove = (e) => {
        if (!this.state.touching) return
        cursorPosition(e)
        if (cursorPosition(e) > this.startTouchPosition - this.initTranslate) {
          this.setState({ translate: 0 })
          return;
        }
        this.setState({ translate: cursorPosition(e) - this.startTouchPosition + this.initTranslate });
    };

    onMouseUp = () => {
        this.startTouchPosition = null;
        this.setState({touching: false});
        this.addEventListenerToMoveAndUp(true);
    }

    addEventListenerToMoveAndUp = (remove = false) => {
        if (remove) {
          window.removeEventListener('mousemove', this.onMouseMove);
          window.removeEventListener('touchmove', this.onMouseMove);
          window.removeEventListener('mouseup', this.onMouseUp);
          window.removeEventListener('touchend', this.onMouseUp);
        } else {
          window.addEventListener('mousemove', this.onMouseMove);
          window.addEventListener('touchmove', this.onMouseMove);
          window.addEventListener('mouseup', this.onMouseUp);
          window.addEventListener('touchend', this.onMouseUp);
        }
    }

    render() {
        const {classes} = this.props;
        const cssProps = {transitionDuration: 5, height: this.props.height};

        return (
            this.props.disabled
            ?
            this.props.children
            :
            <Container {...cssProps}
                        ref={c => { if (c) {
                                this.container = c
                                this.containerWidth = c.getBoundingClientRect().width;
                            }
                        }}>
                <SwipeContent translate={this.state.translate}
                              transition={!this.state.touching}
                              buttonMarginLeft={-this.state.translate}
                              {...cssProps}>
                    <div>
                        <Button variant="outlined" className={classes.button}>
                            <img src={editIcon} alt="edit icon" />
                        </Button>
                        <Button variant="outlined" className={classes.button}>
                            <img src={deleteIcon} alt="delete icon" />
                        </Button>                        
                    </div>
                </SwipeContent>
                <Content    onMouseDown={this.onMouseDown} onTouchStart={this.onMouseDown}
                            translate={this.state.translate}
                            transition={!this.state.touching}
                            {...cssProps}>   
                    <div>
                        {this.props.children}
                    </div>
                </Content>
            </Container>         
        );
    }
}

SwipeProvider.propTypes = {
    height: PropTypes.string,
    transitionDuration: PropTypes.number,
    swipeComponentWidth: PropTypes.number,
    swipeComponent: PropTypes.node,
    disabled: PropTypes.bool
}
  
SwipeProvider.defaultProps = {
    transitionDuration: 250,
    swipeComponentWidth: 75,
    swipeComponent: undefined,
    disabled: false,
    height: '100%'
}


export default withStyles(styles, { withTheme: true })(SwipeProvider);