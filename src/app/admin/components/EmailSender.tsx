'use client';

import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { readClubs, readRoster } from '@/lib/firebaseClient';
import { Button } from '@mui/material';

export default function SendEmailComponent() {
    const [clubs, setClubs] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Initialize EmailJS with your public key
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
        if (publicKey) {
            emailjs.init(publicKey);
            console.log('EmailJS initialized successfully');
        } else {
            console.error('EmailJS Public Key is missing!');
        }
        
        // Load clubs data
        const loadClubs = async () => {
            try {
                const clubsData = await readClubs();
                setClubs(clubsData);
            } catch (error) {
                console.error('Error loading clubs:', error);
            }
        };
        
        loadClubs();
    }, []);

    const sendEmail = async (studentLeadContact: string, studentLeadName: string) => {
        setLoading(true);
        
        // Debug: Check environment variables
        console.log('Service ID:', process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID);
        console.log('Template ID:', process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID);
        console.log('Public Key:', process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
        
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
            // Common EmailJS template variables - try multiple variations
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

        console.log('Template params:', templateParams);

        try {
            const response = await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
                templateParams,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY // Add public key here
            );
            
            console.log('Email sent successfully!', response.status, response.text);
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
            name: 'Big Papa Hriday',
            message: 'This is a test message'
        };
        
        console.log('Testing with params:', testParams);
        
        emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
            testParams,
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
        ).then(
            (result) => {
                console.log('Test email sent successfully:', result);
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
                
                console.log('Trying with to_email params:', testParams2);
                
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
                    console.log('Second test email sent successfully:', result);
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
                
                if (!club.leaderEmail || !club.leaderName) {
                    console.warn(`Skipping club ${club.name} - missing email or name`);
                    failCount++;
                    failedClubs.push(club.name || `Club ${i + 1}`);
                    continue;
                }

                try {
                    console.log(`Sending email ${i + 1}/${clubs.length} to ${club.leaderName} (${club.leaderEmail})`);
                    
                    const templateParams = {
                        email: club.leaderEmail,
                        name: club.leaderName,
                        to_email: club.leaderEmail,
                        to_name: club.leaderName,
                        user_email: club.leaderEmail,
                        user_name: club.leaderName,
                        recipient_email: club.leaderEmail,
                        recipient_name: club.leaderName,
                        club_name: club.name,
                        from_name: 'Your Organization Name',
                        message: `Hello ${club.leaderName}! This is an important message for ${club.name}.`,
                        reply_to: 'your-reply-email@example.com'
                    };

                    await emailjs.send(
                        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                        templateParams,
                        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
                    );

                    successCount++;
                    console.log(`✅ Email sent successfully to ${club.leaderName}`);
                    
                    // Add delay between emails to avoid rate limiting
                    if (i < clubs.length - 1) {
                        await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
                    }
                    
                } catch (error) {
                    console.error(`❌ Failed to send email to ${club.leaderName}:`, error);
                    failCount++;
                    failedClubs.push(club.name || club.leaderName || `Club ${i + 1}`);
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
            console.log('Bulk email summary:', { successCount, failCount, failedClubs });

        } catch (error) {
            console.error('Error during bulk email sending:', error);
            alert('An error occurred during bulk email sending. Check console for details.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Send Email Component</h2>
            
            <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={handleTestEmail}
                    disabled={loading}
                >
                    {loading ? 'Sending...' : 'Send Test Email'}
                </Button>

                <Button 
                    variant="contained" 
                    color="secondary"
                    onClick={sendEmailToAllClubs}
                    disabled={loading || clubs.length === 0}
                    style={{ 
                        backgroundColor: loading ? '#ccc' : '#ff4444',
                        color: 'white'
                    }}
                >
                    {loading ? 'Sending...' : `Send Email to All Clubs (${clubs.length})`}
                </Button>
            </div>

            {/* Status indicator */}
            {clubs.length === 0 && (
                <div style={{ 
                    padding: '10px', 
                    backgroundColor: '#fff3cd', 
                    border: '1px solid #ffeaa7',
                    borderRadius: '4px',
                    marginBottom: '20px'
                }}>
                    Loading clubs data...
                </div>
            )}
        </div>
    );
}