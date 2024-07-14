import { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorElement } from './ErrorElement';

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
      return <ErrorElement errorInfo={errorInfo} />;
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
