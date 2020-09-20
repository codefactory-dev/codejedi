import React from 'react';
import PropTypes from 'prop-types';
import {cursorPosition} from './helper';
import {Container, Content, SwipeContent } from './styles';


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
        const cssProps = {transitionDuration: 5, height: this.props.height};

        return (
            <Container {...cssProps}
                        ref={c => {
                            if (c) {
                            this.container = c
                            this.containerWidth = c.getBoundingClientRect().width;
                            }
                        }}>
                <SwipeContent translate={this.state.translate}
                              transition={!this.state.touching}
                              buttonMarginLeft={this.containerWidth + this.state.translate}
                              {...cssProps}>
                    <div>swipe</div>
                </SwipeContent>
                <Content    onMouseDown={this.onMouseDown} onTouchStart={this.onMouseDown}
                            translate={this.state.translate}
                            transition={!this.state.touching}
                            {...cssProps}>   
                    <div>
                        list item
                    </div>
                </Content>
            </Container>
        );
    }
}

SwipeProvider.propTypes = {
    onSwipe: PropTypes.func.isRequired,
    height: PropTypes.number.isRequired,
    transitionDuration: PropTypes.number,
    swipeComponentWidth: PropTypes.number,
    swipeComponent: PropTypes.node,
    disabled: PropTypes.bool
}
  
SwipeProvider.defaultProps = {
    transitionDuration: 250,
    swipeComponentWidth: 75,
    disabled: false
}


export default SwipeProvider;