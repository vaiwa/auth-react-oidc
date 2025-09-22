import { useAuth } from 'react-oidc-context'
import { Link } from 'react-router-dom'

export const Nav = () => {
  const auth = useAuth()
  console.info('USER', auth.user)

  return (
    <nav className="nav">
      <Link to="/">Home</Link>
      <Link to="/unsecured">Unsecured</Link>
      <Link to="/secured">Secured</Link>
      {!auth.isAuthenticated && <button onClick={() => auth.signinRedirect()}>Login</button>}
      {auth.isAuthenticated && (
        <button
          onClick={() => auth.signoutRedirect({ post_logout_redirect_uri: 'http://localhost:3100/profil/odhlaseni/' })}
        >
          Logout {auth.user?.profile.name}
        </button>
      )}
    </nav>
  )
}
