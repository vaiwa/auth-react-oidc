import { useAuth } from 'react-oidc-context'
import { Link } from 'react-router-dom'

export const Nav = () => {
  const auth = useAuth()
  console.info('USER', auth.user)

  const handleLogout = () => {
    if (import.meta.env.VITE_OIDC_USE_KEYCLOAK === 'true') {
      return auth.signoutSilent()
    }
    auth.signoutRedirect({ post_logout_redirect_uri: 'http://localhost:3100/profil/odhlaseni/' })
  }

  return (
    <nav className="nav">
      <Link to="/">Home</Link>
      <Link to="/unsecured">Unsecured</Link>
      <Link to="/secured">Secured</Link>
      {!auth.isAuthenticated && <button onClick={() => auth.signinRedirect()}>Login</button>}
      {auth.isAuthenticated && <button onClick={handleLogout}>Logout {auth.user?.profile.name}</button>}
    </nav>
  )
}
