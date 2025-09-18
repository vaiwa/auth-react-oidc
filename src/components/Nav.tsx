import { useAuth } from 'react-oidc-context'
import { Link } from 'react-router-dom'

export const Nav = () => {
  const auth = useAuth()
  return (
    <nav className="nav">
      <Link to="/">Home</Link>
      <Link to="/unsecured">Unsecured</Link>
      <Link to="/secured">Secured</Link>
      {!auth.isAuthenticated && <button onClick={() => auth.signinRedirect()}>Login</button>}
      {auth.isAuthenticated && <button onClick={() => auth.signoutRedirect()}>Logout {auth.user?.profile.name}</button>}
    </nav>
  )
}
