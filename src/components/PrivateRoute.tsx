import { type ReactNode } from 'react'
import { useAuth } from 'react-oidc-context'
import { Navigate } from 'react-router-dom'

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const auth = useAuth()
  const isLoggedIn = auth.isAuthenticated
  if (!isLoggedIn) return <Navigate to="/" />
  return children
}
