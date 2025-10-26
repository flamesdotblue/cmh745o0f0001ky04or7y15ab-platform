import { motion } from 'framer-motion';
import { CheckSquare, Calendar, StickyNote, Settings, Rocket } from 'lucide-react';

const navItems = [
  { name: 'Tasks', icon: CheckSquare },
  { name: 'Calendar', icon: Calendar },
  { name: 'Notes', icon: StickyNote },
  { name: 'Settings', icon: Settings },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -320 }}
        animate={{ x: open ? 0 : -320 }}
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
        className="fixed inset-y-0 left-0 z-50 w-72 bg-white/80 backdrop-blur-xl border-r border-slate-200 hidden lg:flex flex-col"
      >
        <SidebarContent />
      </motion.aside>

      {/* Mobile Drawer */}
      <motion.aside
        initial={false}
        animate={{ x: open ? 0 : -320 }}
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
        className="fixed inset-y-0 left-0 z-50 w-72 bg-white/95 backdrop-blur-xl border-r border-slate-200 lg:hidden"
        role="dialog"
        aria-modal="true"
      >
        <SidebarContent onClose={onClose} />
      </motion.aside>
    </>
  );
}

function SidebarContent({ onClose }) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-3 px-5 h-16 border-b border-slate-200">
        <div className="h-9 w-9 grid place-items-center rounded-xl bg-rose-100 text-rose-600">
          <Rocket size={18} />
        </div>
        <div>
          <p className="font-semibold tracking-tight">FlowGrid</p>
          <p className="text-xs text-slate-500 -mt-1">Focus. Plan. Achieve.</p>
        </div>
      </div>

      <nav className="px-3 py-3 space-y-1">
        {navItems.map(({ name, icon: Icon }) => (
          <button
            key={name}
            onClick={onClose}
            className="w-full group flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-rose-50 hover:text-rose-700 transition-colors"
          >
            <span className="h-9 w-9 rounded-lg grid place-items-center bg-slate-100 text-slate-600 group-hover:bg-rose-100 group-hover:text-rose-700 transition-colors">
              <Icon size={18} />
            </span>
            <span>{name}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto p-4">
        <div className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-200">
          <p className="text-sm font-medium">Need a nudge?</p>
          <p className="text-xs text-slate-500 mt-1">Create a quick task and keep momentum.</p>
          <button className="mt-3 inline-flex items-center justify-center px-3 py-2 rounded-lg bg-rose-600 text-white text-sm font-semibold hover:bg-rose-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 transition-colors w-full">
            New Task
          </button>
        </div>
      </div>
    </div>
  );
}
