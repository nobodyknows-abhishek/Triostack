import React from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 dark:bg-mesh flex items-center justify-center p-6 text-slate-900 dark:text-white">
          <div className="glass p-12 rounded-[3.5rem] max-w-2xl w-full text-center border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

            <div className="w-24 h-24 bg-red-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-red-500/20 shadow-lg shadow-red-500/10">
              <AlertTriangle className="w-12 h-12 text-red-500 animate-pulse" />
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">
              System <span className="text-red-500 text-glow">Disruption.</span>
            </h1>

            <p className="text-slate-400 text-lg font-medium mb-10 leading-relaxed">
              Our digital engines encountered an unexpected anomaly. The vision
              remains intact, but this section is currently recalibrating.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => window.location.reload()}
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all border border-white/10"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Initialize Reset</span>
              </button>

              <a
                href="/"
                className="flex items-center space-x-2 bg-primary-light hover:bg-primary-dark px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-primary-light/20"
              >
                <Home className="w-4 h-4" />
                <span>Return to Base</span>
              </a>
            </div>

            {process.env.NODE_ENV === "development" && (
              <div className="mt-12 p-6 bg-black/40 rounded-2xl text-left overflow-auto max-h-48 border border-white/5">
                <p className="text-red-400 font-mono text-xs mb-2 uppercase tracking-widest ">
                  Diagnostic Log:
                </p>
                <pre className="text-slate-500 font-mono text-xs">
                  {this.state.error?.toString()}
                </pre>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
