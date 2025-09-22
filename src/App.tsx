import { AuthProvider } from 'react-oidc-context'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { WebStorageStateStore } from 'oidc-client-ts'
import './App.css'
import { Nav } from './components/Nav'
import { PrivateRoute } from './components/PrivateRoute'
import { SecuredRoute } from './components/SecuredRoute'
import { UnsecuredRoute } from './components/UnsecuredRoute'

function App() {
  const extraConfig =
    import.meta.env.VITE_OIDC_USE_KEYCLOAK === 'true'
      ? {}
      : {
          scope: 'basic profile openid',
          extraQueryParams: { resource: 'urn:ct:graphql-internal' },
          extraTokenParams: { resource: 'urn:ct:graphql-internal' },
          client_secret: import.meta.env.VITE_OIDC_CLIENT_SECRET,
        }

  const oidcConfig = {
    authority: import.meta.env.VITE_OIDC_AUTHORITY,
    client_id: import.meta.env.VITE_OIDC_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_OIDC_REDIRECT_URI,
    userStore: new WebStorageStateStore({ store: window.localStorage }),
    ...extraConfig,
  }

  console.info('oidcConfig', oidcConfig)

  return (
    <BrowserRouter>
      <AuthProvider {...oidcConfig}>
        <div className="App">
          <Nav />
          <Routes>
            <Route
              path="/secured"
              element={
                <PrivateRoute>
                  <SecuredRoute />
                </PrivateRoute>
              }
            />
            <Route path="/unsecured" element={<UnsecuredRoute />} />
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/profil/prihlaseni/" element={<h1>Profil - Přihlášení</h1>} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
