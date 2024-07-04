import { Component, ErrorInfo, ReactNode } from 'react';
import style from './ErrorBoundary.module.css';

interface ErrorBoundaryProps {
  children?: ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
  errorInfo: null | string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorInfo: error.message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      errorInfo: error.message,
    });
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    const { hasError, errorInfo } = this.state;

    if (hasError) {
      return (
        <div className={style.error_block}>
          <h1 className={style.title}>Somethig wrong is going...</h1>
          <p className={style.title}>{errorInfo}</p>
          <button className={style.reload_btn} onClick={() => location.reload()}>
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
