import { useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { installations } from '../data/mockData'
import type { NavigateFn } from '../App'

interface Props { onNavigate: NavigateFn }

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const statusColor: Record<string, string> = {
  Scheduled: 'bg-slate-200 text-slate-700',
  'In Progress': 'bg-blue-100 text-blue-700',
  Completed: 'bg-green-100 text-green-700',
  Issues: 'bg-red-100 text-red-700',
}

function getCalendarDays(year: number, month: number) {
  const first = new Date(year, month, 1)
  const last = new Date(year, month + 1, 0)
  const days: (number | null)[] = Array(first.getDay()).fill(null)
  for (let d = 1; d <= last.getDate(); d++) days.push(d)
  while (days.length % 7 !== 0) days.push(null)
  return days
}

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']

export default function InstallationCalendarScreen({ onNavigate }: Props) {
  const [year, setYear] = useState(2024)
  const [month, setMonth] = useState(4) // May
  const [popover, setPopover] = useState<typeof installations[0] | null>(null)
  const [view, setView] = useState<'month' | 'week' | 'day'>('month')

  const days = getCalendarDays(year, month)
  const today = new Date()

  const getEventsForDay = (day: number | null) => {
    if (!day) return []
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return installations.filter((i) => i.date === dateStr)
  }

  const prevMonth = () => {
    if (month === 0) { setYear(y => y - 1); setMonth(11) }
    else setMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (month === 11) { setYear(y => y + 1); setMonth(0) }
    else setMonth(m => m + 1)
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-700 text-slate-900">Installation Calendar</h1>
          <p className="text-sm text-slate-500 mt-0.5">Schedule and track all installations</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-slate-200 overflow-hidden">
            {(['month', 'week', 'day'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1.5 text-xs font-500 capitalize transition-colors ${view === v ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
              >
                {v}
              </button>
            ))}
          </div>
          <button className="px-3 py-1.5 text-xs font-500 text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 bg-white">
            Today
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden relative">
        {/* Nav */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500">
            <ChevronLeft size={18} />
          </button>
          <h2 className="text-sm font-700 text-slate-900">{MONTH_NAMES[month]} {year}</h2>
          <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500">
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-slate-100">
          {DAYS.map((d) => (
            <div key={d} className="py-2.5 text-center text-xs font-600 text-slate-400 uppercase tracking-wide">
              {d}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-7">
          {days.map((day, idx) => {
            const events = getEventsForDay(day)
            const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear()
            return (
              <div
                key={idx}
                className={`min-h-[90px] p-2 border-b border-r border-slate-100 ${day ? 'hover:bg-slate-50' : 'bg-slate-50/50'}`}
              >
                {day && (
                  <>
                    <div className={`text-xs font-600 mb-1.5 w-6 h-6 flex items-center justify-center rounded-full ${isToday ? 'bg-blue-600 text-white' : 'text-slate-700'}`}>
                      {day}
                    </div>
                    <div className="space-y-1">
                      {events.map((ev) => (
                        <button
                          key={ev.id}
                          onClick={() => setPopover(ev)}
                          className={`w-full text-left px-1.5 py-0.5 rounded text-[10px] font-500 truncate ${statusColor[ev.status]} hover:opacity-80`}
                        >
                          {ev.account}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 px-5 py-3 border-t border-slate-100 flex-wrap">
          {Object.entries(statusColor).map(([s, cls]) => (
            <div key={s} className="flex items-center gap-1.5">
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-500 ${cls}`}>{s}</span>
            </div>
          ))}
        </div>

        {/* Popover */}
        {popover && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 z-10">
            <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-5 w-72">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-sm font-700 text-slate-900">{popover.account}</h3>
                <button onClick={() => setPopover(null)} className="text-slate-400 hover:text-slate-600">
                  <X size={16} />
                </button>
              </div>
              <div className="space-y-2 text-xs text-slate-600">
                <div><span className="text-slate-400">Type:</span> {popover.type}</div>
                <div><span className="text-slate-400">Installer:</span> {popover.installer}</div>
                <div><span className="text-slate-400">Date:</span> {popover.date} at {popover.time}</div>
                <div><span className="text-slate-400">Status:</span> <span className={`px-1.5 py-0.5 rounded font-500 ${statusColor[popover.status]}`}>{popover.status}</span></div>
                <div className="pt-1 border-t border-slate-100"><span className="text-slate-400">Notes:</span> {popover.notes}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
