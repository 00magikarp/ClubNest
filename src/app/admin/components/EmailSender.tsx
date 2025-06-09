'use client';

import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { Club } from '@/lib/definitions';

type SendEmailComponentProps = {
    clubs: Club[];
}

export default function SendEmailComponent({ clubs }: SendEmailComponentProps) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
        if (publicKey) {
            emailjs.init(publicKey);
        } else {
            console.error('EmailJS Public Key is missing!');
        }
    }, []);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const sendEmail = async (studentLeadContact: string, studentLeadName: string) => {
        setLoading(true);

        // Validate required parameters
        if (!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID) {
            alert('EmailJS Service ID is missing!');
            setLoading(false);
            return;
        }

        if (!process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID) {
            alert('EmailJS Template ID is missing!');
            setLoading(false);
            return;
        }

        if (!process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
            alert('EmailJS Public Key is missing!');
            setLoading(false);
            return;
        }

        const templateParams = {

            to_email: studentLeadContact,
            to_name: studentLeadName,
            user_email: studentLeadContact,
            user_name: studentLeadName,
            email: studentLeadContact,
            name: studentLeadName,
            recipient_email: studentLeadContact,
            recipient_name: studentLeadName,
            from_name: 'Your Organization Name',
            message: 'Hello! This is a test email sent from our application.',
            reply_to: studentLeadContact
        };

        try {
            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
                templateParams,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY // Add public key here
            );

            alert('Email sent successfully!');
        } catch (error) {
            console.error('Failed to send email:', error);
            console.error('Error details:', JSON.stringify(error, null, 2));

            // More specific error handling
            if (error instanceof Error) {
                alert(`Failed to send email: ${error.message}`);
            } else {
                alert('Failed to send email. Check console for details.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleTestEmail = () => {
        // Test with minimal required parameters
        const testParams = {
            email: 'falconsoftwaresolutions27@gmail.com',           // Try this first
            name: 'Test user',
            club_name: 'Test club'
        };

        emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
            testParams,
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
        ).then(
            () => {
                alert('Test email sent successfully!');
            },
            (error) => {
                console.error('Test email failed:', error);

                // If 'email' doesn't work, try 'to_email'
                const testParams2 = {
                    to_email: 'falconsoftwaresolutions27@gmail.com',
                    to_name: 'Test User',
                    message: 'This is a test message'
                };

                return emailjs.send(
                    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                    testParams2,
                    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
                );
            }
        ).then(
            (result) => {
                if (result) {
                    alert('Test email sent successfully with to_email!');
                }
            },
            (error) => {
                console.error('Both tests failed:', error);
                alert('Both email tests failed. Check your template configuration.');
            }
        );
    };

    const sendEmailToAllClubs = async () => {
        if (clubs.length === 0) {
            alert('No clubs found to send emails to!');
            return;
        }

        const confirmed = window.confirm(
            `Are you sure you want to send emails to all ${clubs.length} clubs? This action cannot be undone.`
        );

        if (!confirmed) return;

        setLoading(true);
        let successCount = 0;
        let failCount = 0;
        const failedClubs: string[] = [];

        try {
            for (let i = 0; i < clubs.length; i++) {
                const club = clubs[i];

                if (!club.student_leads_contact || !club.student_leads_name) {
                    console.warn(`Skipping club ${club.name} - missing email or name`);
                    failCount++;
                    failedClubs.push(club.name || `Club ${i + 1}`);
                    continue;
                }
                for (let j = 0; j < clubs.length; j++) {
                    try {
                        const templateParams = {
                            email: club.student_leads_contact[j],
                            name: club.student_leads_name[j],
                            club_name: club.name,
                            reply_to: 'falconsoftwaresolutions27@gmail.com',
                        };

                        await emailjs.send(
                            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                            templateParams,
                            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
                        );

                        successCount++;

                        // Add delay between emails to avoid rate limiting
                        if (i < clubs.length - 1) {
                            await new Promise(resolve => setTimeout(resolve, 500)); // 0.5 second delay
                        }

                    } catch (error) {
                        console.error(`❌ Failed to send email to ${club.student_leads_name[j]}:`, error);
                        failCount++;
                        failedClubs.push(club.name || club.student_leads_name[j] || `Club ${i + 1}`);
                    }

                }
            }

            // Show summary
            let message = `Email sending completed!\n\n`;
            message += `✅ Successfully sent: ${successCount}\n`;
            message += `❌ Failed: ${failCount}\n`;

            if (failedClubs.length > 0) {
                message += `\nFailed clubs:\n${failedClubs.join('\n')}`;
            }

            alert(message);
        } catch (error) {
            console.error('Error during bulk email sending:', error);
            alert('An error occurred during bulk email sending. Check console for details.');
        } finally {
            setLoading(false);
        }
    };

    const handleTestEmailMultipleClub = async () => {
        const testEmails: string[] = [
            "falconsoftwaresolutions27@gmail.com",
            "carviz@carviz.lol",
            "kirabopayne@gmail.com",
            "areganathan@gmail.com"
        ];

        if (testEmails.length === 0) {
            alert('No test emails found!');
            return;
        }

        const confirmed = window.confirm(
            `Are you sure you want to send test emails to all ${testEmails.length} recipients? This action cannot be undone.`
        );

        if (!confirmed) return;

        setLoading(true);
        let successCount = 0;
        let failCount = 0;
        const failedRecipients: string[] = [];

        try {
            for (let i = 0; i < testEmails.length; i++) {
                const email = testEmails[i];
                const name = email.split('@')[0]; // mock name from email username
                const mockClubName = `Test Club ${i + 1}`;

                const templateParams = {
                    email: email,
                    name: name,
                    club_name: mockClubName,
                    reply_to: 'falconsoftwaresolutions27@gmail.com',
                };

                try {
                    await emailjs.send(
                        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                        templateParams,
                        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
                    );

                    successCount++;

                    if (i < testEmails.length - 1) {
                        await new Promise(resolve => setTimeout(resolve, 500)); // 0.5 sec delay
                    }
                } catch (error) {
                    console.error(`❌ Failed to send test email to ${email}:`, error);
                    failCount++;
                    failedRecipients.push(email);
                }
            }

            let message = `Test email sending completed!\n\n`;
            message += `✅ Successfully sent: ${successCount}\n`;
            message += `❌ Failed: ${failCount}\n`;

            if (failedRecipients.length > 0) {
                message += `\nFailed emails:\n${failedRecipients.join('\n')}`;
            }

            alert(message);
        } catch (error) {
            console.error('Error during test email sending:', error);
            alert('An error occurred during test email sending. Check console for details.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="mt-3 w-full flex flex-col flex-wrap p-4 justify-around gap-4">
            <p className="text-xl w-full text-center">Email Tools</p>

            {clubs.length === 0 && (
                <div className="p-3 bg-yellow-100 border border-yellow-300 rounded text-yellow-800 text-center">
                    Loading clubs data...
                </div>
            )}

            <div className="w-full flex flex-col flex-wrap gap-3 justify-center items-center">
                <button
                    onClick={handleTestEmail}
                    disabled={loading}
                    className="border-2 border-[var(--border)] rounded-xl w-[90%] p-4 hover:scale-105 transition-transform duration-200 disabled:opacity-50 cursor-pointer"
                >
                    {loading ? 'Sending...' : 'Send Test Email'}
                </button>

                <button
                    onClick={handleTestEmailMultipleClub}
                    disabled={loading}
                    className="bg-blue-500 border-2 border-[var(--border)] rounded-xl p-4 w-[90%] hover:scale-105 transition-transform duration-200 disabled:opacity-50 cursor-pointer"
                >
                    {loading ? 'Sending...' : 'Send Multiple Test Emails'}
                </button>

                <button
                    onClick={sendEmailToAllClubs}
                    disabled={loading || clubs.length === 0}
                    className="bg-red-500 border-2 border-[var(--border)] rounded-xl p-4 w-[90%] hover:scale-105 transition-transform duration-200 disabled:opacity-50 cursor-pointer"
                >
                    {loading ? 'Sending...' : `Send Email to All Clubs (${clubs.length})`}
                </button>
            </div>
        </div>
    );

}