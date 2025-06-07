"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ModalButton } from "@/app/components/ModalButton"
import { Box, CircularProgress, Link } from "@mui/material"

export function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch("/api/checkAuth")
        const data = await res.json()
        if (data.loggedIn) {
          setIsLoggedIn(true)
        }
      } catch (err) {
        console.error("Auth check failed", err)
      }
    }
    checkLogin()
  }, [router])

  const handleLogin = async () => {
    if (loading) return
    setLoading(true)
    const password = window.prompt("Please enter your password:")
    if (!password) {
      setLoading(false)
      return
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        setIsLoggedIn(true)
        setError(null)
        router.push("/admin")
      } else {
        setError("Invalid password. Please try again.")
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("An unexpected error occurred. Please try again later.")
    }
    setLoading(false)
  }

  const handleLogout = async () => {
    if (loading) return
    setLoading(true)
    try {
      await fetch("/api/logout", { method: "POST" })
      setIsLoggedIn(false)
      setError(null)
      router.push("/")
    } catch (err) {
      console.error("Logout error:", err)
      setError("Logout failed. Please try again.")
    }
    setLoading(false)
  }

  const loginContent = (
    <div className="flex flex-col items-center space-y-4 mt-4">
      {error && <span className="text-red-500 text-sm mb-2">{error}</span>}
      {!isLoggedIn ? (
        <Box position="relative">
          <button
            onClick={handleLogin}
            className="h-[50px] px-6 py-2 mt-5 rounded-xl text-sm font-semibold transition-all duration-300 ease-out
                    border transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-md
                    bg-[var(--mid)] text-[var(--foreground)] border-[var(--border)]
                    hover:bg-[var(--background)] hover:border-[var(--fssgold)]/50
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--fssgold)]/50"
            disabled={loading}
          >
            Enter Password
          </button>
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
                color: "var(--fssgold)",
              }}
            />
          )}
        </Box>
      ) : (
        <div className="text-center">
          <div className="text-green-600 mb-4 font-medium">✓ Successfully logged in!</div>
          <div className="flex flex-row gap-4 mt-6">
            <Box position="relative">
              <Link href="/admin" underline="none">
                <button
                  className="px-6 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ease-out
                          border transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-md
                          bg-[var(--fssgold)] text-[var(--background)] border-[var(--fssgold)]"
                  disabled={loading}
                >

                  Go To Admin Page
                </button>
              </Link>
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                    color: "var(--background)",
                  }}
                />
              )}
            </Box>
            <Box position="relative">
              <button
                onClick={handleLogout}
                className="px-6 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ease-out
                        border transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-md
                        bg-[var(--mid)] text-[var(--foreground)] border-red-500
                        hover:bg-red-500 hover:text-white"
                disabled={loading}
              >
                Logout
              </button>
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                    color: "var(--foreground)",
                  }}
                />
              )}
            </Box>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <ModalButton
      buttonTitle={isLoggedIn ? "Admin ✓" : "Admin"}
      buttonClass="px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ease-out
                border transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-md
                bg-[var(--mid)] text-[var(--foreground)] border-[var(--border)]
                hover:bg-[var(--background)] hover:border-[var(--fssgold)]/50
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--fssgold)]/50"
      modalTitle="Admin Authentication"
      modalBody={loginContent}
    />
  )
}
