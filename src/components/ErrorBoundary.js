import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render the fallback UI
      return (
        <div className="grid place-items-center">
          <div className="rounded-lg shadow-md ">
            <h1 className="text-2xl font-bold">Oops! Something went wrong.</h1>
            <button className="px-6 py-3 bg-accent rounded-md text-white">
              Go back
            </button>
          </div>
        </div>
      );
    }

    // Render the children components
    return this.props.children;
  }
}

export default ErrorBoundary;
