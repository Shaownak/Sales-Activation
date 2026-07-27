import { useState } from 'react'
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import { Download, Calendar } from 'lucide-react'
import type { NavigateFn } from '../App'

interface Props { onNavigate: NavigateFn }

const salesTrend = [
  { month: 'Jan', revenue: 145000, target: 130000 },
  { month: 'Feb', revenue: 178000, target: 150000 },
  { month: 'Mar', revenue: 162000, target: 155000 },
  { month: 'Apr', revenue: 195000, target: 170000 },
  { month: 'May', revenue: 183000, target: 175000 },
  { month: 'Jun', revenue: 221000, target: 190000 },
  { month: 'Jul', revenue: 208000, target: 195000 },
  { month: 'Aug', revenue: 245000, target: 210000 },
  { month: 'Sep', revenue: 231000, target: 215000 },
  { month: 'Oct', revenue: 267000, target: 230000 },
  { month: 'Nov', revenue: 252000, target: 235000 },
  { month: 'Dec', revenue: 289000, target: 250000 },
]

const installerPerformance = [
  { name: 'Carlos Reyes', completed: 12, issues: 1 },
  { name: 'Angela Park', completed: 10, issues: 2 },
  { name: 'Marcus Allen', completed: 8, issues: 1 },
  { name: 'Diana Foster', completed: 9, issues: 0 },
  { name: 'Kevin Torres', completed: 7, issues: 3 },
]

const orderStatusData = [
  { name: 'Completed', value: 42, color: '#22C55E' },
  { name: 'In Progress', value: 24, color: '#2563EB' },
  { name: 'Pending', value: 18, color: '#F59E0B' },
  { name: 'Cancelled', value: 8, color: '#EF4444' },
]

const topAccounts = [
  { name: 'Pinnacle Health Systems', revenue: '$214,800', growth: '+22%', positive: true },
  { name: 'Ironwood Financial', revenue: '$156,000', growth: '+18%', positive: true },
  { name: 'Meridian Technologies', revenue: '$124,000', growth: '+15%', positive: true },
  { name: 'Vertex Solutions', revenue: '$89,500', growth: '+9%', positive: true },
  { name: 'Coastal Energy Group', revenue: '$67,200', growth: '-4%', positive: false },
]

export default function ReportsScreen({ onNavigate }: Props) {
  const [dateRange, setDateRange] = useState('2024')

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-700 text-slate-900">Reports & Analytics</h1>
          <p className="text-sm text-slate-500 mt-0.5">Performance overview for {dateRange}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2 bg-white">
            <Calendar size={14} className="text-slate-400" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="text-sm text-slate-700 border-none outline-none bg-transparent"
            >
              {['2024', '2023', 'Q4 2024', 'Q3 2024', 'Q2 2024'].map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-500 rounded-lg transition-colors shadow-sm">
            <Download size={14} />
            Export
          </button>
        </div>
      </div>

      {/* KPI summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: '$2.48M', change: '+18.4%', positive: true },
          { label: 'Deals Closed', value: '231', change: '+21%', positive: true },
          { label: 'Avg Deal Size', value: '$10,745', change: '+6.2%', positive: true },
          { label: 'Churn Rate', value: '2.1%', change: '-0.4%', positive: true },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
            <div className="text-xs text-slate-500 mb-1">{kpi.label}</div>
            <div className="text-xl font-700 text-slate-900">{kpi.value}</div>
            <div className={`text-xs font-500 mt-0.5 ${kpi.positive ? 'text-green-600' : 'text-red-500'}`}>{kpi.change} vs last year</div>
          </div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Sales Trend */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h2 className="text-sm font-600 text-slate-900 mb-4">Sales Trend – Revenue vs Target</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={salesTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`]} contentStyle={{ borderRadius: 8, border: '1px solid #E2E8F0', fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={2} dot={false} name="Revenue" />
              <Line type="monotone" dataKey="target" stroke="#94A3B8" strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="Target" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Order Status Pie */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h2 className="text-sm font-600 text-slate-900 mb-4">Order Status Distribution</h2>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={orderStatusData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={2}>
                {orderStatusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #E2E8F0', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-1.5 mt-2">
            {orderStatusData.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                <span className="text-slate-600 truncate">{d.name}</span>
                <span className="font-600 text-slate-900 ml-auto">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Installer Performance */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h2 className="text-sm font-600 text-slate-900 mb-4">Installer Performance</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={installerPerformance} layout="vertical" barSize={12}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} width={90} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #E2E8F0', fontSize: 12 }} />
              <Bar dataKey="completed" fill="#2563EB" radius={[0, 4, 4, 0]} name="Completed" />
              <Bar dataKey="issues" fill="#EF4444" radius={[0, 4, 4, 0]} name="Issues" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Accounts */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h2 className="text-sm font-600 text-slate-900 mb-4">Top Accounts by Revenue</h2>
          <div className="space-y-3">
            {topAccounts.map((acc, i) => (
              <div key={acc.name} className="flex items-center gap-3">
                <span className="text-xs font-700 text-slate-400 w-4">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-500 text-slate-800 truncate">{acc.name}</div>
                </div>
                <div className="text-sm font-600 text-slate-900">{acc.revenue}</div>
                <div className={`text-xs font-600 ${acc.positive ? 'text-green-600' : 'text-red-500'}`}>{acc.growth}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
