import React from 'react';
import PropTypes from 'prop-types';
import {
  ViewPropTypes,
  View,
  Text,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Easing,
  TouchableOpacity,
  Platform,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const isIOS = Platform.OS === 'ios';
const isIphoneX = isIOS && (height === 812 || width === 812);
const animatedDuration = 200;

const styles = {
  defaultStyle: {
    position: 'absolute',
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerStyle: {
    padding: 10,
    width: width - 40,
    marginHorizontal: 40,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 16,
    color: '#fff',
  },
  textStyleWithButton: {
    fontSize: 16,
    color: '#fff',
    width: width - 120,
  },
  confirmStyle: {
    backgroundColor: 'transparent',
    marginLeft: 10,
    width: 50,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#fff',
  },
  confirmTextStyle: {
    color: '#fff',
  },
};
const colors = {
  default: '#999999',
  success: '#5cb85c',
  info: '#62B1F6',
  error: '#d9534f',
  warning: '#f0ad4e',
};

class ToastContainer extends React.Component {
  static propTypes = {
    ...ViewPropTypes,
    containerStyle: ViewPropTypes.style,
    duration: PropTypes.number,
    visible: PropTypes.bool,
    position: PropTypes.number,
    animation: PropTypes.bool,
    opacity: PropTypes.number,
    textStyle: Text.propTypes.style,
    delayShow: PropTypes.number,
    hideOnPress: PropTypes.bool,
    onHide: PropTypes.func,
    onHidden: PropTypes.func,
    onShow: PropTypes.func,
    onShown: PropTypes.func,
    confirm: PropTypes.bool,
    confirmStyle: ViewPropTypes.style,
    confirmText: PropTypes.string,
    confirmTextStyle: Text.propTypes.style,
    type: PropTypes.string,
  };

  static defaultProps = {
    containerStyle: null,
    visible: false,
    position: isIphoneX ? 44 : 20,
    duration: 3000,
    animation: true,
    opacity: 1,
    textStyle: null,
    delayShow: 0,
    hideOnPress: true,
    onHide: () => null,
    onHidden: () => null,
    onShow: () => null,
    onShown: () => null,
    confirm: false,
    confirmText: 'ok',
    confirmStyle: null,
    confirmTextStyle: null,
    type: '',
  };

  animating = false;
  root = null;
  hideTimeout = null;
  showTimeout = null;

  constructor(props) {
    super(props);
    const { visible } = this.props;
    this.state = {
      visible,
      opacity: new Animated.Value(0),
    };
  }

  componentDidMount() {
    const { delayShow } = this.props;
    const { visible } = this.state;
    if (visible) {
      this.showTimeout = setTimeout(() => this.show(), delayShow);
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const { visible, delayShow } = this.props;

    if (nextProps.visible !== visible) {
      if (nextProps.visible) {
        clearTimeout(this.showTimeout);
        clearTimeout(this.hideTimeout);
        this.showTimeout = setTimeout(() => this.show(), delayShow);
      } else {
        this.hide();
      }

      this.setState({ visible: nextProps.visible });
    }
  };

  componentWillUnmount() {
    this.hide();
  }

  show = () => {
    const {
      onShow, siblingManager: PropSiblingManager, opacity: PropOpacity,
      onShown,
      animation, duration, confirm,
    } = this.props;
    const { opacity } = this.state;

    clearTimeout(this.showTimeout);
    if (!this.animating) {
      clearTimeout(this.hideTimeout);
      this.animating = true;
      this.root.setNativeProps({
        pointerEvents: 'auto',
      });
      if (onShow) onShow(PropSiblingManager);
      Animated.timing(opacity, {
        toValue: PropOpacity,
        duration: animation ? animatedDuration : 0,
        easing: Easing.out(Easing.ease),
      }).start(({ finished }) => {
        if (finished) {
          this.animating = !finished;
          if (onShown) onShown(PropSiblingManager);
          if (duration > 0 && !confirm) {
            this.hideTimeout = setTimeout(() => this.hide(), duration);
          }
        }
      });
    }
  };

  hide = () => {
    const {
      onHide, siblingManager, animation,
      onHidden,
    } = this.props;
    const { opacity } = this.state;
    clearTimeout(this.showTimeout);
    clearTimeout(this.hideTimeout);
    if (!this.animating) {
      this.root.setNativeProps({
        pointerEvents: 'none',
      });
      if (onHide) onHide(siblingManager);
      Animated.timing(opacity, {
        toValue: 0,
        duration: animation ? animatedDuration : 0,
        easing: Easing.in(Easing.ease),
      }).start(({ finished }) => {
        if (finished) {
          this.animating = false;
          if (onHidden) onHidden(siblingManager);
        }
      });
    }
  };

  renderModal = (position) => {
    const {
      hideOnPress,
      confirm, duration,
      confirmText, type, content,
      containerStyle, textStyle, confirmStyle, confirmTextStyle,
      children,
    } = this.props;
    const {
      opacity,
    } = this.state;
    return (
      <View
        style={[
          styles.defaultStyle,
          position,
        ]}
        pointerEvents="box-none"
      >
        <TouchableWithoutFeedback
          onPress={hideOnPress ? this.hide : null}
        >
          <Animated.View
            style={Object.assign({},
              styles.containerStyle,
              containerStyle,
              { opacity },
              { backgroundColor: colors[type] || colors.default })}
            pointerEvents="none"
            ref={(ele) => { if (ele) this.root = ele; }}
          >
            {
              typeof content === 'string'
                ? <Text allowFontScaling={false} style={Object.assign({}, textStyle, (confirm === true || duration <= 0) ? styles.textStyleWithButton : styles.textStyle)}>{children}</Text>
                : children
            }
            {(confirm === true) || (duration <= 0)
              ? (
                <TouchableOpacity
                  onPress={this.hide}
                  style={[styles.confirmStyle, confirmStyle]}
                >
                  <Text
                    allowFontScaling={false}
                    style={[styles.confirmTextStyle, confirmTextStyle]}
                  >
                    {confirmText}
                  </Text>
                </TouchableOpacity>
              ) : null}
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
  render() {
    const { position: propPosition } = this.props;
    const { visible } = this.state;

    // 正数距离顶部距离，负数距离底部距离， 0居中
    const position = propPosition ? {
      [propPosition < 0 ? 'bottom' : 'top']: Math.abs(propPosition),
    } : {
      top: isIphoneX ? 44 : 20,
    };

    return (visible || this.animating) ? this.renderModal(position) : null;
  }
}

export default ToastContainer;
