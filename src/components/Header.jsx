import { useState } from 'react';
import { Menu, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 bg-white/60 backdrop-blur-xl border-b border-slate-200">
      <div className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50"
            onClick={onMenuClick}
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
          <span className="hidden lg:block text-sm text-slate-500">Welcome back</span>
        </div>
        <ProfileMenu />
      </div>
    </header>
  );
}

function ProfileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-rose-300 to-rose-500 text-white grid place-items-center text-sm font-bold">
          JD
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-sm font-semibold leading-4">Jamie Doe</p>
          <p className="text-xs text-slate-500 leading-4">Pro Member</p>
        </div>
        <ChevronDown size={16} className={`text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white shadow-xl overflow-hidden"
            role="menu"
          >
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-slate-50">
              <User size={16} className="text-slate-500" />
              Profile
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-slate-50">
              <Settings size={16} className="text-slate-500" />
              Settings
            </button>
            <div className="my-1 h-px bg-slate-200" />
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-rose-600 hover:bg-rose-50">
              <LogOut size={16} />
              Log out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
