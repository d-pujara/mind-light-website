import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div style={{ padding: '2rem', textAlign: 'center', background: '#f5f5f5', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <h1 style={{ color: '#4E3629' }}>Something went wrong.</h1>
                    <p style={{ maxWidth: '600px', margin: '1rem auto' }}>
                        We're sorry for the inconvenience. Please refresh the page or try again later.
                    </p>
                    <details style={{ marginTop: '2rem', textAlign: 'left', background: '#fff', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                        <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Error Details</summary>
                        <pre style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'red', overflowX: 'auto' }}>
                            {this.state.error && this.state.error.toString()}
                        </pre>
                        <pre style={{ fontSize: '0.8rem', color: '#666' }}>
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </pre>
                    </details>
                    <button
                        onClick={() => window.location.reload()}
                        style={{ marginTop: '2rem', padding: '1rem 2rem', background: '#4E3629', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Refresh Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
