import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line,
} from 'recharts'
import { Building2, FileText, Wrench, DollarSign, ArrowUpRight, ArrowDownRight, Calendar, Clock } from 'lucide-react'
import type { NavigateFn } from '../App'

interface Props { onNavigate: NavigateFn }

const monthlySales = [
  { month: 'Jan', revenue: 145000, deals: 12 },
  { month: 'Feb', revenue: 178000, deals: 15 },
  { month: 'Mar', revenue: 162000, deals: 13 },
  { month: 'Apr', revenue: 195000, deals: 18 },
  { month: 'May', revenue: 183000, deals: 16 },
  { month: 'Jun', revenue: 221000, deals: 20 },
  { month: 'Jul', revenue: 208000, deals: 19 },
  { month: 'Aug', revenue: 245000, deals: 22 },
  { month: 'Sep', revenue: 231000, deals: 21 },
  { month: 'Oct', revenue: 267000, deals: 25 },
  { month: 'Nov', revenue: 252000, deals: 23 },
  { month: 'Dec', revenue: 289000, deals: 27 },
]

const donutData = [
  { name: 'Completed', value: 42, color: '#22C55E' },
  { name: 'In Progress', value: 28, color: '#2563EB' },
  { name: 'Pending', value: 18, color: '#F59E0B' },
  { name: 'At Risk', value: 12, color: '#EF4444' },
]

const spark = (vals: number[]) => vals.map((v, i) => ({ i, v }))

const kpis = [
  {
    title: 'Total Accounts',
    value: '284',
    change: '+12%',
    positive: true,
    icon: Building2,
    color: 'blue',
    sparkData: spark([65, 72, 68, 80, 75, 85, 82, 90, 88, 95, 92, 100]),
    screen: 'accounts' as const,
  },
  {
    title: 'Pending Contracts',
    value: '18',
    change: '-3%',
    positive: false,
    icon: FileText,
    color: 'amber',
    sparkData: spark([22, 20, 24, 21, 19, 22, 20, 18, 21, 19, 18, 18]),
    screen: 'contracts' as const,
  },
  {
    title: 'Active Installations',
    value: '37',
    change: '+8%',
    positive: true,
    icon: Wrench,
    color: 'green',
    sparkData: spark([25, 27, 30, 28, 31, 33, 30, 34, 35, 36, 37, 37]),
    screen: 'installations' as const,
  },
  {
    title: 'Overdue Invoices',
    value: '6',
    change: '+2',
    positive: false,
    icon: DollarSign,
    color: 'red',
    sparkData: spark([2, 3, 2, 4, 3, 4, 5, 4, 6, 5, 6, 6]),
    screen: 'invoices' as const,
  },
]

const activities = [
  { icon: '📝', text: 'Contract CTR-2024-006 signed by Pinnacle Health Systems', time: '2h ago', color: 'green' },
  { icon: '🔔', text: 'Invoice INV-2024-003 overdue – BlueSky Logistics ($9,200)', time: '4h ago', color: 'red' },
  { icon: '✅', text: 'Installation INST-001 completed for Meridian Technologies', time: '5h ago', color: 'blue' },
  { icon: '📦', text: 'Order ORD-2024-004 created for Coastal Energy Group', time: '1d ago', color: 'amber' },
  { icon: '👤', text: 'New contact Thomas Anderson added to Vertex Solutions', time: '1d ago', color: 'purple' },
]

const upcomingEvents = [
  { title: 'Installation – Vertex Solutions', date: 'May 14', time: '10:30 AM', type: 'Install', color: 'bg-blue-500' },
  { title: 'Contract Review – Ironwood Financial', date: 'May 15', time: '02:00 PM', type: 'Meeting', color: 'bg-purple-500' },
  { title: 'Installation – BlueSky Logistics', date: 'May 16', time: '02:00 PM', type: 'Install', color: 'bg-blue-500' },
  { title: 'Invoice Due – Coastal Energy Group', date: 'May 18', time: 'All day', type: 'Finance', color: 'bg-amber-500' },
  { title: 'Onboarding Call – Pinnacle Health', date: 'May 20', time: '11:00 AM', type: 'Call', color: 'bg-green-500' },
]

const colorMap: Record<string, string> = {
  blue: 'bg-blue-50 text-blue-600',
  amber: 'bg-amber-50 text-amber-600',
  green: 'bg-green-50 text-green-600',
  red: 'bg-red-50 text-red-600',
}

export default function DashboardScreen({ onNavigate }: Props) {
  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-700 text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-0.5">Welcome back, Alex. Here's what's happening today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        {kpis.map((kpi) => (
          <button
            key={kpi.title}
            onClick={() => onNavigate(kpi.screen)}
            className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5 text-left hover:border-blue-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group animate-fade-in-up"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${colorMap[kpi.color]}`}>
                <kpi.icon size={18} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-600 ${kpi.positive ? 'text-green-600' : 'text-red-500'}`}>
                {kpi.positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                {kpi.change}
              </div>
            </div>
            <div className="text-3xl font-800 text-slate-900 mb-0.5">{kpi.value}</div>
            <div className="text-xs text-slate-500 mb-3">{kpi.title}</div>
            <div className="h-8">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={kpi.sparkData}>
                  <Line
                    type="monotone"
                    dataKey="v"
                    stroke={kpi.positive ? '#22C55E' : '#EF4444'}
                    strokeWidth={1.5}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </button>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 sm:gap-4">
        {/* Bar chart */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5 hover:shadow-lg transition-shadow duration-300 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-sm font-600 text-slate-900">Monthly Sales Revenue</h2>
              <p className="text-xs text-slate-400 mt-0.5">Annual overview · FY 2024</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-700 text-slate-900">$2.48M</div>
              <div className="text-xs text-green-600 font-500">↑ 18.4% YoY</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlySales} barSize={20}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.7}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 11, fill: '#94A3B8' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenue']}
                contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 12, boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="revenue" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Donut chart */}
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5 hover:shadow-lg transition-shadow duration-300 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="mb-5">
            <h2 className="text-sm font-600 text-slate-900">Onboarding Status</h2>
            <p className="text-xs text-slate-400 mt-0.5">Active accounts · 100 total</p>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={donutData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={2}>
                {donutData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 12, boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {donutData.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                  <span className="text-slate-600">{d.name}</span>
                </div>
                <span className="font-600 text-slate-900">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        {/* Recent activities */}
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5 hover:shadow-lg transition-shadow duration-300 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <h2 className="text-sm font-600 text-slate-900 mb-4">Recent Activities</h2>
          <div className="space-y-3">
            {activities.map((a, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-slate-50 last:border-0">
                <span className="text-base">{a.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-700 leading-relaxed">{a.text}</p>
                </div>
                <div className="text-xs text-slate-400 whitespace-nowrap flex items-center gap-1">
                  <Clock size={11} />
                  {a.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming events */}
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5 hover:shadow-lg transition-shadow duration-300 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-600 text-slate-900">Upcoming Events</h2>
            <button
              onClick={() => onNavigate('calendar')}
              className="text-xs text-blue-600 hover:text-blue-700 font-500"
            >
              View Calendar →
            </button>
          </div>
          <div className="space-y-2.5">
            {upcomingEvents.map((ev, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                <div className={`w-1.5 self-stretch rounded-full ${ev.color}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-500 text-slate-800 truncate">{ev.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{ev.type}</p>
                </div>
                <div className="text-right text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <Calendar size={11} />
                    {ev.date}
                  </div>
                  <div className="text-slate-400 mt-0.5">{ev.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
