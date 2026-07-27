export const accounts = [
  { id: 'ACC-001', name: 'Meridian Technologies', type: 'Enterprise', contact: 'Sarah Chen', email: 'sarah.chen@meridian.com', phone: '+1 415 555 0192', status: 'Active', createdAt: '2024-01-15', arr: '$124,000' },
  { id: 'ACC-002', name: 'BlueSky Logistics', type: 'SMB', contact: 'James Wilson', email: 'j.wilson@bluesky.com', phone: '+1 312 555 0847', status: 'Pending', createdAt: '2024-02-03', arr: '$42,000' },
  { id: 'ACC-003', name: 'Vertex Solutions', type: 'Enterprise', contact: 'Maria Rodriguez', email: 'm.rodriguez@vertex.com', phone: '+1 512 555 0234', status: 'Active', createdAt: '2024-02-18', arr: '$89,500' },
  { id: 'ACC-004', name: 'Coastal Energy Group', type: 'Mid-Market', contact: 'David Kim', email: 'd.kim@coastalenergy.com', phone: '+1 832 555 0561', status: 'Active', createdAt: '2024-03-01', arr: '$67,200' },
  { id: 'ACC-005', name: 'Ironwood Financial', type: 'Enterprise', contact: 'Lisa Thompson', email: 'l.thompson@ironwood.com', phone: '+1 212 555 0823', status: 'Pending', createdAt: '2024-03-22', arr: '$156,000' },
  { id: 'ACC-006', name: 'Pinnacle Health Systems', type: 'Enterprise', contact: 'Robert Martinez', email: 'r.martinez@pinnaclehealth.com', phone: '+1 617 555 0149', status: 'Active', createdAt: '2024-04-05', arr: '$214,800' },
  { id: 'ACC-007', name: 'SwiftNet Communications', type: 'SMB', contact: 'Emily Johnson', email: 'e.johnson@swiftnet.com', phone: '+1 503 555 0372', status: 'Active', createdAt: '2024-04-18', arr: '$31,400' },
  { id: 'ACC-008', name: 'Granite Construction Co.', type: 'Mid-Market', contact: 'Michael Brown', email: 'm.brown@granite.com', phone: '+1 214 555 0916', status: 'Pending', createdAt: '2024-05-02', arr: '$58,700' },
]

export const contacts = [
  { id: 'CON-001', name: 'Sarah Chen', email: 'sarah.chen@meridian.com', phone: '+1 415 555 0192', account: 'Meridian Technologies', accountId: 'ACC-001', isPrimary: true, role: 'VP of Technology' },
  { id: 'CON-002', name: 'James Wilson', email: 'j.wilson@bluesky.com', phone: '+1 312 555 0847', account: 'BlueSky Logistics', accountId: 'ACC-002', isPrimary: true, role: 'CEO' },
  { id: 'CON-003', name: 'Maria Rodriguez', email: 'm.rodriguez@vertex.com', phone: '+1 512 555 0234', account: 'Vertex Solutions', accountId: 'ACC-003', isPrimary: true, role: 'CTO' },
  { id: 'CON-004', name: 'David Kim', email: 'd.kim@coastalenergy.com', phone: '+1 832 555 0561', account: 'Coastal Energy Group', accountId: 'ACC-004', isPrimary: true, role: 'Director of Operations' },
  { id: 'CON-005', name: 'Lisa Thompson', email: 'l.thompson@ironwood.com', phone: '+1 212 555 0823', account: 'Ironwood Financial', accountId: 'ACC-005', isPrimary: true, role: 'CFO' },
  { id: 'CON-006', name: 'Robert Martinez', email: 'r.martinez@pinnaclehealth.com', phone: '+1 617 555 0149', account: 'Pinnacle Health Systems', accountId: 'ACC-006', isPrimary: true, role: 'CIO' },
  { id: 'CON-007', name: 'Emily Johnson', email: 'e.johnson@swiftnet.com', phone: '+1 503 555 0372', account: 'SwiftNet Communications', accountId: 'ACC-007', isPrimary: true, role: 'Operations Manager' },
  { id: 'CON-008', name: 'Michael Brown', email: 'm.brown@granite.com', phone: '+1 214 555 0916', account: 'Granite Construction Co.', accountId: 'ACC-008', isPrimary: true, role: 'Procurement Head' },
  { id: 'CON-009', name: 'Jennifer Davis', email: 'j.davis@meridian.com', phone: '+1 415 555 0193', account: 'Meridian Technologies', accountId: 'ACC-001', isPrimary: false, role: 'IT Manager' },
  { id: 'CON-010', name: 'Thomas Anderson', email: 't.anderson@vertex.com', phone: '+1 512 555 0235', account: 'Vertex Solutions', accountId: 'ACC-003', isPrimary: false, role: 'Project Lead' },
]

