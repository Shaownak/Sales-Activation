import { useState } from 'react'
import Layout from './components/Layout'
import LoginScreen from './screens/LoginScreen'
import DashboardScreen from './screens/DashboardScreen'
import AccountsScreen from './screens/AccountsScreen'
import AccountDetailsScreen from './screens/AccountDetailsScreen'
import ContactsScreen from './screens/ContactsScreen'
import ContractsScreen from './screens/ContractsScreen'
import ContractDetailsScreen from './screens/ContractDetailsScreen'
import OrdersScreen from './screens/OrdersScreen'
import OrderDetailsScreen from './screens/OrderDetailsScreen'
import InstallationsScreen from './screens/InstallationsScreen'
import InstallationCalendarScreen from './screens/InstallationCalendarScreen'
import OnboardingScreen from './screens/OnboardingScreen'
import InvoicesScreen from './screens/InvoicesScreen'
import InvoiceDetailsScreen from './screens/InvoiceDetailsScreen'
import NotificationsScreen from './screens/NotificationsScreen'
import CalendarScreen from './screens/CalendarScreen'
import ReportsScreen from './screens/ReportsScreen'
import UserManagementScreen from './screens/UserManagementScreen'
import SettingsScreen from './screens/SettingsScreen'
import ActivityLogsScreen from './screens/ActivityLogsScreen'

export type Screen =
  | 'login' | 'dashboard' | 'accounts' | 'account-details'
  | 'contacts' | 'contracts' | 'contract-details'
  | 'orders' | 'order-details' | 'installations'
  | 'installation-calendar' | 'onboarding' | 'invoices'
  | 'invoice-details' | 'notifications' | 'calendar'
  | 'reports' | 'user-management' | 'settings' | 'activity-logs'

export type NavigateFn = (screen: Screen, id?: string) => void

export default function App() {
  const [screen, setScreen] = useState<Screen>('login')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const navigate: NavigateFn = (s, id) => {
    setScreen(s)
    if (id !== undefined) setSelectedId(id)
  }

  if (!isLoggedIn) {
    return (
      <LoginScreen
        onLogin={() => {
          setIsLoggedIn(true)
          navigate('dashboard')
        }}
      />
    )
  }

  const renderScreen = () => {
    switch (screen) {
      case 'dashboard': return <DashboardScreen onNavigate={navigate} />
      case 'accounts': return <AccountsScreen onNavigate={navigate} />
      case 'account-details': return <AccountDetailsScreen id={selectedId} onNavigate={navigate} />
      case 'contacts': return <ContactsScreen onNavigate={navigate} />
      case 'contracts': return <ContractsScreen onNavigate={navigate} />
      case 'contract-details': return <ContractDetailsScreen id={selectedId} onNavigate={navigate} />
      case 'orders': return <OrdersScreen onNavigate={navigate} />
      case 'order-details': return <OrderDetailsScreen id={selectedId} onNavigate={navigate} />
      case 'installations': return <InstallationsScreen onNavigate={navigate} />
      case 'installation-calendar': return <InstallationCalendarScreen onNavigate={navigate} />
      case 'onboarding': return <OnboardingScreen onNavigate={navigate} />
      case 'invoices': return <InvoicesScreen onNavigate={navigate} />
      case 'invoice-details': return <InvoiceDetailsScreen id={selectedId} onNavigate={navigate} />
      case 'notifications': return <NotificationsScreen onNavigate={navigate} />
      case 'calendar': return <CalendarScreen onNavigate={navigate} />
      case 'reports': return <ReportsScreen onNavigate={navigate} />
      case 'user-management': return <UserManagementScreen onNavigate={navigate} />
      case 'settings': return <SettingsScreen onNavigate={navigate} />
      case 'activity-logs': return <ActivityLogsScreen onNavigate={navigate} />
      default: return <DashboardScreen onNavigate={navigate} />
    }
  }

  return (
    <Layout currentScreen={screen} onNavigate={navigate} onLogout={() => setIsLoggedIn(false)}>
      {renderScreen()}
    </Layout>
  )
}
