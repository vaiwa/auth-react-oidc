import { AuthProvider } from 'react-oidc-context'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Nav } from './components/Nav'
import { PrivateRoute } from './components/PrivateRoute'
import { SecuredRoute } from './components/SecuredRoute'
import { UnsecuredRoute } from './components/UnsecuredRoute'

function App() {
  const oidcConfig = {
    authority: import.meta.env.VITE_OIDC_AUTHORITY,
    client_id: import.meta.env.VITE_OIDC_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_OIDC_REDIRECT_URI,
  }

  console.info('XXX oidcConfig', oidcConfig)

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
