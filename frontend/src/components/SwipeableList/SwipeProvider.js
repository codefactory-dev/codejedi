import React from 'react';
import PropTypes from 'prop-types';
import {cursorPosition} from './util';
import {Container, Content, SwipeContent } from './style';

import { withStyles } from '@material-ui/core/styles';



const styles = theme => ({});

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

    onMouseUp = (e) => {
        const maxSwipe = this.props.maxSwipeWidth ? this.props.maxSwipeWidth : this.swipeContainerWidth + 10;
        const translate = cursorPosition(e) < this.containerWidth - maxSwipe ? -maxSwipe : this.state.translate;
        this.startTouchPosition = null;
        this.setState({touching: false, translate});
        this.addEventListenerToMoveAndUp(true);
        console.log(cursorPosition(e), this.state.translate, maxSwipe);
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
                              {...cssProps}
                              >
                    <div ref={sc => { if (sc) {
                                this.swipeContainer = sc
                                this.swipeContainerWidth = sc.getBoundingClientRect().width;
                            }
                        }}>
                        {this.props.swipeComponent}               
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
    maxSwipeWidth: PropTypes.number,
    swipeComponent: PropTypes.node,
    disabled: PropTypes.bool
}
  
SwipeProvider.defaultProps = {
    transitionDuration: 250,
    swipeComponent: undefined,
    disabled: false,
    height: '100%'
}


export default withStyles(styles, { withTheme: true })(SwipeProvider);