export const contracts = [
  { id: 'CTR-2024-001', account: 'Meridian Technologies', accountId: 'ACC-001', status: 'Signed', startDate: '2024-01-15', endDate: '2025-01-14', value: '$124,000', type: 'Annual' },
  { id: 'CTR-2024-002', account: 'BlueSky Logistics', accountId: 'ACC-002', status: 'Drafted', startDate: '2024-02-01', endDate: '2025-01-31', value: '$42,000', type: 'Annual' },
  { id: 'CTR-2024-003', account: 'Vertex Solutions', accountId: 'ACC-003', status: 'Signed', startDate: '2024-02-20', endDate: '2025-02-19', value: '$89,500', type: 'Annual' },
  { id: 'CTR-2024-004', account: 'Coastal Energy Group', accountId: 'ACC-004', status: 'Expired', startDate: '2023-03-01', endDate: '2024-02-29', value: '$67,200', type: 'Annual' },
  { id: 'CTR-2024-005', account: 'Ironwood Financial', accountId: 'ACC-005', status: 'Drafted', startDate: '2024-04-01', endDate: '2025-03-31', value: '$156,000', type: 'Multi-Year' },
  { id: 'CTR-2024-006', account: 'Pinnacle Health Systems', accountId: 'ACC-006', status: 'Signed', startDate: '2024-04-10', endDate: '2025-04-09', value: '$214,800', type: 'Enterprise' },
]

export const orders = [
  { id: 'ORD-2024-001', account: 'Meridian Technologies', accountId: 'ACC-001', provider: 'TechServ Pro', status: 'Completed', delivery: 'On-site', createdAt: '2024-01-20', total: '$18,400' },
  { id: 'ORD-2024-002', account: 'BlueSky Logistics', accountId: 'ACC-002', provider: 'CloudBridge', status: 'In Progress', delivery: 'Remote', createdAt: '2024-02-08', total: '$9,200' },
  { id: 'ORD-2024-003', account: 'Vertex Solutions', accountId: 'ACC-003', provider: 'DataVault Enterprise', status: 'In Progress', delivery: 'On-site', createdAt: '2024-02-25', total: '$24,750' },
  { id: 'ORD-2024-004', account: 'Coastal Energy Group', accountId: 'ACC-004', provider: 'PowerGrid Monitor', status: 'Pending', delivery: 'On-site', createdAt: '2024-03-05', total: '$31,000' },
  { id: 'ORD-2024-005', account: 'Ironwood Financial', accountId: 'ACC-005', provider: 'SecureAuth Suite', status: 'Pending', delivery: 'Remote', createdAt: '2024-03-28', total: '$15,600' },
  { id: 'ORD-2024-006', account: 'Pinnacle Health Systems', accountId: 'ACC-006', provider: 'MedConnect Platform', status: 'Completed', delivery: 'Hybrid', createdAt: '2024-04-12', total: '$42,800' },
]

