import React, { useEffect } from "react";
import { useRealtime } from "../hooks/useRealtime";
import { sectionReveal } from "../animations/animePresets";

const Testimonials = () => {
  const { data: testimonials, loading } = useRealtime("testimonials");

  useEffect(() => {
    sectionReveal(".testimonial-item");
  }, [loading, testimonials]);

  return (
    <section className="bg-mesh border border-white/10 rounded-[2.5rem] md:rounded-[4rem] my-16 md:my-32 overflow-hidden py-16 md:py-32 px-6 md:px-12">
      <div className="text-center mb-16 md:mb-24">
        <h2 className="text-3xl md:text-5xl lg:text-7xl font-black mb-6 tracking-tighter text-slate-900 dark:text-white">
          Client <span className="text-glow text-primary-light">Visions</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Partners who bridged their vision through direct collaboration with
          our independent specialists.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {loading
          ? [1, 2, 3].map((i) => (
              <div key={i} className="h-64 glass animate-pulse rounded-3xl" />
            ))
          : testimonials.map((t) => (
              <div
                key={t.id}
                className="testimonial-item glass hover:bg-white/5 transition-all duration-700 hover:scale-[1.02] hover:-translate-y-2 p-6 md:p-10 rounded-[2.5rem] border-l-8 border-primary-light relative opacity-0 hover:shadow-[0_20px_40px_-15px_rgba(0,255,204,0.15)] group"
              >
                <div className="absolute top-6 right-8 text-6xl font-serif text-primary-light/10">
                  "
                </div>
                <p className="text-slate-200 text-lg mb-8 leading-relaxed font-medium">
                  {t.review}
                </p>
                <div className="flex items-center">
                  <div className="w-14 h-14 bg-linear-to-br from-primary-light to-secondary-light rounded-2xl flex items-center justify-center text-white font-black text-2xl mr-4 uppercase shadow-lg shadow-primary-light/30">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 dark:text-white text-lg tracking-tight">
                      {t.name}
                    </h4>
                    <p className="text-sm font-bold text-primary-light uppercase tracking-widest">
                      {t.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
};

const Team = () => {
  const { data: team, loading, error } = useRealtime("team");

  console.log("Team fetch error:", error);
  console.log("Team fetch data:", team);

  useEffect(() => {
    sectionReveal(".team-item");
  }, [loading, team]);

  return (
    <section className="py-16 md:py-32">
      <div className="text-center mb-16 md:mb-24">
        <h2 className="text-3xl md:text-5xl lg:text-7xl font-black mb-6 tracking-tighter text-slate-900 dark:text-white">
          Independent <span className="text-secondary-light">Masters</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">
          A collective of obsessive engineers and visionary designers dedicated
          to your growth.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {loading && !error ? (
          [1, 2, 3, 4].map((i) => (
            <div key={i} className="h-100 glass animate-pulse rounded-[3rem]" />
          ))
        ) : error ? (
          <div className="col-span-full p-8 text-red-500 glass rounded-2xl text-center">
            Error fetching team: {error.message || JSON.stringify(error)}
          </div>
        ) : team.length === 0 ? (
          <div className="col-span-full p-8 text-slate-400 glass rounded-2xl text-center">
            No team members found in the database.
          </div>
        ) : (
          team.map((m) => (
            <div key={m.id} className="team-item group text-center opacity-0">
              <div className="relative mb-8 inline-block">
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-[3rem] overflow-hidden border-4 border-white/10 shadow-2xl group-hover:rotate-6 transition-all duration-700 group-hover:scale-110 group-hover:rounded-2xl group-hover:shadow-[0_0_40px_rgba(0,255,204,0.3)]">
                  <img
                    src={
                      m.image_url ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${m.name}`
                    }
                    alt={m.name}
                    className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-normal duration-1000 scale-100 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 rounded-[3rem] bg-primary-light/20 blur opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              </div>
              <h3 className="text-2xl font-black mb-2 tracking-tighter">
                {m.name}
              </h3>
              <p className="text-primary-light text-xs font-black uppercase tracking-[0.3em]">
                {m.role}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export { Testimonials, Team };
