'use client';

import { useEffect, useState } from "react";
import { FormContainer, TextFieldElement, Controller } from "react-hook-form-mui";
import { Button, Typography, Card, CardContent, Divider } from "@mui/material";
import DarkModeToggle from "@/app/components/DarkModeToggle";
import { LoginPage } from "@/app/components/LoginPage";

type EmailVerificationForm = {
    email: string;
};

type ClubContinuationForm = {
    clubStatus: boolean;
    extraComments?: string;
};

export default function EmailForm() {
    // Email Verification State
    const [emailVerified, setEmailVerified] = useState(false);
    const [verificationSent, setVerificationSent] = useState(false);
    const [currentEmail, setCurrentEmail] = useState("");
    const [emailLoading, setEmailLoading] = useState(false);

    // Club Form State
    const [buttonState, setButtonState] = useState(true);
    const [clubFormSubmitted, setClubFormSubmitted] = useState(false);

    // Check if emailVerified is in the URL (e.g., /?emailVerified=true)
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get("emailVerified") === "true") {
            setEmailVerified(true);
            setVerificationSent(true);
            const email = params.get("email");
            if (email) {
                const decodedEmail = decodeURIComponent(email);
                setCurrentEmail(decodedEmail);
            }
        }
    }, []);

    const sendVerificationEmail = async (email: string) => {
        if (!email || !email.includes('@')) {
            alert("Please enter a valid email address.");
            return;
        }

        setEmailLoading(true);
        try {
            const res = await fetch('/api/auth/send-verification-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(`Server error: ${res.status} - ${text}`);
            }

            const result = await res.json();
            if (result.success) {
                setVerificationSent(true);
                setCurrentEmail(email);
                alert("Verification email sent! Please check your inbox and click the link.");
            } else {
                alert("Failed to send verification email.");
            }
        } catch (error) {
            console.error('Error sending verification email:', error);
            alert("Failed to send verification email. Please try again.");
        } finally {
            setEmailLoading(false);
        }
    };

    const onEmailSubmit = async (data: EmailVerificationForm) => {
        await sendVerificationEmail(data.email);
    };

    const onClubSubmit = async (data: ClubContinuationForm) => {
        if (!emailVerified) {
            alert("Please verify your email first before submitting the club form.");
            return;
        }

        const submissionData = {
            ...data,
            email: currentEmail,
            submittedAt: new Date().toISOString()
        };

        console.log("Club form submitted with:", submissionData);
        
        // Here you would typically send this to your backend
        // await submitClubContinuationForm(submissionData);
        
        setClubFormSubmitted(true);
        alert(`Club continuation form submitted successfully!\nClub Status: ${data.clubStatus ? 'Continuing' : 'Not Continuing'}\nEmail: ${currentEmail}`);
    };

    return (
        <div className="flex flex-col justify-start items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
            {/* Header */}
            <header className="flex items-center justify-between border-b w-[100vw] h-[10vh] bg-[var(--bars)] mb-6 pl-4 pr-4">
                <div className="justify-start">
                    <LoginPage/>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <h1 className="font-bold text-2xl tracking-wider p-3">ClubNest</h1>
                </div>
                <div className="absolute right-4">
                    <DarkModeToggle/>
                </div>
            </header>

            {/* Back to Home Link */}
            <div className="w-full max-w-[800px] mb-4 px-4">
                <a 
                    href="/" 
                    className="text-[var(--fssgold)] hover:text-gray-500 transition-colors duration-200"
                >
                    ← Back to Home
                </a>
            </div>

            {/* Main Content */}
            <div className="w-full max-w-[800px] mx-auto p-6 mb-auto space-y-8">
                <Typography 
                    variant="h4" 
                    className="text-center mb-8 font-bold tracking-wider"
                >
                    Club Management Portal
                </Typography>

                {/* Step 1: Email Verification */}
                <Card className="shadow-lg">
                    <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-3 ${
                                emailVerified ? 'bg-green-600' : 'bg-blue-600'
                            }`}>
                                {emailVerified ? '✓' : '1'}
                            </div>
                            <Typography variant="h5" className="font-bold">
                                Email Verification
                            </Typography>
                        </div>

                        {!emailVerified ? (
                            <FormContainer<EmailVerificationForm> onSuccess={onEmailSubmit}>
                                <div className="space-y-4">
                                    <Typography variant="body1" className="mb-4">
                                        First, please verify your email address to continue.
                                    </Typography>
                                    
                                    <TextFieldElement
                                        name="email"
                                        label="Your Email Address"
                                        fullWidth
                                        variant="outlined"
                                        type="email"
                                        required
                                        className="bg-white dark:bg-gray-800"
                                    />

                                    <Button 
                                        type="submit"
                                        variant="contained" 
                                        size="large"
                                        disabled={emailLoading || verificationSent}
                                        className="w-full sm:w-auto"
                                    >
                                        {emailLoading 
                                            ? "Sending..." 
                                            : verificationSent 
                                                ? "Verification Email Sent ✓" 
                                                : "Send Verification Email"
                                        }
                                    </Button>

                                    {verificationSent && (
                                        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                                            <Typography variant="body2" className="text-blue-800 dark:text-blue-200">
                                                📧 We've sent a verification email to <strong>{currentEmail}</strong>. 
                                                Please check your inbox and click the verification link to continue.
                                            </Typography>
                                        </div>
                                    )}
                                </div>
                            </FormContainer>
                        ) : (
                            <div className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                                <div className="text-green-600 text-2xl">✅</div>
                                <div>
                                    <Typography variant="body1" className="font-semibold text-green-800 dark:text-green-200">
                                        Email Verified Successfully!
                                    </Typography>
                                    <Typography variant="body2" className="text-green-600 dark:text-green-300">
                                        {currentEmail}
                                    </Typography>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Divider />

                {/* Step 2: Club Continuation Form */}
                <Card className={`shadow-lg ${!emailVerified ? 'opacity-50' : ''}`}>
                    <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-3 ${
                                clubFormSubmitted ? 'bg-green-600' : emailVerified ? 'bg-blue-600' : 'bg-gray-400'
                            }`}>
                                {clubFormSubmitted ? '✓' : '2'}
                            </div>
                            <Typography variant="h5" className="font-bold">
                                Club Continuation Status
                            </Typography>
                        </div>

                        {!emailVerified ? (
                            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <Typography variant="body1" className="text-center text-gray-600 dark:text-gray-400">
                                    Please complete email verification first to access the club form.
                                </Typography>
                            </div>
                        ) : !clubFormSubmitted ? (
                            <FormContainer<ClubContinuationForm> 
                                onSuccess={onClubSubmit} 
                                defaultValues={{ clubStatus: true }}
                            >
                                <div className="space-y-6">
                                    <Typography variant="body1" className="mb-4">
                                        Please let us know if your club will continue operating next year.
                                    </Typography>

                                    {/* Club Status Toggle */}
                                    <div>
                                        <Typography variant="h6" className="mb-3">
                                            Will your club continue next year? *
                                        </Typography>
                                        <Controller
                                            name="clubStatus"
                                            render={({ field }) => (
                                                <Button
                                                    variant="contained"
                                                    size="large"
                                                    className={`w-40 h-12 font-bold ${
                                                        buttonState 
                                                            ? 'bg-green-600 hover:bg-green-700' 
                                                            : 'bg-red-600 hover:bg-red-700'
                                                    }`}
                                                    onClick={() => {
                                                        const newState = !buttonState;
                                                        setButtonState(newState);
                                                        field.onChange(newState);
                                                    }}
                                                >
                                                    {buttonState ? "✓ Yes, Continuing" : "✗ No, Not Continuing"}
                                                </Button>
                                            )}
                                        />
                                    </div>

                                    {/* Comments Section */}
                                    <div>
                                        <Typography variant="h6" className="mb-3">
                                            Additional Comments (Optional)
                                        </Typography>
                                        <TextFieldElement
                                            name="extraComments"
                                            label="Any additional information about your club's status, changes, or concerns"
                                            fullWidth
                                            multiline
                                            rows={4}
                                            variant="outlined"
                                            className="bg-white dark:bg-gray-800"
                                            placeholder="e.g., Change in leadership, meeting times, membership numbers, etc."
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <Button 
                                        type="submit" 
                                        variant="contained" 
                                        size="large"
                                        fullWidth 
                                        className="h-12 font-bold bg-[var(--fssgold)] hover:bg-yellow-600"
                                    >
                                        Submit Club Continuation Form
                                    </Button>
                                </div>
                            </FormContainer>
                        ) : (
                            <div className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                                <div className="text-green-600 text-2xl">🎉</div>
                                <div>
                                    <Typography variant="body1" className="font-semibold text-green-800 dark:text-green-200">
                                        Club Form Submitted Successfully!
                                    </Typography>
                                    <Typography variant="body2" className="text-green-600 dark:text-green-300">
                                        Thank you for updating your club's continuation status.
                                    </Typography>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Instructions */}
                <Card className="bg-gray-50 dark:bg-gray-800">
                    <CardContent className="p-6">
                        <Typography variant="h6" className="mb-3 font-bold">
                            📋 Instructions
                        </Typography>
                        <div className="space-y-2">
                            <Typography variant="body2">
                                <strong>Step 1:</strong> Enter your email address and verify it by clicking the link sent to your inbox
                            </Typography>
                            <Typography variant="body2">
                                <strong>Step 2:</strong> Complete the club continuation form to let us know your club's status for next year
                            </Typography>
                            <Typography variant="body2" className="text-blue-600 dark:text-blue-400">
                                <strong>Note:</strong> Both steps must be completed. Email verification is required for security purposes.
                            </Typography>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Footer */}
            <footer className="flex items-center justify-center border-t w-[100vw] h-[8vh] bg-[var(--bars)] mt-6">
                <h3 className="text-center justify-center items-center text-[var(--fssgold)]">
                    Have any problems? Shoot us an email at{' '}
                    <a
                        href="mailto:falconsoftwaresolutions27@gmail.com"
                        className="underline hover:text-gray-500 transition-colors duration-200"
                    >
                        falconsoftwaresolutions27@gmail.com
                    </a>
                </h3>
            </footer>
        </div>
    );
}