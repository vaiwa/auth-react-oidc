import { useAuth } from 'react-oidc-context'
import { useToken } from '../hooks/useToken'

export const SecuredRoute = () => {
  const auth = useAuth()
  const { accessToken, idToken, isExpired, isValid } = useToken()

  return (
    <div>
      <h1>Secured Page</h1>
      <p>This is a protected page. You are authenticated!</p>
      {auth.user && (
        <div>
          <h2>User Information:</h2>
          <p>
            <strong>Name:</strong> {auth.user.profile.name}
          </p>
          <p>
            <strong>Email:</strong> {auth.user.profile.email}
          </p>
          <p>
            <strong>Subject:</strong> {auth.user.profile.sub}
          </p>
          <details>
            <summary>Full User Profile</summary>
            <pre>{JSON.stringify(auth.user.profile, null, 2)}</pre>
          </details>

          <hr />

          {accessToken && (
            <>
              <details>
                <summary>Full Access Token</summary>
                <pre>{JSON.stringify(accessToken, null, 2)}</pre>
                <span>Token: {isValid ? '✅ Valid' : '❌ Invalid'}</span>
                {isExpired && <span style={{ color: 'red', marginLeft: '10px' }}>⚠️ EXPIRED</span>}
              </details>
            </>
          )}

          <hr />

          {idToken && (
            <details>
              <summary>Full ID Token</summary>
              <pre>{JSON.stringify(idToken, null, 2)}</pre>
            </details>
          )}
        </div>
      )}
    </div>
  )
}
