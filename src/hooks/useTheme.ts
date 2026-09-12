import { useCallback, useEffect, useRef, useState } from 'react'

export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'portfolio-theme'
const TRANSITION_CLASS = 'theme-transition'
const TRANSITION_DURATION_MS = 220

function isTheme(value: string | null): value is Theme {
  return value === 'dark' || value === 'light'
}

function readStoredTheme(): Theme | null {
  try {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY)
    return isTheme(storedTheme) ? storedTheme : null
  } catch {
    return null
  }
}

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark'
}

function getCurrentTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'dark'
  }

  const documentTheme = document.documentElement.getAttribute('data-theme')

  if (isTheme(documentTheme)) {
    return documentTheme
  }

  return readStoredTheme() ?? getSystemTheme()
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getCurrentTheme)
  const transitionTimeoutRef = useRef<number | null>(null)

  const applyTheme = useCallback(
    (
      nextTheme: Theme,
      options: { persist?: boolean; transition?: boolean },
    ) => {
      const root = document.documentElement
      const shouldTransition = options.transition && !prefersReducedMotion()

      if (transitionTimeoutRef.current !== null) {
        window.clearTimeout(transitionTimeoutRef.current)
      }

      if (shouldTransition) {
        root.classList.add(TRANSITION_CLASS)
      }

      root.setAttribute('data-theme', nextTheme)
      setThemeState(nextTheme)

      if (options.persist) {
        try {
          window.localStorage.setItem(STORAGE_KEY, nextTheme)
        } catch {
          // The visible theme should still update if storage is unavailable.
        }
      }

      if (shouldTransition) {
        transitionTimeoutRef.current = window.setTimeout(() => {
          root.classList.remove(TRANSITION_CLASS)
          transitionTimeoutRef.current = null
        }, TRANSITION_DURATION_MS)
      }
    },
    [],
  )

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current !== null) {
        window.clearTimeout(transitionTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)')

    const handleSystemThemeChange = () => {
      if (readStoredTheme() === null) {
        applyTheme(getSystemTheme(), { transition: true })
      }
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [applyTheme])

  const toggleTheme = useCallback(() => {
    applyTheme(theme === 'dark' ? 'light' : 'dark', {
      persist: true,
      transition: true,
    })
  }, [applyTheme, theme])

  return {
    theme,
    toggleTheme,
  }
}
