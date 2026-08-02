import { Link } from "react-router-dom";
import { Shield, Sparkles, Trophy, Zap, Target, ArrowRight } from "lucide-react";

function Landing() {
  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 selection:bg-indigo-500 selection:text-white flex flex-col justify-between relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/15 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[140px] pointer-events-none rounded-full" />

      {/* Header */}
      <header className="flex h-20 items-center justify-between px-6 md:px-12 border-b border-slate-800/60 backdrop-blur-xl relative z-10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-black tracking-tight text-white">
            PROJECT <span className="text-gradient">: ME</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-semibold text-slate-300 hover:text-white transition">
            Sign In
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-500 transition"
          >
            Start Journey
          </Link>
        </div>
      </header>

      {/* Hero Content */}
      <main className="max-w-5xl mx-auto text-center px-6 py-20 relative z-10 flex-1 flex flex-col justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-bold text-indigo-300 mb-8 backdrop-blur-md">
          <Sparkles size={14} className="text-amber-400 animate-pulse" />
          Gamified Real Life RPG System v2.0
        </div>

        <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-none text-white">
          Become The <br />
          <span className="text-gradient">Main Character</span>
        </h1>

        <p className="mt-8 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Transform your daily habits into an RPG progression system. Complete real-world quests, earn XP, unlock achievements, and level up yourself in real life.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/register">
            <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-indigo-500/25 hover:from-indigo-500 hover:to-purple-500 transition-all hover:scale-105">
              Start Your Journey <ArrowRight size={18} />
            </button>
          </Link>

          <Link to="/login">
            <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/80 px-8 py-4 text-base font-bold text-slate-200 hover:bg-slate-800 hover:text-white transition-all">
              Continue Save File
            </button>
          </Link>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-24 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl transition hover:border-indigo-500/40">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 mb-4 border border-indigo-500/20">
              <Zap size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">Daily Quests</h3>
            <p className="mt-2 text-sm text-slate-400">Complete daily habits to gain experience points and build consistency.</p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl transition hover:border-purple-500/40">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400 mb-4 border border-purple-500/20">
              <Trophy size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">RPG Character</h3>
            <p className="mt-2 text-sm text-slate-400">Level up your character, advance through ranks, and track attribute stats.</p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl transition hover:border-amber-500/40">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 mb-4 border border-amber-500/20">
              <Target size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">Main Quests</h3>
            <p className="mt-2 text-sm text-slate-400">Set multi-stage long-term goals and execute them step by step.</p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl transition hover:border-emerald-500/40">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 mb-4 border border-emerald-500/20">
              <Sparkles size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">The Forge</h3>
            <p className="mt-2 text-sm text-slate-400">Customize custom quests, difficulty levels, and attribute rewards.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 py-6 text-center text-xs text-slate-500 relative z-10">
        Project: ME © 2026 • Level Up Yourself In Real Life
      </footer>
    </div>
  );
}

export default Landing;