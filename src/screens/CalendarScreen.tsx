import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus, X, Clock } from 'lucide-react'

interface Props { onNavigate: (s: any) => void }

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']

const calendarEvents = [
  { id: 1, title: 'Install – Vertex Solutions', date: '2024-05-14', time: '10:30 AM', type: 'install', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 2, title: 'Contract Review – Ironwood', date: '2024-05-15', time: '02:00 PM', type: 'meeting', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { id: 3, title: 'Install – BlueSky Logistics', date: '2024-05-16', time: '02:00 PM', type: 'install', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 4, title: 'Invoice Due – Coastal Energy', date: '2024-05-18', time: 'All day', type: 'finance', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  { id: 5, title: 'Install – Coastal Energy', date: '2024-05-18', time: '08:00 AM', type: 'install', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 6, title: 'Onboarding Call – Pinnacle', date: '2024-05-20', time: '11:00 AM', type: 'call', color: 'bg-green-100 text-green-700 border-green-200' },
  { id: 7, title: 'Install – SwiftNet', date: '2024-05-20', time: '09:00 AM', type: 'install', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 8, title: 'Quarterly Business Review', date: '2024-05-22', time: '10:00 AM', type: 'meeting', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { id: 9, title: 'Support Call – Vertex', date: '2024-05-10', time: '03:00 PM', type: 'call', color: 'bg-green-100 text-green-700 border-green-200' },
]

const myCalendars = [
  { label: 'My Events', color: 'bg-blue-500', checked: true },
  { label: 'Installations', color: 'bg-purple-500', checked: true },
  { label: 'Outlook', color: 'bg-amber-500', checked: true },
  { label: 'Zoho CRM', color: 'bg-green-500', checked: true },
]

function getCalendarDays(year: number, month: number): (number | null)[] {
  const first = new Date(year, month, 1)
  const last = new Date(year, month + 1, 0)
  const days: (number | null)[] = Array(first.getDay()).fill(null)
  for (let d = 1; d <= last.getDate(); d++) days.push(d)
  while (days.length % 7 !== 0) days.push(null)
  return days
}

export default function CalendarScreen({ onNavigate }: Props) {
  const [year, setYear] = useState(2024)
  const [month, setMonth] = useState(4)
  const [view, setView] = useState<'month' | 'week' | 'day'>('month')
  const [calendars, setCalendars] = useState(myCalendars)
  const [showModal, setShowModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<typeof calendarEvents[0] | null>(null)

  const days = getCalendarDays(year, month)
  const today = new Date()

  const prevMonth = () => month === 0 ? (setYear(y => y - 1), setMonth(11)) : setMonth(m => m - 1)
  const nextMonth = () => month === 11 ? (setYear(y => y + 1), setMonth(0)) : setMonth(m => m + 1)

  const getEventsForDay = (day: number | null) => {
    if (!day) return []
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return calendarEvents.filter((e) => e.date === dateStr)
  }

  const toggleCalendar = (i: number) => {
    setCalendars((prev) => prev.map((c, idx) => idx === i ? { ...c, checked: !c.checked } : c))
  }

  return (
    <div className="flex flex-col md:flex-row h-full overflow-y-auto md:overflow-y-hidden">
      {/* Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0 bg-white border-b md:border-b-0 md:border-r border-slate-200 p-5 flex flex-col gap-6">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-500 rounded-lg transition-colors shadow-sm"
        >
          <Plus size={15} />
          New Event
        </button>

        {/* Mini calendar */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-base font-600 text-slate-800">{MONTHS[month]} {year}</span>
            <div className="flex gap-1">
              <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"><ChevronLeft size={18} className="text-slate-500" /></button>
              <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"><ChevronRight size={18} className="text-slate-500" /></button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {DAYS.map((d) => (
              <div key={d} className="text-center text-xs font-600 text-slate-400 py-1.5">{d[0]}</div>
            ))}
            {getCalendarDays(year, month).map((day, i) => {
              const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear()
              return (
                <div
                  key={i}
                  className={`flex items-center justify-center h-8 text-sm rounded-lg cursor-pointer transition-colors ${day ? 'hover:bg-slate-100' : ''} ${isToday ? 'bg-blue-600 text-white font-600 shadow-sm shadow-blue-500/30' : 'text-slate-700 font-500'}`}
                >
                  {day || ''}
                </div>
              )
            })}
          </div>
        </div>

        {/* My calendars */}
        <div>
          <div className="text-xs font-600 text-slate-500 uppercase tracking-wide mb-2">My Calendars</div>
          <div className="space-y-2">
            {calendars.map((cal, i) => (
              <label key={cal.label} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={cal.checked}
                  onChange={() => toggleCalendar(i)}
                  className="rounded"
                />
                <div className={`w-2.5 h-2.5 rounded-sm ${cal.color}`} />
                <span className="text-xs text-slate-600">{cal.label}</span>
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 px-4 py-3.5 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-2">
            <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500"><ChevronLeft size={16} /></button>
            <h2 className="text-sm font-700 text-slate-900 w-32">{MONTHS[month]} {year}</h2>
            <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500"><ChevronRight size={16} /></button>
            <button
              onClick={() => { setYear(today.getFullYear()); setMonth(today.getMonth()) }}
              className="ml-2 px-3 py-1.5 text-xs font-500 text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 hidden sm:block"
            >
              Today
            </button>
          </div>
          <div className="sm:ml-auto flex w-full sm:w-auto rounded-lg border border-slate-200 overflow-hidden">
            {(['month', 'week', 'day'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`flex-1 sm:flex-none px-3 py-1.5 text-xs font-500 capitalize ${view === v ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-auto bg-white">
          <div className="grid grid-cols-7 border-b border-slate-100">
            {DAYS.map((d) => (
              <div key={d} className="py-2.5 text-center text-xs font-600 text-slate-400 uppercase">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 flex-1">
            {days.map((day, idx) => {
              const events = getEventsForDay(day)
              const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear()
              return (
                <div
                  key={idx}
                  className={`min-h-[100px] p-2 border-b border-r border-slate-100 ${day ? '' : 'bg-slate-50/50'}`}
                >
                  {day && (
                    <>
                      <div className={`text-xs font-600 mb-1.5 w-6 h-6 flex items-center justify-center rounded-full ${isToday ? 'bg-blue-600 text-white' : 'text-slate-700'}`}>
                        {day}
                      </div>
                      <div className="space-y-0.5">
                        {events.map((ev) => (
                          <button
                            key={ev.id}
                            onClick={() => setSelectedEvent(ev)}
                            className={`w-full text-left px-1.5 py-0.5 rounded text-[10px] font-500 border truncate ${ev.color} hover:opacity-80 transition-opacity`}
                          >
                            {ev.title}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Event detail popover */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50" onClick={() => setSelectedEvent(null)}>
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-5 w-72" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-sm font-700 text-slate-900">{selectedEvent.title}</h3>
              <button onClick={() => setSelectedEvent(null)} className="text-slate-400 hover:text-slate-600"><X size={15} /></button>
            </div>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-1.5"><Clock size={12} className="text-slate-400" /> {selectedEvent.time}</div>
              <div className="flex items-center gap-1.5">
                <span className={`px-1.5 py-0.5 rounded font-500 capitalize ${selectedEvent.color}`}>{selectedEvent.type}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Event modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-6 w-96" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-700 text-slate-900">New Event</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><X size={15} /></button>
            </div>
            <div className="space-y-3">
              <input placeholder="Event title" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
              <input type="date" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
              <input type="time" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
              <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white">
                <option>My Events</option>
                <option>Installations</option>
                <option>Outlook</option>
                <option>Zoho CRM</option>
              </select>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50">Cancel</button>
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg">Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