export const invoices = [
  { id: 'INV-2024-001', account: 'Meridian Technologies', accountId: 'ACC-001', issueDate: '2024-01-20', dueDate: '2024-02-20', total: '$24,500', status: 'Paid' },
  { id: 'INV-2024-002', account: 'Vertex Solutions', accountId: 'ACC-003', issueDate: '2024-02-25', dueDate: '2024-03-25', total: '$18,750', status: 'Paid' },
  { id: 'INV-2024-003', account: 'BlueSky Logistics', accountId: 'ACC-002', issueDate: '2024-03-01', dueDate: '2024-04-01', total: '$9,200', status: 'Overdue' },
  { id: 'INV-2024-004', account: 'Coastal Energy Group', accountId: 'ACC-004', issueDate: '2024-03-15', dueDate: '2024-04-15', total: '$31,000', status: 'Issued' },
  { id: 'INV-2024-005', account: 'Pinnacle Health Systems', accountId: 'ACC-006', issueDate: '2024-04-15', dueDate: '2024-05-15', total: '$42,800', status: 'Paid' },
  { id: 'INV-2024-006', account: 'Ironwood Financial', accountId: 'ACC-005', issueDate: '2024-04-20', dueDate: '2024-05-20', total: '$15,600', status: 'Issued' },
  { id: 'INV-2024-007', account: 'SwiftNet Communications', accountId: 'ACC-007', issueDate: '2024-04-25', dueDate: '2024-05-25', total: '$7,300', status: 'Overdue' },
]

export const installations = [
  { id: 'INST-001', account: 'Meridian Technologies', installer: 'Carlos Reyes', date: '2024-05-10', time: '09:00 AM', type: 'Network Setup', status: 'Completed', notes: 'All systems operational' },
  { id: 'INST-002', account: 'Vertex Solutions', installer: 'Angela Park', date: '2024-05-14', time: '10:30 AM', type: 'Software Deployment', status: 'In Progress', notes: 'Phase 2 of 3' },
  { id: 'INST-003', account: 'BlueSky Logistics', installer: 'Marcus Allen', date: '2024-05-16', time: '02:00 PM', type: 'Hardware Install', status: 'Scheduled', notes: 'Client prep required' },
  { id: 'INST-004', account: 'Coastal Energy Group', installer: 'Diana Foster', date: '2024-05-18', time: '08:00 AM', type: 'Full System Setup', status: 'Scheduled', notes: 'Site visit confirmed' },
  { id: 'INST-005', account: 'Pinnacle Health Systems', installer: 'Carlos Reyes', date: '2024-05-08', time: '11:00 AM', type: 'Security Config', status: 'Completed', notes: 'Sign-off received' },
  { id: 'INST-006', account: 'Ironwood Financial', installer: 'Angela Park', date: '2024-05-15', time: '03:00 PM', type: 'Integration Setup', status: 'Issues', notes: 'API auth failure – support engaged' },
  { id: 'INST-007', account: 'SwiftNet Communications', installer: 'Marcus Allen', date: '2024-05-20', time: '09:00 AM', type: 'Network Setup', status: 'Scheduled', notes: 'Equipment on order' },
  { id: 'INST-008', account: 'Granite Construction Co.', installer: 'Diana Foster', date: '2024-05-13', time: '01:00 PM', type: 'Cloud Migration', status: 'In Progress', notes: 'Data transfer at 60%' },
]

export const users = [
  { id: 'USR-001', name: 'Alex Morgan', email: 'a.morgan@saas.io', role: 'Admin', status: 'Active', lastLogin: '2024-05-10 09:15 AM', avatar: 'AM' },
  { id: 'USR-002', name: 'Jordan Lee', email: 'j.lee@saas.io', role: 'Sales Manager', status: 'Active', lastLogin: '2024-05-10 08:42 AM', avatar: 'JL' },
  { id: 'USR-003', name: 'Taylor Smith', email: 't.smith@saas.io', role: 'Operations', status: 'Active', lastLogin: '2024-05-09 04:30 PM', avatar: 'TS' },
  { id: 'USR-004', name: 'Casey Williams', email: 'c.williams@saas.io', role: 'Finance', status: 'Active', lastLogin: '2024-05-10 10:00 AM', avatar: 'CW' },
  { id: 'USR-005', name: 'Morgan Davis', email: 'm.davis@saas.io', role: 'Support', status: 'Inactive', lastLogin: '2024-04-28 02:15 PM', avatar: 'MD' },
  { id: 'USR-006', name: 'Sam Johnson', email: 's.johnson@saas.io', role: 'Admin', status: 'Active', lastLogin: '2024-05-10 07:55 AM', avatar: 'SJ' },
]

