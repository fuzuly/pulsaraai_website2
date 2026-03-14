import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-white bg-slate-950 text-slate-900 text-white flex items-center justify-center p-6">
          <div className="text-center max-w-2xl">
            <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
            <p className="text-slate-600 text-gray-400 mb-4">
              {this.state.error?.message || 'An error occurred'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Reload Page
            </button>
            <pre className="mt-6 text-left text-sm bg-slate-100 bg-slate-800 p-4 rounded overflow-auto">
              {this.state.error?.stack}
            </pre>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

