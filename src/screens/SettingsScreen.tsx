import { useState } from 'react'
import { User, Building2, Plug, Bell, Save, Check } from 'lucide-react'
import type { NavigateFn } from '../App'

interface Props { onNavigate: NavigateFn }

const settingsTabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'company', label: 'Company', icon: Building2 },
  { id: 'integrations', label: 'Integrations', icon: Plug },
  { id: 'notifications', label: 'Notifications', icon: Bell },
]

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors flex-shrink-0 ${checked ? 'bg-blue-600' : 'bg-slate-200'}`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-4.5' : 'translate-x-0.5'}`}
      />
    </button>
  )
}

export default function SettingsScreen({ onNavigate }: Props) {
  const [activeTab, setActiveTab] = useState('profile')
  const [saved, setSaved] = useState(false)

  const [profile, setProfile] = useState({
    name: 'Alex Morgan',
    email: 'a.morgan@saas.io',
    phone: '+1 415 555 0100',
    role: 'Admin',
    timezone: 'America/Los_Angeles',
  })

  const [integrations, setIntegrations] = useState({
    zoho: true,
    pandadoc: true,
    outlook: false,
    slack: true,
    salesforce: false,
  })

  const [notifications, setNotifications] = useState({
    email: true,
    browser: true,
    overdueInvoice: true,
    contractExpiry: true,
    installIssues: true,
    newOrder: false,
    weeklyReport: true,
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const toggleIntegration = (key: keyof typeof integrations) => {
    setIntegrations((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-xl font-700 text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500 mt-0.5">Manage your account and platform preferences</p>
      </div>

      <div className="flex gap-5">
        {/* Left tabs */}
        <aside className="w-48 flex-shrink-0">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-2">
            {settingsTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-500 text-left transition-colors mb-0.5 ${activeTab === tab.id ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <tab.icon size={15} className={activeTab === tab.id ? 'text-blue-600' : 'text-slate-400'} />
                {tab.label}
              </button>
            ))}
          </div>
        </aside>

        {/* Right content */}
        <div className="flex-1 min-w-0">
          {activeTab === 'profile' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5">
              <div>
                <h2 className="text-sm font-600 text-slate-900 mb-4">Profile Information</h2>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-16 h-16 rounded-xl bg-blue-600 flex items-center justify-center text-white text-xl font-700">
                    AM
                  </div>
                  <div>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-500">Change photo</button>
                    <p className="text-xs text-slate-400 mt-0.5">JPG, PNG up to 2MB</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Full Name', key: 'name' as const, type: 'text' },
                    { label: 'Email Address', key: 'email' as const, type: 'email' },
                    { label: 'Phone Number', key: 'phone' as const, type: 'tel' },
                    { label: 'Role', key: 'role' as const, type: 'text' },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-xs font-500 text-slate-700 mb-1.5">{field.label}</label>
                      <input
                        type={field.type}
                        value={profile[field.key]}
                        onChange={(e) => setProfile((p) => ({ ...p, [field.key]: e.target.value }))}
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <label className="block text-xs font-500 text-slate-700 mb-1.5">Timezone</label>
                  <select
                    value={profile.timezone}
                    onChange={(e) => setProfile((p) => ({ ...p, timezone: e.target.value }))}
                    className="w-full sm:w-64 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white"
                  >
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="Europe/London">London (GMT)</option>
                    <option value="Europe/Berlin">Berlin (CET)</option>
                  </select>
                </div>
              </div>
              <div className="border-t border-slate-100 pt-4">
                <h3 className="text-sm font-600 text-slate-900 mb-3">Change Password</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-500 text-slate-700 mb-1.5">Current Password</label>
                    <input type="password" placeholder="••••••••" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-500 text-slate-700 mb-1.5">New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'company' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-sm font-600 text-slate-900 mb-4">Company Settings</h2>
              <div className="space-y-4">
                {[
                  { label: 'Company Name', value: 'SalesActivate Inc.', type: 'text' },
                  { label: 'Website', value: 'https://salesactivate.io', type: 'url' },
                  { label: 'Industry', value: 'Technology / SaaS', type: 'text' },
                  { label: 'Company Size', value: '51–200 employees', type: 'text' },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="block text-xs font-500 text-slate-700 mb-1.5">{f.label}</label>
                    <input
                      type={f.type}
                      defaultValue={f.value}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-500 text-slate-700 mb-1.5">Billing Email</label>
                  <input type="email" defaultValue="billing@salesactivate.io" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-sm font-600 text-slate-900 mb-4">Integration Connections</h2>
              <div className="space-y-3">
                {[
                  { key: 'zoho' as const, name: 'Zoho CRM', desc: 'Sync accounts, contacts, and invoices', logo: '🔷' },
                  { key: 'pandadoc' as const, name: 'PandaDoc', desc: 'Contract creation, e-signing, and tracking', logo: '📄' },
                  { key: 'outlook' as const, name: 'Microsoft Outlook', desc: 'Calendar sync and email integration', logo: '📧' },
                  { key: 'slack' as const, name: 'Slack', desc: 'Notifications and team alerts', logo: '💬' },
                  { key: 'salesforce' as const, name: 'Salesforce', desc: 'Bi-directional lead and opportunity sync', logo: '☁️' },
                ].map((int) => (
                  <div key={int.key} className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{int.logo}</span>
                      <div>
                        <div className="text-sm font-600 text-slate-900">{int.name}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{int.desc}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-500 ${integrations[int.key] ? 'text-green-600' : 'text-slate-400'}`}>
                        {integrations[int.key] ? 'Connected' : 'Disconnected'}
                      </span>
                      <Toggle checked={integrations[int.key]} onChange={() => toggleIntegration(int.key)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-sm font-600 text-slate-900 mb-4">Notification Preferences</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-600 text-slate-500 uppercase tracking-wide mb-3">Delivery Channels</h3>
                  <div className="space-y-3">
                    {[
                      { key: 'email' as const, label: 'Email notifications', desc: 'Receive updates via email' },
                      { key: 'browser' as const, label: 'Browser notifications', desc: 'Show desktop push notifications' },
                    ].map((n) => (
                      <div key={n.key} className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-500 text-slate-800">{n.label}</div>
                          <div className="text-xs text-slate-400">{n.desc}</div>
                        </div>
                        <Toggle checked={notifications[n.key]} onChange={() => toggleNotification(n.key)} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t border-slate-100 pt-4">
                  <h3 className="text-xs font-600 text-slate-500 uppercase tracking-wide mb-3">Event Alerts</h3>
                  <div className="space-y-3">
                    {[
                      { key: 'overdueInvoice' as const, label: 'Overdue invoices', desc: 'Alert when an invoice becomes overdue' },
                      { key: 'contractExpiry' as const, label: 'Contract expiry (7 days)', desc: 'Remind before contracts expire' },
                      { key: 'installIssues' as const, label: 'Installation issues', desc: 'Alert on installation failures' },
                      { key: 'newOrder' as const, label: 'New order created', desc: 'Notify on each new order' },
                      { key: 'weeklyReport' as const, label: 'Weekly summary report', desc: 'Receive weekly performance digest' },
                    ].map((n) => (
                      <div key={n.key} className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-500 text-slate-800">{n.label}</div>
                          <div className="text-xs text-slate-400">{n.desc}</div>
                        </div>
                        <Toggle checked={notifications[n.key]} onChange={() => toggleNotification(n.key)} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Save button */}
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSave}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-500 rounded-lg transition-all shadow-sm ${saved ? 'bg-green-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
            >
              {saved ? <><Check size={14} /> Saved!</> : <><Save size={14} /> Save Changes</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
