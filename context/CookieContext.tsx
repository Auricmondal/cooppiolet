'use client'

import React, { createContext, useEffect, useContext, useReducer, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'

// --- 1. Pure Helper Functions ---
const setCookie = (name: string, value: string, days = 365) => {
  if (typeof document === 'undefined') return
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/;SameSite=Lax`
}

const getCookie = (name: string) => {
  if (typeof document === 'undefined') return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null
  return null
}

// --- 2. State & Reducer Setup ---
interface CookieState {
  isInitialized: boolean
  anonymousId: string | null
  hasAcceptedCookies: boolean
  hasRespondedToCookies: boolean
  isSubscribed: boolean
}

interface CookieContextProps extends CookieState {
  acceptCookies: () => void
  denyCookies: () => void
  setSubscriptionStatus: (status: boolean) => void
}

type Action =
  | { type: 'HYDRATE'; payload: Partial<CookieState> }
  | { type: 'ACCEPT_COOKIES' }
  | { type: 'DENY_COOKIES' }
  | { type: 'SET_SUBSCRIPTION'; payload: boolean }

const initialState: CookieState = {
  isInitialized: false,
  anonymousId: null,
  hasAcceptedCookies: false,
  hasRespondedToCookies: false,
  isSubscribed: false,
}

const cookieReducer = (state: CookieState, action: Action): CookieState => {
  switch (action.type) {
    case 'HYDRATE':
      return { ...state, ...action.payload, isInitialized: true }
    case 'ACCEPT_COOKIES':
      return { ...state, hasAcceptedCookies: true, hasRespondedToCookies: true }
    case 'DENY_COOKIES':
      return { ...state, hasRespondedToCookies: true }
    case 'SET_SUBSCRIPTION':
      return { ...state, isSubscribed: action.payload }
    default:
      return state
  }
}

export const CookieContext = createContext<CookieContextProps | undefined>(undefined)

// --- 3. The Provider ---
export const CookieProvider = ({ children }: { children: React.ReactNode }) => {
  // Replaced useState entirely with useReducer
  const [state, dispatch] = useReducer(cookieReducer, initialState)

  useEffect(() => {
    // 1. Handle all the reading and ID generation outside of React's state cycle
    let currentId = getCookie('anonymous_id')
    if (!currentId) {
      currentId = uuidv4()
      setCookie('anonymous_id', currentId)
    }

    const accepted = getCookie('cookie_accepted') === 'true'
    const responded = getCookie('cookie_responded') === 'true' || accepted
    const subscribed = getCookie('newsletter_subscribed') === 'true'

    // 2. Fire a single, clean dispatch action. No setState loops here.
    dispatch({
      type: 'HYDRATE',
      payload: {
        anonymousId: currentId,
        hasAcceptedCookies: accepted,
        hasRespondedToCookies: responded,
        isSubscribed: subscribed,
      },
    })
  }, []) // Empty array is totally safe here

  // --- Actions ---
  const acceptCookies = () => {
    setCookie('cookie_accepted', 'true')
    dispatch({ type: 'ACCEPT_COOKIES' })
  }

  const denyCookies = () => {
    dispatch({ type: 'DENY_COOKIES' })
  }

  const setSubscriptionStatus = (status: boolean) => {
    setCookie('newsletter_subscribed', status.toString())
    dispatch({ type: 'SET_SUBSCRIPTION', payload: status })
  }

  // Memoize to prevent child re-renders
  const contextValue = useMemo(
    () => ({
      ...state,
      acceptCookies,
      denyCookies,
      setSubscriptionStatus,
    }),
    [state]
  )

  return <CookieContext.Provider value={contextValue}>{children}</CookieContext.Provider>
}

export const useUserTracking = () => {
  const context = useContext(CookieContext)
  if (!context) throw new Error('useUserTracking must be used within a CookieProvider')
  return context
}
