import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar.jsx';
import Footer from '../components/Footer/Footer.jsx';
import Slider from '../components/Slider.jsx'; // Importing a slider component
import PolicyModal from '../components/PolicyModel.jsx'; // Import the Policy Modal
import { useAuthStore } from '../store/authStore'; // Assuming you're using an auth store to get user info
import { useInView } from 'react-intersection-observer'; // For scroll animations

const Home = () => {
  const { user } = useAuthStore(); // Get the logged-in user information, including empid
  const [isPolicyOpen, setIsPolicyOpen] = useState(false); // Modal visibility
  const { ref: videoRef, inView: videoInView } = useInView({
    triggerOnce: true, // Only trigger the animation once
    threshold: 0.2, // Trigger when 20% of the section is visible
  });

  useEffect(() => {
    if (user && user.empid) {
      // Check if the current user has already accepted the policy
      const policyAccepted = localStorage.getItem(`policyAccepted_${user.empid}`);
      if (!policyAccepted) {
        setIsPolicyOpen(true); // Open modal if not accepted
      }
    }
  }, [user]); // Run whenever the user changes

  const handleAgree = () => {
    if (user && user.empid) {
      setIsPolicyOpen(false); // Close the modal when the user agrees
      localStorage.setItem(`policyAccepted_${user.empid}`, 'true'); // Store user-specific policy agreement
    }
  };

  const handleDisagree = () => {
    setIsPolicyOpen(true); // Keep the modal open if the user disagrees
  };

  const videos = [
    {
      title: "9 Tips for Cybersecurity with Network Segmentation",
      src: "src/videos/9 Tips for Cybersecurity with Network Segmentation.mp4",
      summary: "The video explains network segmentation, which involves dividing a network into smaller sections to control who and what has access to specific areas. Segmentation helps block threats by creating barriers.",
    },
    {
      title: "11 Tips for Identifying Fake Websites and Phishing Emails",
      src: "src/videos/11 Tips for Identifying Fake Websites and Phishing Emails.mp4",
      summary: "The video explains how to spot fake email addresses and URLs to prevent cybersecurity threats. It advises users to check the domain after the '@' in email addresses and ensure it matches the company's website. For URLs, users should verify the connection is secure and that the URL looks correct. IT pros can help by creating fake email addresses or websites and testing employees to see if they click on suspicious links. The video also highlights warning signs of phishing emails, such as urgent messages, unusual requests, or multiple links, and suggests training exercises to help users recognize these threats.",
    },
    {
      title: "13 Password Best Practices",
      src: "src/videos/13 Password Best Practices.mp4",
      summary: "The video explains why resetting passwords every three months is important for key systems like Windows, email, and routers. It offers tips for creating strong passwords, like using a mix of letters, numbers, and special characters, keeping them long, and avoiding personal info or common phrases. IT pros should enforce password resets, use two-factor authentication, and review APIs for better security. ",
    },
    {
      title: "How to Create an Incident Response Plan",
      src: "src/videos/How to Create an Incident Response Plan.mp4",
      summary: "The video explains how to prepare for a security breach using a 'war gamin' exercise. This involves simulating an incident to train everyone from entry-level employees to executives. Before the exercise, develop an incident response plan with real-world examples and input from vendors.",
    },
    {
      title: "Security Awareness Training for Employees: An Overview",
      src: "src/videos/Security Awareness Training for Employees_ An Overview.mp4",
      summary: "In this video, Dave Landsberger from Telecom Brokerage Incorporated (TBI) discusses how to improve IT security through end-user training. He explains there are two types of employees: minimal risk and major risk. Minimal risk employees are trained to recognize unsafe behaviors, report phishing scams, and act as security advocates for the organization. The goal is to create more minimal risk employees through security training. While no network is completely secure, training can lower risks. Threat actors tend to target the least trained employees, so it's crucial to stay vigilant.",
    },
    {
      title: "Security Advice for Executives: Device Policies",
      src: "src/videos/Security Awareness Training- Device Policies and Security Advice for Executives.mp4",
      summary: "The video explains the importance of defining what devices employees can connect to the company network as part of security awareness training. IT departments should set clear rules for using personal and company devices, testing USB drives, and ensuring secure transfers, especially for finance teams and executives who are often targeted.",
    },
  ];

  return (
    <div className={`flex flex-col min-h-screen`}>
      <Navbar />
      
      {/* Hero Section with a slider for latest updates/announcements */}
      <section className="hero-section">
        <Slider
          slides={[
            { img: 'src/assets/image5.jpg', text: 'Welcome to Samurdhi Bank Employee Portal' },
            { img: 'src/assets/image6.jpg', text: 'Latest Updates on Policies and Guidelines' },
            { img: 'src/assets/image3.jpg', text: 'Take Part in Our Quiz and Win Rewards!' },
          ]}
        />
      </section>

      {/* Videos Section */}
      <section 
        className={`videos-section py-8 ${videoInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-700 ease-in-out`} 
        ref={videoRef}
        style={{ backgroundColor: '#f9f9f9' }} // Light background for contrast
      >
        <h3 className="text-6xl font-bold text-center mb-6 mt-10 animate-fade-in">
          Security Awareness and Employee Training
        </h3>
        <div className="video-container flex flex-col mt-10 space-y-12 px-4">
          {videos.map((video, index) => (
            <div 
              key={index} 
              className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center justify-between space-y-6 md:space-y-0 md:space-x-10`}>
              {/* Video */}
              <div className="w-full md:w-1/2 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105">
                <video className="w-full h-auto" controls preload="metadata" style={{ borderRadius: '8px', backgroundColor: '#000' }}>
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              {/* Summary */}
              <div className="w-full md:w-1/2">
                <h4 className="text-3xl font-bold mb-2">{video.title}</h4>
                <p className="text-xl text-gray-700 mb-2">{video.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />

      {/* Policy Modal */}
      {isPolicyOpen && (
        <PolicyModal onAgree={handleAgree} onDisagree={handleDisagree} />
      )}
    </div>
  );
};

export default Home;
