import { useMemo } from 'react'
import { useAuth } from 'react-oidc-context'
import { decodeJwtToken, isTokenExpired, getTokenExpirationTime, type JwtPayload } from '../utils/jwt'

export interface UseAccessTokenResult {
  /** The decoded JWT payload, null if no token or invalid token */
  accessToken: JwtPayload | null
  /** The decoded ID token payload, null if no token or invalid token */
  idToken: JwtPayload | null
  /** Whether the token is expired */
  isExpired: boolean
  /** Time remaining until token expires in seconds */
  expirationTime: number
  /** The raw access token string */
  rawAccessToken: string | undefined
  /** Whether user is authenticated and has a valid token */
  isValid: boolean
}

/**
 * Custom hook that provides decoded access token information with memoization
 * The decoding is only performed when the token changes, improving performance
 */
export const useToken = (): UseAccessTokenResult => {
  const auth = useAuth()
  const rawAccessToken = auth.user?.access_token
  const rawIdToken = auth.user?.id_token

  const accessToken = useMemo(() => decodeJwtToken(rawAccessToken), [rawAccessToken])
  const idToken = useMemo(() => decodeJwtToken(rawIdToken), [rawIdToken])
  const isExpired = useMemo(() => isTokenExpired(rawAccessToken), [rawAccessToken])
  const expirationTime = useMemo(() => getTokenExpirationTime(rawAccessToken), [rawAccessToken])
  const isValid = Boolean(rawAccessToken && accessToken && !isExpired)

  return { accessToken, idToken, isExpired, expirationTime, rawAccessToken, isValid }
}
