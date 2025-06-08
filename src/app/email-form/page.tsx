'use client';

import { useEffect, useState } from "react";
import { FormContainer, TextFieldElement, Controller } from "react-hook-form-mui";
import { Button, Typography, Card, CardContent, Divider, Autocomplete, TextField } from "@mui/material";
import DarkModeToggle from "@/app/components/DarkModeToggle";
import { LoginPage } from "@/app/components/LoginPage";
import { SlideInNode, FadeInNode } from "@/app/components/Animations";
import { getClubs } from "@/lib/localstorage";

type EmailVerificationForm = {
    email: string;
};

export type Club = {
    name: string;
    sponsors_name: string[];
    sponsors_contact: string[];
    student_leads_name: string[];
    student_leads_contact: string[];
    type: string;
    description?: string | undefined;
    time?: string | undefined;
    location?: string | undefined;
    other?: string | undefined;
    approved: number; // 0 = NOT, 1 = ARCHIVED, 2 = APPROVED
};

type ClubContinuationForm = {
    clubStatus: boolean;
    extraComments?: string;
    club: Club;
};

type EmailFormProps = {
    clubs?: Club[];
};

const clubs = await getClubs()

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

        // Check if the verified email is associated with the selected club
        const isEmailAuthorized = checkEmailAuthorization(currentEmail, data.club);
        if (!isEmailAuthorized) {
            alert(`Access denied: The email ${currentEmail} is not associated with ${data.club.name}. Only club sponsors and student leads can submit this form.`);
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
        alert(`Club continuation form submitted successfully!\nClub: ${data.club.name}\nClub Status: ${data.clubStatus ? 'Continuing' : 'Not Continuing'}\nEmail: ${currentEmail}`);
    };

    // Helper function to check if email is authorized for the club
    const checkEmailAuthorization = (email: string, club: Club): boolean => {
        const normalizedEmail = email.toLowerCase().trim();
        
        // Check if email matches any sponsor contact
        const sponsorEmails = club.sponsors_contact.map(contact => contact.toLowerCase().trim());
        if (sponsorEmails.includes(normalizedEmail)) {
            return true;
        }
        
        // Check if email matches any student lead contact
        const studentLeadEmails = club.student_leads_contact.map(contact => contact.toLowerCase().trim());
        if (studentLeadEmails.includes(normalizedEmail)) {
            return true;
        }
        
        return false;
    };

    const textFieldStyling = {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'var(--border)',
            },
            '&:hover fieldset': {
                borderColor: 'var(--fssgold)',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'var(--fssgold)',
            },
        },
        '& .MuiInputLabel-root': {
            color: 'var(--foreground)',
        },
    };

    return (
        <div className="flex flex-col justify-start items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
            {/* Header */}
            <header className="flex items-center justify-between border-b w-[100vw] h-[10vh] bg-[var(--bars)] mb-6 pl-4 pr-4">
                <div className="justify-start">
                    <LoginPage/>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <h1 className="font-bold text-2xl tracking-wider p-3 cursor-pointer"
                        onClick={() => window.location.href = '/'}>ClubNest</h1>
                </div>
                <div className="absolute right-4">
                    <DarkModeToggle/>
                </div>
            </header>

            <div className="flex flex-col flex-grow w-full items-center">
                {/* Back to Home Link */}
                <FadeInNode
                    node={
                        <div className="w-[90dvw] max-w-[1200px] mb-6">
                            <a 
                                href="/" 
                                className="text-[var(--fssgold)] hover:text-gray-500 transition-colors duration-200 font-medium"
                            >
                                ← Back to Home
                            </a>
                        </div>
                    }
                    duration={0.2}
                />

                {/* Main Content */}
                <div className="w-[90dvw] max-w-[1200px] flex flex-col items-center space-y-8 mb-auto pb-8">
                    <SlideInNode
                        node={
                            <h1 className="font-bold text-3xl !text-[var(--foreground)] text-center tracking-wide text-shadow-white-500/50">
                                Club Management Portal
                            </h1>
                        }
                        duration={0.5}
                    />

                    {/* Step 1: Email Verification */}
                    <FadeInNode
                        node={
                            <div className="w-full max-w-[800px]">
                                <div className="bg-[var(--mid)] border border-[var(--border)] rounded-2xl shadow-xl p-6 transform transition-transform duration-200 hover:scale-[1.01]">
                                    <div className="flex items-center mb-6">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-4 text-lg ${
                                            emailVerified ? 'bg-green-600' : 'bg-[var(--fssgold)]'
                                        }`}>
                                            {emailVerified ? '✓' : '1'}
                                        </div>
                                        <h2 className="font-bold text-xl tracking-wide text-[var(--foreground)]">
                                            Email Verification
                                        </h2>
                                    </div>

                                    {!emailVerified ? (
                                        <FormContainer<EmailVerificationForm> onSuccess={onEmailSubmit}>
                                            <div className="space-y-6">
                                                <p className="text-[var(--foreground)] mb-6">
                                                    First, please verify your email address to continue.
                                                </p>
                                                
                                                <TextFieldElement
                                                    name="email"
                                                    label="Your Email Address"
                                                    fullWidth
                                                    variant="outlined"
                                                    type="email"
                                                    required
                                                    className="bg-[var(--background)] rounded-lg"
                                                    sx={textFieldStyling}
                                                />

                                                <Button 
                                                    type="submit"
                                                    variant="contained" 
                                                    size="large"
                                                    disabled={emailLoading || verificationSent}
                                                    className="w-full sm:w-auto h-12 font-bold bg-[var(--fssgold)] hover:bg-yellow-600 transform transition-transform duration-200 hover:scale-105"
                                                >
                                                    {emailLoading 
                                                        ? "Sending..." 
                                                        : verificationSent 
                                                            ? "Verification Email Sent ✓" 
                                                            : "Send Verification Email"
                                                    }
                                                </Button>

                                                {verificationSent && (
                                                    <div className="mt-6 p-4 bg-blue-600/20 border border-blue-600/30 rounded-lg">
                                                        <p className="text-[var(--foreground)]">
                                                            📧 We've sent a verification email to <strong className="text-[var(--fssgold)]">{currentEmail}</strong>. 
                                                            Please check your inbox and click the verification link to continue.
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </FormContainer>
                                    ) : (
                                        <div className="flex items-center space-x-4 p-4 bg-green-600/20 border border-green-600/30 rounded-lg">
                                            <div className="text-green-400 text-3xl">✅</div>
                                            <div>
                                                <p className="font-semibold text-[var(--foreground)] text-lg">
                                                    Email Verified Successfully!
                                                </p>
                                                <p className="text-[var(--fssgold)]">
                                                    {currentEmail}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        }
                        duration={0.6}
                    />

                    {/* Step 2: Club Continuation Form */}
                    <FadeInNode
                        node={
                            <div className="w-full max-w-[800px]">
                                <div className={`bg-[var(--mid)] border border-[var(--border)] rounded-2xl shadow-xl p-6 transform transition-transform duration-200 hover:scale-[1.01] ${
                                    !emailVerified ? 'opacity-50' : ''
                                }`}>
                                    <div className="flex items-center mb-6">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-4 text-lg ${
                                            clubFormSubmitted ? 'bg-green-600' : emailVerified ? 'bg-[var(--fssgold)]' : 'bg-gray-400'
                                        }`}>
                                            {clubFormSubmitted ? '✓' : '2'}
                                        </div>
                                        <h2 className="font-bold text-xl tracking-wide text-[var(--foreground)]">
                                            Club Continuation Status
                                        </h2>
                                    </div>

                                    {!emailVerified ? (
                                        <div className="p-6 bg-gray-600/20 border border-gray-600/30 rounded-lg text-center">
                                            <p className="text-[var(--foreground)]">
                                                Please complete email verification first to access the club form.
                                            </p>
                                        </div>
                                    ) : !clubFormSubmitted ? (
                                        <FormContainer<ClubContinuationForm> 
                                            onSuccess={onClubSubmit} 
                                            defaultValues={{ clubStatus: true, club: null as any }}
                                        >
                                            <div className="space-y-8">
                                                <p className="text-[var(--foreground)] mb-6">
                                                    Please select your club and let us know if it will continue operating next year. Note: Only club sponsors and student leads can submit this form.
                                                </p>

                                                {/* Club Selection */}
                                                <div>
                                                    <h3 className="font-bold text-lg text-[var(--foreground)] mb-4">
                                                        Select Your Club *
                                                    </h3>
                                                    <Controller
                                                        name="club"
                                                        rules={{ required: 'Please select a club' }}
                                                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                                                            <Autocomplete
                                                                sx={{
                                                                    color: 'white',
                                                                    '& .MuiSvgIcon-root': {
                                                                        color: 'var(--foreground)',
                                                                    },
                                                                    ...textFieldStyling
                                                                }}
                                                                options={clubs.filter((c: Club) => c.approved === 2)}
                                                                getOptionLabel={(option: Club) => option.name}
                                                                value={value || null}
                                                                onChange={(_, newValue) => onChange(newValue)}
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        label="Select Your Club"
                                                                        placeholder="Search for your club..."
                                                                        error={!!error}
                                                                        helperText={error?.message}
                                                                        className="bg-[var(--background)] rounded-lg"
                                                                        sx={textFieldStyling}
                                                                    />
                                                                )}
                                                            />
                                                        )}
                                                    />
                                                </div>

                                                {/* Club Status Toggle */}
                                                <div>
                                                    <h3 className="font-bold text-lg text-[var(--foreground)] mb-4">
                                                        Will your club continue next year? *
                                                    </h3>
                                                    <Controller
                                                        name="clubStatus"
                                                        render={({ field }) => (
                                                            <Button
                                                                size="large"
                                                                className={`w-48 h-12 font-bold transform transition-all duration-200 hover:scale-105 ${
                                                                    buttonState 
                                                                        ? 'bg-green-600 hover:bg-green-700 text-white' 
                                                                        : 'bg-red-600 hover:bg-red-700 text-white'
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
                                                    <h3 className="font-bold text-lg text-[var(--foreground)] mb-4">
                                                        Additional Comments (Optional)
                                                    </h3>
                                                    <TextFieldElement
                                                        name="extraComments"
                                                        label="Any additional information about your club's status, changes, or concerns"
                                                        fullWidth
                                                        multiline
                                                        rows={4}
                                                        variant="outlined"
                                                        className="bg-[var(--background)] rounded-lg"
                                                        placeholder="e.g., Change in leadership, meeting times, membership numbers, etc."
                                                        sx={textFieldStyling}
                                                    />
                                                </div>

                                                {/* Submit Button */}
                                                <Button 
                                                    type="submit" 
                                                    size="large"
                                                    fullWidth 
                                                    className="h-12 font-bold bg-[var(--fssgold)] hover:bg-yellow-600 transform transition-transform duration-200 hover:scale-105"
                                                >
                                                    Submit Club Continuation Form
                                                </Button>
                                            </div>
                                        </FormContainer>
                                    ) : (
                                        <div className="flex items-center space-x-4 p-4 bg-green-600/20 border border-green-600/30 rounded-lg">
                                            <div className="text-green-400 text-3xl">🎉</div>
                                            <div>
                                                <p className="font-semibold text-[var(--foreground)] text-lg">
                                                    Club Form Submitted Successfully!
                                                </p>
                                                <p className="text-[var(--fssgold)]">
                                                    Thank you for updating your club's continuation status.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        }
                        duration={0.8}
                    />

                    {/* Instructions */}
                    <FadeInNode
                        node={
                            <div className="w-full max-w-[800px]">
                                <div className="bg-[var(--mid)] border border-[var(--border)] rounded-2xl shadow-xl p-6 transform transition-transform duration-200 hover:scale-[1.01]">
                                    <h3 className="font-bold text-xl text-[var(--fssgold)] mb-4 flex items-center">
                                        📋 Instructions
                                    </h3>
                                    <div className="space-y-3">
                                        <p className="text-[var(--foreground)]">
                                            <span className="font-bold text-[var(--fssgold)]">Step 1:</span> Enter your email address and verify it by clicking the link sent to your inbox
                                        </p>
                                        <p className="text-[var(--foreground)]">
                                            <span className="font-bold text-[var(--fssgold)]">Step 2:</span> Select your club and complete the continuation form to let us know your club's status for next year
                                        </p>
                                        <p className="text-blue-400">
                                            <span className="font-bold">Note:</span> Both steps must be completed. Email verification is required for security purposes. Only club sponsors and student leads can submit continuation forms.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        }
                        duration={1.0}
                    />
                </div>
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