export const activities = [
  { id: 1, timestamp: '2024-05-10 10:23 AM', user: 'Jordan Lee', action: 'Updated', entity: 'Account', description: 'Updated status for Meridian Technologies to Active', entityType: 'Account' },
  { id: 2, timestamp: '2024-05-10 09:55 AM', user: 'Alex Morgan', action: 'Created', entity: 'Contract', description: 'Created contract CTR-2024-006 for Pinnacle Health Systems', entityType: 'Contract' },
  { id: 3, timestamp: '2024-05-10 09:30 AM', user: 'Taylor Smith', action: 'Completed', entity: 'Order', description: 'Marked order ORD-2024-001 as completed', entityType: 'Order' },
  { id: 4, timestamp: '2024-05-10 09:12 AM', user: 'Casey Williams', action: 'Generated', entity: 'Invoice', description: 'Generated invoice INV-2024-007 for SwiftNet Communications', entityType: 'Invoice' },
  { id: 5, timestamp: '2024-05-10 08:44 AM', user: 'Jordan Lee', action: 'Added', entity: 'Contact', description: 'Added Thomas Anderson to Vertex Solutions', entityType: 'Account' },
  { id: 6, timestamp: '2024-05-09 05:15 PM', user: 'Taylor Smith', action: 'Scheduled', entity: 'Installation', description: 'Scheduled installation INST-007 for SwiftNet Communications', entityType: 'Order' },
  { id: 7, timestamp: '2024-05-09 03:30 PM', user: 'Alex Morgan', action: 'Approved', entity: 'Contract', description: 'Approved and signed CTR-2024-003 for Vertex Solutions', entityType: 'Contract' },
  { id: 8, timestamp: '2024-05-09 02:00 PM', user: 'Casey Williams', action: 'Recorded', entity: 'Payment', description: 'Recorded payment of $18,750 for INV-2024-002', entityType: 'Invoice' },
  { id: 9, timestamp: '2024-05-09 01:15 PM', user: 'Jordan Lee', action: 'Created', entity: 'Account', description: 'Created new account: Granite Construction Co.', entityType: 'Account' },
  { id: 10, timestamp: '2024-05-09 11:00 AM', user: 'Taylor Smith', action: 'Updated', entity: 'Installation', description: 'Updated INST-006 status to Issues – API auth failure', entityType: 'Order' },
]

export const notifications = [
  { id: 1, icon: 'alert', title: 'Overdue Invoice', description: 'Invoice INV-2024-003 for BlueSky Logistics is 9 days overdue ($9,200)', time: '2 hours ago', read: false },
  { id: 2, icon: 'contract', title: 'Contract Expiring Soon', description: 'Contract CTR-2024-004 for Coastal Energy Group expires in 7 days', time: '4 hours ago', read: false },
  { id: 3, icon: 'install', title: 'Installation Issue', description: 'INST-006 (Ironwood Financial) flagged as Issues – API auth failure detected', time: '5 hours ago', read: false },
  { id: 4, icon: 'order', title: 'New Order Created', description: 'Order ORD-2024-005 for Ironwood Financial has been submitted for approval', time: '1 day ago', read: true },
  { id: 5, icon: 'account', title: 'Account Onboarded', description: 'Meridian Technologies has completed all onboarding tasks', time: '1 day ago', read: true },
  { id: 6, icon: 'payment', title: 'Payment Received', description: 'Payment of $42,800 received for INV-2024-005 (Pinnacle Health Systems)', time: '2 days ago', read: true },
  { id: 7, icon: 'contract', title: 'Contract Signed', description: 'CTR-2024-006 for Pinnacle Health Systems has been signed', time: '3 days ago', read: true },
  { id: 8, icon: 'alert', title: 'Overdue Invoice', description: 'Invoice INV-2024-007 for SwiftNet Communications is now overdue', time: '3 days ago', read: true },
]

