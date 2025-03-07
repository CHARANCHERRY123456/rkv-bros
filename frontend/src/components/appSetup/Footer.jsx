import React from 'react';
import './Footer.css'; // Create a CSS file to style the footer

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                {/* Navigation Links */}
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/home">Home</a></li>
                        <li><a href="/dashboard">Dashboard</a></li>
                        <li><a href="/notifications">Notifications</a></li>
                        <li><a href="/search-analysis">Search Analysis</a></li>
                    </ul>
                </div>

                {/* Contact Information */}
                <div className="footer-section">
                    <h4>Contact Us</h4>
                    <p>Email: contact@classroommanagement.com</p>
                    <p>Phone: (123) 456-7890</p>
                </div>

                {/* Social Media Links */}
                <div className="footer-section">
                    <h4>Follow Us</h4>
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Classroom Management. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
