import Spline from '@splinetool/react-spline';

export default function HeroCover() {
  return (
    <section className="relative h-[380px] sm:h-[420px] w-full">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/zhZFnwyOYLgqlLWk/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/70 via-white/20 to-white/70" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/20" />

      <div className="relative h-full flex items-center px-4 sm:px-6 lg:px-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
            Plan less. Accomplish more.
          </h1>
          <p className="mt-3 text-slate-600 max-w-xl">
            A minimalist productivity hub that keeps your tasks, notes, and schedule flowing in perfect harmony.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href="#get-started"
              className="inline-flex items-center justify-center rounded-xl bg-rose-600 text-white px-5 py-2.5 font-semibold shadow-sm hover:bg-rose-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 transition"
            >
              Get Started
            </a>
            <a
              href="#learn-more"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white/80 backdrop-blur px-5 py-2.5 font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 transition"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
