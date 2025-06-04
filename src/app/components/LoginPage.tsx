'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ModalButton } from "@/app/components/ModalButton";

export function LoginPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
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

    console.log(isLoggedIn);

    const handleLogin = async () => {
        const password = window.prompt("Please enter your password:");
        if (!password) return;

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
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
    };

    const handleLogout = async () => {
        try {
            await fetch("/api/logout", { method: "POST" });
            setIsLoggedIn(false);
            setError(null);
            router.push("/");
        } catch (err) {
            console.error("Logout error:", err);
            setError("Logout failed. Please try again.");
        }
    };

    const loginContent = (
        <div className="flex flex-col items-center space-y-4 mt-4">
            {error && <span className="text-red-500 text-sm mb-2">{error}</span>}
            {!isLoggedIn ? (
                <button
                    onClick={handleLogin}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                    Enter Password
                </button>
            ) : (
                <div className="text-center">
                    <div className="text-green-600 mb-4 font-medium">✓ Successfully logged in!</div>
                    <div className="flex flex-row gap-4 mt-6">
                        <button
                            onClick={() => router.push("/admin")}
                            className="px-6 py-2 border-2 border-[var(--fssgold)] rounded-lg transform transition-transform duration-200 hover:scale-105 cursor-pointer "
                        >
                            Go To Admin Page
                        </button>
                        <button
                            onClick={handleLogout}
                            className="px-6 py-2 border-2 border-red-700 rounded-lg transform transition-transform duration-200 hover:scale-105 cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <ModalButton
            buttonTitle={isLoggedIn ? "Admin ✓" : "Admin"}
            buttonClass="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            modalTitle="Admin Authentication"
            modalBody={loginContent}
        />
    );
}
