import React, { Component } from 'react';
import RootSiblings from 'react-native-root-siblings';
import ToastContainer, { durations } from './ToastContainer';

class Toast extends Component {
  static displayName = 'Toast';
  static propTypes = ToastContainer.propTypes;
  static durations = durations;

  static show = (props) => new RootSiblings(<ToastContainer
    {...props}
    visible={true}
  >{props.content}</ToastContainer>
  );

  static hide = (toast) => {
    if (toast instanceof RootSiblings) {
      toast.destroy();
    } else {
      console.warn(`Toast.hide expected a \`RootSiblings\` instance as argument.\nBut got \`${typeof toast}\` instead.`);
    }
  };

  toast = null;

  componentWillMount = () => {
    this.toast = new RootSiblings(<ToastContainer
      {...this.props}
      duration={0}
    />);
  };

  componentWillReceiveProps = (nextProps) => {
    this.toast.update(<ToastContainer
      {...nextProps}
      duration={0}
    />);
  };

  componentWillUnmount = () => {
    this.toast.destroy();
  };

  render() {
    return null;
  }
}

export { RootSiblings as Manager};
export default Toast;
