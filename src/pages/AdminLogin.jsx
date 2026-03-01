import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, Loader2 } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: loginError } = await login(email, password);

    if (loginError) {
      setError(loginError.message);
      setLoading(false);
    } else {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-50 dark:bg-dark p-4">
      <div className="w-full max-w-md glass p-8 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 bg-primary-light/10 text-primary-light rounded-bl-3xl">
          <Lock className="w-6 h-6" />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Portal</h1>
          <p className="text-slate-500">Secure access for site management.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 pl-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-transparent focus:ring-2 focus:ring-primary-light outline-none transition-all"
                placeholder="admin@triostack.tech"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 pl-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-transparent focus:ring-2 focus:ring-primary-light outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-4 rounded-xl">
              {error}
            </div>
          )}

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-primary-light hover:bg-primary-dark text-dark font-bold py-4 rounded-2xl transition-all flex items-center justify-center disabled:opacity-50 shadow-xl shadow-primary-light/20"
          >
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              "Log In to Dashboard"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
