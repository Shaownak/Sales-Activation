import { useState } from 'react'
import {
  LayoutDashboard, Building2, Users, FileText, ShoppingCart,
  Wrench, Calendar, BarChart2, Settings, Bell, Search,
  LogOut, ChevronDown, TrendingUp, Activity, ClipboardList,
  DollarSign, UserCircle, X, Menu
} from 'lucide-react'
import type { Screen, NavigateFn } from '../App'

interface Props {
  children: React.ReactNode
  currentScreen: Screen
  onNavigate: NavigateFn
  onLogout: () => void
}

interface NavItem {
  id: Screen
  label: string
  icon: React.ElementType
}

interface NavGroup {
  label: string
  items: NavItem[]
}

const navGroups: NavGroup[] = [
  {
    label: 'Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: 'Sales',
    items: [
      { id: 'accounts', label: 'Accounts', icon: Building2 },
      { id: 'contacts', label: 'Contacts', icon: Users },
      { id: 'contracts', label: 'Contracts', icon: FileText },
    ],
  },
  {
    label: 'Operations',
    items: [
      { id: 'orders', label: 'Orders', icon: ShoppingCart },
      { id: 'installations', label: 'Installations', icon: Wrench },
      { id: 'installation-calendar', label: 'Install Calendar', icon: Calendar },
    ],
  },
  {
    label: 'Customer Success',
    items: [
      { id: 'onboarding', label: 'Onboarding', icon: ClipboardList },
    ],
  },
  {
    label: 'Finance',
    items: [
      { id: 'invoices', label: 'Invoices', icon: DollarSign },
    ],
  },
  {
    label: 'Tools',
    items: [
      { id: 'notifications', label: 'Notifications', icon: Bell },
      { id: 'calendar', label: 'Calendar', icon: Calendar },
    ],
  },
  {
    label: 'Analytics',
    items: [
      { id: 'reports', label: 'Reports', icon: BarChart2 },
    ],
  },
  {
    label: 'Administration',
    items: [
      { id: 'user-management', label: 'Users', icon: Users },
      { id: 'settings', label: 'Settings', icon: Settings },
      { id: 'activity-logs', label: 'Activity Logs', icon: Activity },
    ],
  },
]

export default function Layout({ children, currentScreen, onNavigate, onLogout }: Props) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const activeBase = (screen: Screen) => {
    if (currentScreen === screen) return true
    if (screen === 'accounts' && currentScreen === 'account-details') return true
    if (screen === 'contracts' && currentScreen === 'contract-details') return true
    if (screen === 'orders' && currentScreen === 'order-details') return true
    if (screen === 'invoices' && currentScreen === 'invoice-details') return true
    return false
  }

  return (
    <div className="flex h-screen bg-slate-50/50 overflow-hidden relative">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 -mr-48 -mt-48 w-96 h-96 rounded-full bg-slate-300/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-64 -ml-48 -mb-48 w-96 h-96 rounded-full bg-blue-300/10 blur-[100px] pointer-events-none" />

      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'} flex-shrink-0 bg-white border-r border-slate-200 flex flex-col transition-all duration-300`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-5 border-b border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-500/20">
              <TrendingUp size={16} className="text-white" />
            </div>
            <div>
              <div className="text-sm font-700 text-slate-900 leading-tight">SalesActivate</div>
              <div className="text-xs text-slate-400 leading-tight">CRM Platform</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-3">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-4">
              <div className="px-2 mb-1 text-[10px] font-600 text-slate-400 uppercase tracking-widest">
                {group.label}
              </div>
              {group.items.map((item) => {
                const active = activeBase(item.id)
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-500 transition-all duration-200 hover:translate-x-1 mb-0.5 ${
                      active
                        ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                    }`}
                  >
                    <item.icon size={16} className={active ? 'text-blue-600' : 'text-slate-400'} />
                    {item.label}
                    {item.id === 'notifications' && (
                      <span className="ml-auto bg-red-500 text-white text-[10px] font-700 rounded-full w-4 h-4 flex items-center justify-center">3</span>
                    )}
                  </button>
                )
              })}
            </div>
          ))}
        </nav>

        {/* User */}
        <div className="border-t border-slate-100 p-3">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            <LogOut size={16} className="text-slate-400" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 glass border-b border-slate-200/60 flex items-center px-4 gap-3 flex-shrink-0 z-10 sticky top-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <Menu size={18} />
          </button>

          {/* Search */}
          <div className="flex-1 max-w-md relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search accounts, contacts, orders…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder-slate-400"
            />
          </div>

          <div className="flex-1" />

          {/* Notifications */}
          <div className="relative group">
            <button
              className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            
            {/* Hover Dropdown */}
            <div className="absolute right-0 top-full mt-1 w-80 bg-white rounded-xl shadow-xl border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-3 border-b border-slate-100">
                <h3 className="text-sm font-600 text-slate-900">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div className="p-3 border-b border-slate-100 hover:bg-slate-50 cursor-pointer">
                  <div className="text-sm font-500 text-slate-800">New contract signed by Acme Corp</div>
                  <div className="text-xs text-slate-500 mt-1">2 hours ago</div>
                </div>
                <div className="p-3 border-b border-slate-100 hover:bg-slate-50 cursor-pointer">
                  <div className="text-sm font-500 text-slate-800">Invoice #1024 is overdue</div>
                  <div className="text-xs text-red-500 mt-1">5 hours ago</div>
                </div>
                <div className="p-3 hover:bg-slate-50 cursor-pointer">
                  <div className="text-sm font-500 text-slate-800">Installation completed for TechFlow</div>
                  <div className="text-xs text-slate-500 mt-1">1 day ago</div>
                </div>
              </div>
              <div className="p-2 border-t border-slate-100">
                <button
                  onClick={() => onNavigate('notifications')}
                  className="w-full py-2 text-sm font-500 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  See more notifications
                </button>
              </div>
            </div>
          </div>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-600 shadow-sm">
                AM
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-sm font-500 text-slate-800">Alex Morgan</div>
                <div className="text-xs text-slate-400">Admin</div>
              </div>
              <ChevronDown size={14} className="text-slate-400" />
            </button>
            {userMenuOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-50">
                <button
                  onClick={() => { onNavigate('settings'); setUserMenuOpen(false) }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <UserCircle size={15} />
                  Profile Settings
                </button>
                <div className="border-t border-slate-100 my-1" />
                <button
                  onClick={() => { onLogout(); setUserMenuOpen(false) }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={15} />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
