import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check initial session
    const checkSession = async () => {
      try {
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Auth timeout")), 2000),
        );
        const sessionPromise = supabase.auth.getSession();

        const {
          data: { session },
        } = await Promise.race([sessionPromise, timeoutPromise]);
        setUser(session?.user ?? null);
      } catch (error) {
        console.warn("Auth check failed or timed out:", error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = (email, password) =>
    supabase.auth.signInWithPassword({ email, password });
  const logout = () => supabase.auth.signOut();

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
