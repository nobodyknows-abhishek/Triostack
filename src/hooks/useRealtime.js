import React, { useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";
import fallbackData from "../data/fallbackData.json";

const useRealtime = (table, query = "*") => {
  const [data, setData] = useState(() => {
    try {
      const cached = localStorage.getItem(`triostack_cache_${table}`);
      if (cached) return JSON.parse(cached);
      if (fallbackData[table]) return fallbackData[table];
      return [];
    } catch {
      return fallbackData[table] || [];
    }
  });

  const [loading, setLoading] = useState(() => {
    try {
      const hasCache = !!localStorage.getItem(`triostack_cache_${table}`);
      const hasFallback = !!fallbackData[table];
      return !(hasCache || hasFallback);
    } catch {
      return !fallbackData[table];
    }
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: initialData, error: fetchError } = await supabase
          .from(table)
          .select(query)
          .order("created_at", { ascending: false });

        if (fetchError) throw fetchError;

        setData(initialData || []);
        localStorage.setItem(
          `triostack_cache_${table}`,
          JSON.stringify(initialData || []),
        );
        setError(null);
      } catch (err) {
        console.error(
          `[useRealtime] Error fetching from ${table}. Using fallback cache.`,
          err,
        );
        // If fetch fails, ensure we're at least serving the fallback if not already
        setData((prev) => (prev.length > 0 ? prev : fallbackData[table] || []));
        // We choose not to set setError here so the UI doesn't visually break,
        // since we successfully recovered with fallback data
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Subscribe to changes
    const channel = supabase
      .channel(`${table}_realtime`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: table },
        (payload) => {
          console.log("Realtime change received:", payload);

          if (payload.eventType === "INSERT") {
            setData((prev) => [payload.new, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            setData((prev) =>
              prev.map((item) =>
                item.id === payload.new.id ? payload.new : item,
              ),
            );
          } else if (payload.eventType === "DELETE") {
            setData((prev) =>
              prev.filter((item) => item.id === payload.old.id),
            );
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, query]);

  return { data, loading, error };
};

export { useRealtime };
export default useRealtime;