export const onboardingAccounts = [
  {
    id: 'ACC-001', name: 'Meridian Technologies', progress: 100, status: 'Completed',
    tasks: [
      { id: 1, name: 'Welcome call scheduled', assignee: 'Jordan Lee', status: 'Completed', dueDate: '2024-01-18' },
      { id: 2, name: 'Technical requirements gathered', assignee: 'Taylor Smith', status: 'Completed', dueDate: '2024-01-22' },
      { id: 3, name: 'System configuration complete', assignee: 'Taylor Smith', status: 'Completed', dueDate: '2024-01-30' },
      { id: 4, name: 'User training delivered', assignee: 'Jordan Lee', status: 'Completed', dueDate: '2024-02-05' },
      { id: 5, name: 'Go-live sign-off obtained', assignee: 'Alex Morgan', status: 'Completed', dueDate: '2024-02-10' },
    ]
  },
  {
    id: 'ACC-003', name: 'Vertex Solutions', progress: 75, status: 'In Progress',
    tasks: [
      { id: 1, name: 'Welcome call scheduled', assignee: 'Jordan Lee', status: 'Completed', dueDate: '2024-02-22' },
      { id: 2, name: 'Technical requirements gathered', assignee: 'Taylor Smith', status: 'Completed', dueDate: '2024-02-28' },
      { id: 3, name: 'System configuration complete', assignee: 'Taylor Smith', status: 'Completed', dueDate: '2024-03-07' },
      { id: 4, name: 'User training delivered', assignee: 'Jordan Lee', status: 'In Progress', dueDate: '2024-03-14' },
      { id: 5, name: 'Go-live sign-off obtained', assignee: 'Alex Morgan', status: 'Pending', dueDate: '2024-03-20' },
    ]
  },
  {
    id: 'ACC-004', name: 'Coastal Energy Group', progress: 50, status: 'In Progress',
    tasks: [
      { id: 1, name: 'Welcome call scheduled', assignee: 'Jordan Lee', status: 'Completed', dueDate: '2024-03-05' },
      { id: 2, name: 'Technical requirements gathered', assignee: 'Taylor Smith', status: 'Completed', dueDate: '2024-03-12' },
      { id: 3, name: 'System configuration complete', assignee: 'Taylor Smith', status: 'In Progress', dueDate: '2024-03-20' },
      { id: 4, name: 'User training delivered', assignee: 'Jordan Lee', status: 'Pending', dueDate: '2024-03-28' },
      { id: 5, name: 'Go-live sign-off obtained', assignee: 'Alex Morgan', status: 'Pending', dueDate: '2024-04-05' },
    ]
  },
  {
    id: 'ACC-006', name: 'Pinnacle Health Systems', progress: 40, status: 'In Progress',
    tasks: [
      { id: 1, name: 'Welcome call scheduled', assignee: 'Jordan Lee', status: 'Completed', dueDate: '2024-04-12' },
      { id: 2, name: 'Technical requirements gathered', assignee: 'Taylor Smith', status: 'Completed', dueDate: '2024-04-19' },
      { id: 3, name: 'System configuration complete', assignee: 'Taylor Smith', status: 'In Progress', dueDate: '2024-04-30' },
      { id: 4, name: 'User training delivered', assignee: 'Jordan Lee', status: 'Pending', dueDate: '2024-05-10' },
      { id: 5, name: 'Go-live sign-off obtained', assignee: 'Alex Morgan', status: 'Pending', dueDate: '2024-05-20' },
    ]
  },
  {
    id: 'ACC-002', name: 'BlueSky Logistics', progress: 20, status: 'At Risk',
    tasks: [
      { id: 1, name: 'Welcome call scheduled', assignee: 'Jordan Lee', status: 'Completed', dueDate: '2024-02-07' },
      { id: 2, name: 'Technical requirements gathered', assignee: 'Taylor Smith', status: 'In Progress', dueDate: '2024-02-15' },
      { id: 3, name: 'System configuration complete', assignee: 'Taylor Smith', status: 'Pending', dueDate: '2024-02-25' },
      { id: 4, name: 'User training delivered', assignee: 'Jordan Lee', status: 'Pending', dueDate: '2024-03-05' },
      { id: 5, name: 'Go-live sign-off obtained', assignee: 'Alex Morgan', status: 'Pending', dueDate: '2024-03-12' },
    ]
  },
]
