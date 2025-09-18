import { useAuth } from 'react-oidc-context'

export const SecuredRoute = () => {
  const auth = useAuth()

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
        </div>
      )}
    </div>
  )
}
