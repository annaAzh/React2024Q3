import { Component } from 'react';
import style from './ErrorButton.module.scss';

interface ErrorButtonProps {}
interface ErrorButtonState {
  error: Error | null;
}

class ErrorButton extends Component<ErrorButtonProps, ErrorButtonState> {
  constructor(props: ErrorButtonProps) {
    super(props);
    this.state = {
      error: null,
    };
  }

  handleCustomError = () => {
    this.setState({ error: new Error('Custom error triggered') });
  };

  componentDidUpdate(_prevProps: Readonly<ErrorButtonProps>, prevState: Readonly<ErrorButtonState>): void {
    if (prevState.error !== this.state.error) {
      throw this.state.error;
    }
  }

  render() {
    return (
      <button className={style.error_btn} onClick={this.handleCustomError}>
        Error
      </button>
    );
  }
}

export { ErrorButton };
