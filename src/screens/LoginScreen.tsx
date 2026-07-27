import { useState } from 'react'
import { TrendingUp, Eye, EyeOff } from 'lucide-react'

interface Props {
  onLogin: () => void
}

export default function LoginScreen({ onLogin }: Props) {
  const [email, setEmail] = useState('alex.morgan@saas.io')
  const [password, setPassword] = useState('password123')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 900))
    setLoading(false)
    onLogin()
  }

  return (
    <div className="min-h-screen bg-slate-50 bg-grid-slate flex items-center justify-center p-4">

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="glass p-8 rounded-3xl animate-fade-in-up">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-3 shadow-md shadow-blue-500/20">
              <TrendingUp size={22} className="text-white" />
            </div>
            <h1 className="text-3xl font-800 text-slate-900 tracking-tight">SalesActivate</h1>
            <p className="text-sm text-slate-500 mt-1">Sales to Activation CRM Platform</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-500 text-slate-700 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 text-sm bg-white/50 border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 placeholder-slate-400/80 transition-all shadow-sm"
                placeholder="you@company.com"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-500 text-slate-700">Password</label>
                <button type="button" className="text-xs text-blue-600 hover:text-blue-700 font-500">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 pr-10 text-sm bg-white/50 border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 placeholder-slate-400/80 transition-all shadow-sm"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2.5">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 accent-blue-600 rounded"
              />
              <label htmlFor="remember" className="text-sm text-slate-600 cursor-pointer">
                Remember me for 30 days
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white text-sm font-600 rounded-xl transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-6">
            Protected by enterprise-grade encryption &nbsp;·&nbsp; SOC 2 Type II certified
          </p>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6 font-500">
          © 2024 SalesActivate Inc. All rights reserved.
        </p>
      </div>
    </div>
  )
}
