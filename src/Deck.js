import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;

export default class Deck extends Component {
  static defaultProps = {
      onSwipeLeft: () => {},
      onSwipeRight: () => {}
  };

  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({x: gesture.dx, y: gesture.dy});
      },
      onPanResponderRelease: (event, gesture) => {
        if(gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe('left');
        } else {
          this.resetPosition();
        }
      }
    });
    this.position = position;
    this.state = {panResponder, index: 0};
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data !== this.props.data) {
      this.setState({index: 0});
    }
  }

  componentWillUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  forceSwipe = direction => {
    var directionValue = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(this.position, {
      toValue: {x: directionValue, y: 0},
      duration: 250
    }).start(() => this.onSwipeComplete(direction));
  };

  onSwipeComplete = (direction) => {
    const {onSwipeRight, onSwipeLeft, data} = this.props;
    const item = data[this.state.index];

    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
    this.position.setValue({x:0, y:0});
    this.setState({index: this.state.index + 1});
  };

  getCardStyleProperties = () => {
    const rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['120deg', '0deg', '-120deg']
    });

    return {
      ...this.position.getLayout(),
      transform: [{rotate}]
    };
  };

  renderCard = () => {
    if(this.state.index >= this.props.data.length) {
      return this.props.renderNoMoreCards();
    }
    return this.props.data.map((item, itemIndex) => {
      if(itemIndex < this.state.index) return null;

      if(itemIndex === this.state.index) {
        return (
          <Animated.View
            key={item.id}
            {...this.state.panResponder.panHandlers}
            style={[this.getCardStyleProperties(), styles.cardStyle]}
            >
            {this.props.renderCard(item)}
          </Animated.View>
        );
      }

      return (
        <Animated.View
          style={[styles.cardStyle, {top: 10 * (itemIndex - this.state.index)}]}
          key={item.id}
          >
          {this.props.renderCard(item)}
        </Animated.View>
      );
    }).reverse();
  };

  resetPosition = () => {
    Animated.spring(this.position, {
      toValue: {x: 0, y: 0}
    }).start();
  };

  render () {
    return (
      <View style={{marginTop: 20}}>
        {this.renderCard()}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH
  }
});
