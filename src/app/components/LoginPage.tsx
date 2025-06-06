'use client';

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {ModalButton} from "@/app/components/ModalButton";
import {Box, CircularProgress} from "@mui/material";

export function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch("/api/checkAuth");
        const data = await res.json();
        if (data.loggedIn) {
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.error("Auth check failed", err);
      }
    };
    checkLogin();
  }, [router]);

  const handleLogin = async () => {
    if (loading) return;
    setLoading(true);
    const password = window.prompt("Please enter your password:");
    if (!password) return;

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({password}),
      });

      if (res.ok) {
        setIsLoggedIn(true);
        setError(null);
        router.push("/admin");
      } else {
        setError("Invalid password. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred. Please try again later.");
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await fetch("/api/logout", {method: "POST"});
      setIsLoggedIn(false);
      setError(null);
      router.push("/");
    } catch (err) {
      console.error("Logout error:", err);
      setError("Logout failed. Please try again.");
    }
    setLoading(false);
  };

  const loginContent = (
    <div className="flex flex-col items-center space-y-4 mt-4">
      {error && <span className="text-red-500 text-sm mb-2">{error}</span>}
      {!isLoggedIn ? (
        <Box>
          <button
            onClick={handleLogin}
            className="h-[50px] px-6 py-2 mt-5 rounded-lg transition-colors font-medium bg-gray-100
                    dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700
                    hover:bg-gray-50 dark:hover:bg-gray-700/80 hover:border-gray-300 dark:hover:border-gray-600"
          >
            Enter Password
          </button>
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
        </Box>
      ) : (
        <div className="text-center">
          <div className="text-green-600 mb-4 font-medium">✓ Successfully logged in!</div>
          <div className="flex flex-row gap-4 mt-6">
            <Box>
              <button
                onClick={() => router.push("/admin")}
                className="px-6 py-2 border-2 border-[var(--fssgold)] rounded-lg transform transition-transform duration-200 hover:scale-105 cursor-pointer "
              >
                Go To Admin Page
              </button>
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
              )}
            </Box>
            <Box>
              <button
                onClick={handleLogout}
                className="px-6 py-2 border-2 border-red-700 rounded-lg transform transition-transform duration-200 hover:scale-105 cursor-pointer"
              >
                Logout
              </button>
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
              )}
            </Box>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <ModalButton
      buttonTitle={isLoggedIn ? "Admin ✓" : "Admin"}
      buttonClass="px-6 py-3  rounded-lg transition-colors font-medium bg-gray-100 dark:bg-gray-800/80
            text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:bg-gray-50
            transform transition-transform duration-200 hover:scale-105 cursor-pointer
            dark:hover:bg-gray-700/80 hover:border-gray-300 dark:hover:border-gray-600"
      modalTitle="Admin Authentication"
      modalBody={loginContent}
    />
  );
}
