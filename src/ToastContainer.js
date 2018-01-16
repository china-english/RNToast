import React, {
  Component
} from 'react'
import PropTypes from 'prop-types'
import {
  ViewPropTypes,
  View,
  Text,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Easing,
  Keyboard,
  TouchableOpacity,
  Platform
} from 'react-native'

const animatedDuration = 200
const {width, height} = Dimensions.get('window')

let styles = {
  defaultStyle: {
    position: 'absolute',
    width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerStyle: {
    padding: 10,
    backgroundColor: 'grey',
    width: width - 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40,
    borderRadius: 5,
  },
  textStyle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  touchableOpacity: {
    backgroundColor: '#61B843',
    marginTop: 20,
    height: 40,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center'
  }
}

class ToastContainer extends Component {

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
    confirmText: PropTypes.string
  };

  static defaultProps = {
    visible: false,
    duration: 3000,
    animation: true,
    opacity: 1,
    delayShow: 0,
    hideOnPress: true,
    confirm: false,
    confirmText: 'ok'
  };

  constructor () {
    super(...arguments)
    this.state = {
      visible: this.props.visible,
      opacity: new Animated.Value(0)
    }
  }

  componentDidMount = () => {
    if (this.state.visible) {
      this.showTimeout = setTimeout(() => this.show(), this.props.delayShow)
    }
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.visible !== this.props.visible) {
      if (nextProps.visible) {
        clearTimeout(this.showTimeout)
        clearTimeout(this.hideTimeout)
        this.showTimeout = setTimeout(() => this.show(), this.props.delayShow)
      } else {
        this.hide()
      }

      this.setState({
        visible: nextProps.visible
      })
    }
  };

  componentWillUnmount = () => {
    this.hide()
  };

  animating = false;
  root = null;
  hideTimeout = null;
  showTimeout = null;

  show = () => {
    clearTimeout(this.showTimeout)
    if (!this.animating) {
      clearTimeout(this.hideTimeout)
      this.animating = true
      this.root.setNativeProps({
        pointerEvents: 'auto'
      })
      this.props.onShow && this.props.onShow(this.props.siblingManager)
      Animated.timing(this.state.opacity, {
        toValue: this.props.opacity,
        duration: this.props.animation ? animatedDuration : 0,
        easing: Easing.out(Easing.ease)
      }).start(({finished}) => {
        if (finished) {
          this.animating = !finished
          this.props.onShown && this.props.onShown(this.props.siblingManager)
          if (this.props.duration > 0 && !this.props.confirm ) {
            this.hideTimeout = setTimeout(() => this.hide(), this.props.duration)
          }
        }
      })
    }
  };

  hide = () => {
    clearTimeout(this.showTimeout)
    clearTimeout(this.hideTimeout)
    if (!this.animating) {
      this.root.setNativeProps({
        pointerEvents: 'none'
      })
      this.props.onHide && this.props.onHide(this.props.siblingManager)
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: this.props.animation ? animatedDuration : 0,
        easing: Easing.in(Easing.ease)
      }).start(({finished}) => {
        if (finished) {
          this.animating = false
          this.props.onHidden && this.props.onHidden(this.props.siblingManager)
        }
      })
    }
  };

  renderModal = (props, position) =>
    <View
      style={[
        styles.defaultStyle,
        position
      ]}
      pointerEvents='box-none'
      >
      <TouchableWithoutFeedback
        onPress={this.props.hideOnPress ? this.hide : null}
        >
        <Animated.View
          style={Object.assign({},
              styles.containerStyle,
              props.containerStyle,
              {opacity: this.state.opacity},

          )}
          pointerEvents='none'
          ref={(ele) => this.root = ele}
          >
          {
            typeof(props.content) === 'string'
            ? <Text style={Object.assign({}, styles.textStyle, props.textStyle)}>{props.children}</Text>
            : props.children
          }
            {props.confirm === true
              ? <TouchableOpacity onPress={this.hide} style={styles.touchableOpacity}>
              <Text>{this.props.confirmText}</Text>
            </TouchableOpacity> : null}
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>

  render () {
    const { props } = this;

    // 正数距离顶部距离，负数距离底部距离， 0居中
    let position = props.position ? {
      [props.position < 0 ? 'bottom' : 'top']: Math.abs(props.position)
    } : {
      top: 20
    }

    return (this.state.visible || this.animating) ? this.renderModal(props, position) : null
  }
}

export default ToastContainer
