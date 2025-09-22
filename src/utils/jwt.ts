import { jwtDecode } from 'jwt-decode'

export interface JwtPayload {
  sub?: string
  iss?: string
  aud?: string | string[]
  exp?: number
  iat?: number
  nbf?: number
  jti?: string
  scope?: string
  roles?: string[]
  email?: string
  name?: string
  preferred_username?: string
  given_name?: string
  family_name?: string
  [key: string]: unknown
}

/**
 * Safely decode a JWT token and return its payload
 * @param token - The JWT token string
 * @returns The decoded JWT payload or null if decoding fails
 */
export const decodeJwtToken = (token: string | undefined): JwtPayload | null => {
  if (!token) return null
  try {
    const decoded = jwtDecode<JwtPayload>(token)
    return decoded
  } catch (error) {
    console.error('Failed to decode JWT token:', error)
    return null
  }
}

/**
 * Check if a JWT token is expired
 * @param token - The JWT token string
 * @returns true if token is expired, false otherwise
 */
export const isTokenExpired = (token: string | undefined): boolean => {
  const decoded = decodeJwtToken(token)
  if (!decoded || !decoded.exp) return true

  const currentTime = Math.floor(Date.now() / 1000)
  return decoded.exp < currentTime
}

/**
 * Get time until token expires in seconds
 * @param token - The JWT token string
 * @returns seconds until expiration, or 0 if expired/invalid
 */
export const getTokenExpirationTime = (token: string | undefined): number => {
  const decoded = decodeJwtToken(token)
  if (!decoded || !decoded.exp) return 0

  const currentTime = Math.floor(Date.now() / 1000)
  const timeUntilExpiration = decoded.exp - currentTime
  return Math.max(0, timeUntilExpiration)
}
