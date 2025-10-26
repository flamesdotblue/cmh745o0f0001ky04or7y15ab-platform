import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, CheckCircle2, Clock, Calendar, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const metrics = useMemo(
    () => [
      {
        label: 'Tasks Completed',
        value: 42,
        icon: CheckCircle2,
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
      },
      { label: 'Active Tasks', value: 9, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
      { label: 'Upcoming Events', value: 3, icon: Calendar, color: 'text-sky-600', bg: 'bg-sky-50' },
      { label: 'Overdue', value: 2, icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
    ],
    []
  );

  return (
    <div className="space-y-8">
      <MetricCards metrics={metrics} />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <AnalyticsCard />
          <TaskBoard />
        </div>
        <div className="xl:col-span-1">
          <QuickTask />
        </div>
      </div>
    </div>
  );
}

function MetricCards({ metrics }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          className="rounded-2xl border border-slate-200 bg-white p-4"
        >
          <div className="flex items-center gap-3">
            <div className={`h-10 w-10 rounded-xl grid place-items-center ${m.bg}`}>
              <m.icon className={m.color} size={18} />
            </div>
            <div>
              <p className="text-xs text-slate-500">{m.label}</p>
              <p className="text-xl font-bold text-slate-900">{m.value}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function AnalyticsCard() {
  const data = [4, 6, 5, 8, 11, 9, 13, 12, 16, 14, 18, 20];
  const max = Math.max(...data) + 2;
  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - (d / max) * 100;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-semibold">Weekly Progress</p>
          <p className="text-xs text-slate-500">Completed tasks over time</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="inline-flex h-2 w-2 rounded-full bg-rose-500" />
          Tasks
        </div>
      </div>

      <div className="relative">
        <svg viewBox="0 0 100 100" className="w-full aspect-[3/1]">
          <defs>
            <linearGradient id="line" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#fb7185" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#fb7185" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polyline
            fill="none"
            stroke="#fb7185"
            strokeWidth="1.5"
            points={points}
            vectorEffect="non-scaling-stroke"
          />
          <polygon
            points={`0,100 ${points} 100,100`}
            fill="url(#line)"
            opacity="0.8"
          />
        </svg>
      </div>
    </div>
  );
}

function TaskBoard() {
  const initial = [
    { id: 1, title: 'Wireframe dashboard', priority: 'High', due: '2025-10-30', completed: false },
    { id: 2, title: 'Write meeting notes', priority: 'Low', due: '2025-11-01', completed: false },
    { id: 3, title: 'Plan Q4 roadmap', priority: 'Medium', due: '2025-11-05', completed: true },
  ];
  const [tasks, setTasks] = useState(initial);

  const toggleComplete = (id) => {
    setTasks((t) => t.map((x) => (x.id === id ? { ...x, completed: !x.completed } : x)));
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-semibold">Your Tasks</p>
          <p className="text-xs text-slate-500">Stay on top of your day</p>
        </div>
      </div>
      <ul className="divide-y divide-slate-100">
        {tasks.map((t) => (
          <li key={t.id} className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleComplete(t.id)}
                className={`h-5 w-5 rounded-full border transition-colors ${
                  t.completed ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 hover:border-slate-400'
                }`}
                aria-label={t.completed ? 'Mark as incomplete' : 'Mark as complete'}
              />
              <div>
                <p className={`text-sm ${t.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>{t.title}</p>
                <p className="text-xs text-slate-500 mt-0.5">Due {new Date(t.due).toLocaleDateString()}</p>
              </div>
            </div>
            <span
              className={`text-xs px-2 py-1 rounded-full border ${
                t.priority === 'High'
                  ? 'text-rose-700 bg-rose-50 border-rose-200'
                  : t.priority === 'Medium'
                  ? 'text-amber-700 bg-amber-50 border-amber-200'
                  : 'text-sky-700 bg-sky-50 border-sky-200'
              }`}
            >
              {t.priority}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function QuickTask() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [touched, setTouched] = useState({ title: false, date: false });
  const [saved, setSaved] = useState(false);

  const errors = {
    title: !title || title.trim().length < 3 ? 'Title must be at least 3 characters' : '',
    date: !date ? 'Please choose a due date' : '',
  };
  const hasErrors = Boolean(errors.title || errors.date);

  const onSubmit = (e) => {
    e.preventDefault();
    setTouched({ title: true, date: true });
    if (!hasErrors) {
      setSaved(true);
      setTitle('');
      setDate('');
      setPriority('Medium');
      setTimeout(() => setSaved(false), 1600);
    }
  };

  return (
    <div id="get-started" className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="mb-4">
        <p className="text-sm font-semibold">Quick Add</p>
        <p className="text-xs text-slate-500">Create a task in seconds</p>
      </div>
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, title: true }))}
            className={`w-full rounded-xl border px-3 py-2.5 text-sm bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition ${
              touched.title && errors.title
                ? 'border-rose-300 focus:ring-rose-200'
                : 'border-slate-300 focus:ring-rose-200 focus:border-rose-300'
            }`}
            placeholder="e.g. Prepare weekly report"
            aria-invalid={Boolean(touched.title && errors.title)}
            aria-describedby="title-error"
          />
          {touched.title && errors.title && (
            <p id="title-error" className="mt-1 text-xs text-rose-600">{errors.title}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Due date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, date: true }))}
              className={`w-full rounded-xl border px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 transition ${
                touched.date && errors.date
                  ? 'border-rose-300 focus:ring-rose-200'
                  : 'border-slate-300 focus:ring-rose-200 focus:border-rose-300'
              }`}
              aria-invalid={Boolean(touched.date && errors.date)}
              aria-describedby="date-error"
            />
            {touched.date && errors.date && (
              <p id="date-error" className="mt-1 text-xs text-rose-600">{errors.date}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>

        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ y: 0 }}
          type="submit"
          className="inline-flex items-center gap-2 rounded-xl bg-rose-600 text-white px-4 py-2.5 text-sm font-semibold shadow-sm hover:bg-rose-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
        >
          <Plus size={16} />
          Add Task
        </motion.button>
        {saved && <p className="text-xs text-emerald-600">Task added successfully!</p>}
      </form>
    </div>
  );
}
