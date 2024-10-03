import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import axios from 'axios';
import Modal from 'react-modal';
import Footer from '../components/Footer/Footer.jsx';
import '../styles/Policies.css';
import { useAuthStore } from '../store/authStore';

// Sample policy data with subtopics and sections
const policies = [
  {
    id: 1,
    name: 'Password Policy',
    content: [
      {
        subtopic: 'Purpose',
        text: 'This policy is designed to ensure that all users create strong passwords to protect the integrity and security of Samurdhi Banks systems and sensitive data',
      },
      {
        subtopic: 'Why Its Important',
        text: 'Passwords are the first line of defence against unauthorized access to Samurdhi Bank’s systems. By adhering to this policy, employees help safeguard sensitive customer information and protect the bank from potential data breaches.',
      },
      {
        subtopic: 'Scope',
        text: 'This policy applies to all employees, contractors, and third-party service providers who access Samurdhi Bank’s systems, networks, and applications.',
      },
      {
        subtopic: 'Policy Requirements',
      },
      {
        subtopic: 'Password Creation',
        text: [
            'Must be at least 8 characters long.',
            'Must include a combination of:',
            'Uppercase letters (A-Z)',
            'Lowercase letters (a-z)',
            'Numbers (0-9)',
            'Special characters (e.g., !, @, #, $, %, &)',
            'Do not use personal information (e.g., names, birthdays) or common words.',
          ],
      },
      {
        subtopic: 'Examples:',
        text: ['Good Password: Pa$$w0rd!23',
            'Bad Password: password123',
        ]
      },
      {
        subtopic: 'Password Change Frequency:',
        text: 'Change passwords every 90 days.Password change reminders will be sent 15 days before the password expires.',
      },
      {
        subtopic: 'Password History:',
        text: 'Do not reuse any of your previous five passwords.',
      },
      {
        subtopic: 'Account Lockout:',
        text: 'After five consecutive failed login attempts, the account will be locked.Contact IT support to unlock the account after verification.',
      },
      {
        subtopic: 'Password Protection:',
        text: [
            'Keep passwords confidential. Do not share them with anyone.',
            'Avoid writing down passwords or storing them in unsecured locations.',
            'Use a secure password manager if needed.',
            'Resetting Your Password',
            'If you forget your password, use the Self-Service Password Reset feature available on the login page or contact IT support at [Phone Number] or [Email].',
          ],
      },
      {
        subtopic: 'FAQs',
        text: ['What if I forget my password? :- Use the Forgot Password link on the login page or contact IT for assistance.',
            'Why is my account locked? :- Your account will be locked after five failed login attempts. Contact IT support to unlock it.',
            'Why do I have to change my password every 90 days? :- Regular password changes reduce the risk of unauthorized access over time.',
            'Responsibilities :- All employees must follow these guidelines to create and manage their passwords securely.',
        ],
      },
      {
        subtopic: 'Compliance',
        text: 'Non-compliance with this password policy will result in disciplinary action, which may include termination of system access, written warnings, or other actions.',
      },
      {
        subtopic: 'Contact IT Support',
        text: 'For questions or help with this policy, contact the IT Support Team at [Phone Number] or [Email].',
      },

    ],
  }, 
  {
    id: 2,
    name: 'Data Protection and Privacy Policy',
    content: [
      {
        subtopic: 'Purpose',
        text: 'This policy is designed to ensure the protection of sensitive information, including customer and corporate data, in compliance with local and international data privacy regulations. It outlines how Samurdhi Bank handles, stores, and secures data to prevent unauthorized access or breaches.',
      },
      {
        subtopic: 'Why It’s Important',
        text: 'Samurdhi Bank processes a vast amount of sensitive customer and operational data. Protecting this data is crucial for maintaining customer trust and ensuring compliance with privacy laws such as Sri Lanka’s privacy regulations and international standards like GDPR.',
      },
      {
        subtopic: 'Scope',
        text: 'This policy applies to all employees, contractors, consultants, and third-party service providers who handle, access, or process Samurdhi Banks data.',
      },
      {
        subtopic: 'Policy Requirements',
      },
      {
        subtopic: 'Data Encryption:',
        text: 'All sensitive data must be encrypted during transmission (in transit) and while stored (at rest).',
      },
      {
        subtopic: 'Access Control',
        text: ['Access to data is granted based on role-based access control (RBAC), ensuring that employees only have access to the data necessary for their job functions.',
          'Regular access reviews will be conducted to ensure appropriate permissions are in place.',
        ]
      },
      {
        subtopic: 'Data Handling:',
        text: ['All data must be handled securely throughout its lifecycle, including during collection, processing, storage, and disposal.',
          'Sensitive data must only be stored in authorized systems and databases with proper security controls in place.',
        ]
      },
      {
        subtopic: 'Data Disposal:',
        text: 'Only authorized personnel with role-based access control should be able to access sensitive data.',
      },
      {
        subtopic: 'Access Control',
        text: ['Confidential data must be securely deleted or destroyed when no longer needed.',
          'Use approved methods for secure disposal, such as data wiping or physical shredding of paper records.',
        ]
      },
      {
        subtopic: 'Compliance with Laws and Regulations:',
        text: 'Samurdhi Bank is committed to complying with local privacy laws (e.g., Sri Lankas Personal Data Protection Act) and international regulations such as the General Data Protection Regulation (GDPR).',
      },
      {
        subtopic: 'Examples of Sensitive Data',
        text: ['Only authorized personnel with role-based access control should be able to access sensitive data.',
          'Customer Information: Names, addresses, contact details, and financial information.',
          'Employee Information: Personal identification details, salary records, and performance data.',
          'Transaction Data: Account details, transaction histories, and payment records.'
        ]
      },
      {
        subtopic: 'Data Breach Reporting',
        text: 'In case of a data breach or unauthorized access, employees must report the incident immediately to the Data Protection Officer (DPO) or the IT Security Team. Affected individuals and authorities will be notified promptly, in line with legal requirements.',
      },
      {
        subtopic: 'Responsibilities',
        text: ['Employees: Responsible for handling and protecting sensitive data according to this policy.',
          'IT Department: Ensures that systems and processes are in place to secure data.',
          'Management: Oversees compliance with data protection regulations.',
        ]
      },
      {
        subtopic: 'FAQs',
        text: ['What types of data should be encrypted? :- All sensitive data, including customer details, financial information, and internal records, must be encrypted.',
          'Who can access sensitive customer data? :- Only authorized personnel with appropriate access levels, as determined by their role, can access customer data.',
          'What happens if a data breach occurs? :- Immediately report the breach to the IT Security Team, who will take steps to contain the breach and notify affected parties if necessary.',
        ]
      },
      {
        subtopic: 'Compliance',
        text: 'Failure to comply with this policy may result in disciplinary actions, including termination of employment and legal penalties in accordance with data privacy laws.',
      },
      {
        subtopic: 'Contact IT Support',
        text: 'For questions about this policy or data protection practices, contact the IT Support Team or the Data Protection Officer at [Phone Number] or [Email].',
      },
    ],
  },
  {
    id: 3,
    name: 'Acceptable Use Policy (AUP)',
    content: [
      {
        subtopic: 'Purpose',
        text: 'This policy outlines acceptable uses of Samurdhi Bank’s technology, systems, and information assets to ensure their secure, ethical, and lawful use.',
      },
      {
        subtopic: 'Why It’s Important',
        text: 'The use of Samurdhi Bank’s IT systems and resources must align with the bank’s security, privacy, and legal requirements. This policy helps protect the bank’s assets, prevent security breaches, and maintain the integrity of its operations.',
      },
      {
        subtopic: 'Scope',
        text: 'This policy applies to all employees, contractors, consultants, temporary staff, and any other individuals who use Samurdhi Bank’s IT systems, devices, and network resources.',
      },
      {
        subtopic: 'Policy Requirements',
      },
      {
        subtopic: 'Personal Use of Company Devices and Networks:',
        text: ['Limited personal use of company devices and network resources is allowed, provided it does not interfere with work duties or violate this policy.',
          'Employees must not engage in any activity that consumes excessive bandwidth, such as streaming non-work-related media.',
        ]
      },
      {
        subtopic: 'Software and Application Usage:',
        text: ['Unauthorized Software: Employees are prohibited from downloading or installing any unauthorized software or applications on company devices without approval from the IT Department.',
          'All software must be approved by IT to ensure compatibility, licensing, and security.',
        ]
      },
      {
        subtopic: 'Email, Internet, and Messaging Tools:',
        text: ['Email Usage: Employees must use company-provided email accounts for all official communication. Sending sensitive information via personal email accounts is prohibited.',
          'Safe Browsing: Employees must practice safe browsing habits, avoiding untrustworthy websites or links.',
          'Messaging Tools: Use of instant messaging apps for business purposes must be authorized and secure.'
        ]
      },
      {
        subtopic: 'Prohibition of Illegal Activities:',
        text: ['Bank resources must not be used for any activities that are illegal, unethical, or violate company policies, including but not limited to:',
          'Accessing or distributing offensive or inappropriate content.',
          'Engaging in unauthorized transactions or illegal file sharing.',
          'Hacking, phishing, or attempting to bypass security controls.',
        ]
      },
      {
        subtopic: 'Security and Confidentiality:',
        text: 'Employees must take all necessary precautions to prevent unauthorized access to the bank’s IT resources. This includes locking devices when unattended, safeguarding login credentials, and avoiding the use of unsecured networks.',
      },
      {
        subtopic: 'Device and Network Monitoring:',
        text: 'Samurdhi Bank reserves the right to monitor its network, systems, and devices to ensure compliance with this policy and maintain security. Employees should have no expectation of privacy when using company resources.',
      },
      {
        subtopic: 'Examples of Acceptable Use',
        text: ['Permitted: Using email to communicate with customers and colleagues, accessing work-related websites and tools, and limited personal use such as checking personal emails during break time.',
          'Prohibited: Streaming non-work-related videos during work hours, installing unapproved software, and using the network for illegal downloads.',
        ]
      },
      {
        subtopic: 'Data Protection and Confidentiality',
        text: 'All employees must ensure that confidential information is protected when using Samurdhi Bank’s systems. Sharing sensitive customer or bank information through unauthorized channels is strictly forbidden.',
      },
      {
        subtopic: 'Responsibilities',
        text: ['Employees: Must adhere to this policy at all times and report any suspicious activity or violations.',
          'IT Department: Responsible for enforcing this policy and maintaining the security of the bank’s systems.',
          'Supervisors/Managers: Must ensure that their team members understand and comply with the acceptable use policy.',
        ]
      },
      {
        subtopic: 'FAQs',
        text: ['Can I use my work laptop for personal tasks? :- Limited personal use is allowed, but ensure it does not interfere with work or violate this policy.',
          'What happens if I accidentally install unauthorized software? :- Contact the IT department immediately for guidance on how to uninstall the software and ensure no security risks are present.',
          'Can I access my personal email on company devices? :- Yes, within reasonable limits, as long as it does not compromise the security of the system or disrupt work.',
        ]
      },
      {
        subtopic: 'Compliance',
        text: 'Failure to comply with this policy may result in disciplinary actions, including termination of employment, and legal actions if illegal activities are involved.',
        
      },
      {
        subtopic: 'Contact IT Support',
        text: 'For any questions or support regarding acceptable use of technology, contact the IT Department at [Phone Number] or [Email].',
        
      },
    ],
  },
  {
    id: 4,
    name: 'Incident Response Policy',
    content: [
      {
        subtopic: 'Purpose',
        text: 'This policy provides guidelines for responding to security breaches, cyber incidents, and other threats that could compromise the confidentiality, integrity, or availability of Samurdhi Bank’s systems and data. The aim is to minimize the impact of security incidents and ensure swift, effective recovery.',
      },
      {
        subtopic: 'Why It’s Important',
        text: 'Timely and effective incident response is critical to protecting the bank’s systems, maintaining customer trust, and ensuring compliance with regulatory requirements. This policy outlines the steps to detect, report, and resolve security incidents.',
      },
      {
        subtopic: 'Scope',
        text: 'This policy applies to all employees, contractors, third-party service providers, and other stakeholders involved in the detection, reporting, and resolution of security incidents at Samurdhi Bank.',
      },
      {
        subtopic: 'Policy Requirements',
      },
      {
        subtopic: 'Definition of a Security Incident:',
        text: ['A security incident refers to any event that may compromise the confidentiality, integrity, or availability of Samurdhi Bank’s systems or data. Examples include:',
          'Data Breach: Unauthorized access to or disclosure of sensitive data.',
          'Phishing Attack: Fraudulent attempts to obtain sensitive information through deceptive communications.',
          'Malware Infection: Malicious software installed on the bank’s systems that compromises security.',
          'Unauthorized Access: Access to systems or data by unauthorized individuals.'
        ]
      },
      {
        subtopic: 'Incident Reporting:',
        text: ['All employees must immediately report any suspected or actual security incidents to the IT Security Team or the designated Incident Response Coordinator.',
          'Reporting can be done through the internal Incident Reporting System, via email, or phone.',
          'Incidents involving sensitive customer data or financial information must be reported within 24 hours.',
        ]
      },
      {
        subtopic: 'Email, Internet, and Messaging Tools:',
        text: ['Upon receiving an incident report, the IT Security Team will initiate the following steps:',
          'Containment: Take immediate actions to isolate affected systems to prevent further damage.',
          'Investigation: Analyze the cause of the incident, determine the scope of the damage, and identify the source of the breach.',
          'Eradication: Remove any malware, unauthorized access, or other threats from the system.',
          'Recovery: Restore affected systems and data to normal operations, ensuring no residual threats remain.',
          'Post-Incident Review: Conduct a review to determine lessons learned and strengthen defenses.',
        ]
      },
      {
        subtopic: 'Documentation and Logging:',
        text: ['All incident details must be thoroughly documented, including:',
          'Date and time of the incident.',
          'Systems and data affected.',
          'Actions taken to resolve the incident.',
          'Individuals involved in detection, response, and recovery.',
          'Logs should be stored securely and made available for audit and compliance purposes.',
        ]
      },
      {
        subtopic: 'Communication Protocols:',
        text: 'Internal Communication: The IT Security Team will notify senior management and relevant departments about the incident, providing updates on the response and recovery efforts.',
      },
      {
        subtopic: 'External Communication:',
        text: ['If the incident involves a data breach or significant system compromise, regulatory authorities (e.g., Sri Lanka’s CERT or Data Protection Authority) must be informed within the legally required time frame.',
          'Customers affected by the breach will be notified promptly with clear information on the breach’s impact and any necessary actions to protect their data.',
          'Legal and public relations teams will handle external communications to ensure that the bank’s reputation is protected.',
        ]
      },
      {
        subtopic: 'Examples of Security Incidents',
        text: ['Data Breach: Unauthorized access to customer banking details.',
          'Phishing: An employee clicks on a phishing link, exposing their credentials.',
          'Malware: A virus or ransomware infects the bank’s network, potentially compromising sensitive data.',
        ]
      },
      {
        subtopic: 'Incident Response Team (IRT)',
        text: ['Role: The IRT is responsible for coordinating the incident response process. This includes containment, investigation, and communicating with internal and external stakeholders.',
          'Members: The IRT includes representatives from IT, legal, compliance, and management teams, as well as external cybersecurity experts if necessary.',
        ]
      },
      {
        subtopic: 'Responsibilities',
        text: ['Employees: Must immediately report any suspicious activities or incidents.',
          'IT Security Team: Coordinates incident response efforts, documents the incident, and takes action to contain and resolve the situation.',
          'Management: Ensures resources are available for an effective response and recovery.',
        ]
      },
      {
        subtopic: 'FAQs',
        text: ['What should I do if I suspect a phishing attack? :- Immediately report it to the IT Security Team and avoid clicking any links or attachments.',
          'How do I report a security incident? :- Use the Incident Reporting System or contact the IT Security Team directly via [Phone Number] or [Email].',
          'Who will be notified in the event of a data breach? :- Affected customers, relevant regulatory authorities, and senior management will be notified as per legal and compliance requirements.',
        ]
      },
      {
        subtopic: 'Compliance',
        text: 'Failure to follow the Incident Response Policy can result in disciplinary action, up to and including termination of employment, and may expose the bank to legal risks.',
        
      },
      {
        subtopic: 'Contact IT Support',
        text: 'For any questions or support regarding acceptable use of technology, contact the IT Department at [Phone Number] or [Email].',
        
      },
    ],
  },
  {
    id: 5,
    name: 'Access Control Policy',
    content: [
      {
        subtopic: 'Purpose',
        text: 'This policy is designed to restrict access to Samurdhi Bank’s systems, data, and resources based on the role of the user, ensuring that only authorized individuals have access to sensitive information. The policy outlines the controls necessary to protect the bank’s data from unauthorized access or misuse.',
      },
      {
        subtopic: 'Why It’s Important',
        text: 'Restricting access to sensitive systems and data reduces the risk of data breaches, misuse of resources, and unauthorized activities. By enforcing access controls, Samurdhi Bank ensures compliance with security standards and protects the confidentiality and integrity of its systems.',
      },
      {
        subtopic: 'Scope',
        text: 'This policy applies to all employees, contractors, third-party service providers, and any individuals who have access to Samurdhi Bank’s systems, networks, and data.',
      },
      {
        subtopic: 'Policy Requirements',
      },
      {
        subtopic: 'Role-Based Access Control (RBAC):',
        text: ['RBAC Implementation: Access to systems and data is granted based on the user’s job role and responsibilities. Each user’s access level is determined by their role within the bank (e.g., employee, manager, administrator).',
          'Access Levels: Different access levels will be defined for each department and role to ensure that users can only access the resources they need for their tasks.',
        ]
      },
      {
        subtopic: 'Granting, Modifying, and Revoking Access Privileges:',
      },
      {
        subtopic: 'Granting Access:',
        text: 'Access will be granted to new users based on their job function after approval from their supervisor and the IT Department.',
        
      },
      {
        subtopic: 'Modifying Access:',
        text: 'Changes to access levels must be authorized by the supervisor and verified by the IT Department before implementation. Access modifications are triggered by changes in job roles or responsibilities.',
        
      },
      {
        subtopic: 'Revoking Access:',
        text: ['Access will be revoked immediately upon termination of employment or when the user no longer requires access to the specific system or data.',
          'Regular audits of access privileges will be conducted to ensure that access is appropriately assigned.',
        ]
      },
      {
        subtopic: 'Principle of Least Privilege:',
        text: 'Access to systems, data, and resources will be granted using the least privilege principle, ensuring users only receive the minimum level of access necessary to perform their duties. This reduces the risk of accidental or malicious misuse of data.',
        
      },
      {
        subtopic: 'Multi-Factor Authentication (MFA):',
        text: 'For access to sensitive systems and critical data, multi-factor authentication (MFA) is mandatory. MFA ensures that users must verify their identity using two or more methods (e.g., password and a one-time code sent to a mobile device) before accessing critical systems.',
      },
      {
        subtopic: 'User Accountability:',
        text: ['Each user is responsible for maintaining the security of their access credentials and ensuring they do not share or disclose their login information to unauthorized individuals.',
          'Users must immediately report any suspected security incidents, including unauthorized access or compromised credentials.',
        ]
      },
      {
        subtopic: 'Access Levels and Permissions',
        text: ['Basic User: Limited access to general systems and data necessary for daily tasks.',
          'Manager: Access to department-specific data and systems for supervision and reporting.',
          'Administrator: Full access to systems, including configuration and management of user privileges.',
        ]
      },
      {
        subtopic: 'Regular Audits',
        text: 'Access privileges will be reviewed regularly to ensure compliance with this policy. Any discrepancies or unused access rights will be adjusted or revoked.',
        
      },
      {
        subtopic: 'Responsibilities',
        text: ['Employees: Must adhere to the access privileges granted to them and ensure the confidentiality of their credentials.',
          'IT Department: Responsible for implementing and managing access controls, as well as conducting regular audits of access privileges.',
          'Supervisors: Approve access requests and ensure employees have the correct access levels for their roles.',
        ]
      },
      {
        subtopic: 'FAQs',
        text: ['How is access granted to new employees? :- Access is granted based on the employee’s role after approval from the supervisor and IT Department.',
          'What should I do if I need access to additional systems? :- Submit a request to your supervisor, who will review and approve any necessary changes in access levels with IT.',
          'What happens if my role changes? :- Your access privileges will be updated according to your new responsibilities, with adjustments made as needed by the IT Department.',
        ]
      },
      {
        subtopic: 'Compliance',
        text: 'Non-compliance with this policy, including unauthorized access to systems or data, will result in disciplinary actions, which may include termination of employment and legal consequences.',
        
      },
      {
        subtopic: 'Contact IT Support',
        text: 'For any questions or support regarding acceptable use of technology, contact the IT Department at [Phone Number] or [Email].',
        
      },
    ],
  },
  {
    id: 6,
    name: 'Email and Communication Policy',
    content: [
      {
        subtopic: 'Purpose',
        text: 'This policy is designed to secure Samurdhi Bank’s email communication systems and protect employees and the organization from email-based threats such as phishing, malware, and data breaches. It outlines best practices for handling sensitive information and ensuring secure communication.',
      },
      {
        subtopic: 'Why It’s Important',
        text: 'Email is a primary communication tool at Samurdhi Bank, but it is also a common target for cyberattacks. Implementing security measures helps prevent data breaches, unauthorized access, and financial fraud, thereby safeguarding both the bank and its customers.',
      },
      {
        subtopic: 'Scope',
        text: 'This policy applies to all employees, contractors, and third-party service providers who use Samurdhi Bank’s email and communication systems, including corporate email accounts and any other internal messaging platforms.',
      },
      {
        subtopic: 'Policy Requirements',
      },
      {
        subtopic: 'Prohibiting the Sharing of Sensitive Information via Unsecured Email:',
        text: ['Employees are prohibited from sending sensitive information (e.g., customer data, account details, passwords) via unsecured or personal email accounts.',
          'Sensitive information includes customer financial data, personally identifiable information (PII), and internal documents classified as confidential.',
          'Any sensitive communication must be done through approved secure methods, including encrypted emails.',
        ]
      },
      {
        subtopic: 'Phishing Identification and Reporting:',
        text: 'Employees must be vigilant about phishing attempts and unauthorized requests for information.',
        
      },
      {
        subtopic: 'Phishing Indicators:',
        text: ['Suspicious email addresses or unfamiliar senders.',
          'Urgent requests for sensitive information or login credentials.',
          'Links or attachments from unexpected sources.',
          'Employees must report any suspected phishing emails to the IT Security Team using the internal reporting system or by forwarding the email to [IT Support Email].',
        ]
      },
      {
        subtopic: 'Use of Encrypted Communication for Sensitive Messages:',
        text: ['Emails containing sensitive information must be encrypted using email encryption tools approved by the IT Department.',
          'Employees must ensure that external recipients are aware of the encryption process and can access the message securely.',
          'Communication between the bank and external parties involving sensitive data must use secure, encrypted channels (e.g., TLS encryption).',
        ]
        
      },
      {
        subtopic: 'Monitoring and Filtering for Malicious Attachments and Links:',
        text: ['The bank’s email systems will automatically monitor and filter malicious attachments and links in real-time.',
          'Employees must avoid opening attachments or clicking links in emails from unknown sources or suspicious messages.',
          'All email attachments must be scanned for malware before opening. If there is any suspicion, employees should notify the IT Security Team for further investigation.',
        ]
      },
      {
        subtopic: 'Examples of Unsecure and Secure Email Practices',
        text: ['Unsecure: Sending customer account numbers or passwords through an unsecured email account or to an external personal email.',
          'Secure: Using encrypted email tools to share sensitive customer information with authorized recipients.',
        ]
      },
      {
        subtopic: 'Security Best Practices',
        text: ['Always verify the authenticity of unexpected emails before taking action.',
          'Use strong, unique passwords for email accounts and enable multi-factor authentication (MFA).',
          'Regularly update email clients and security settings to the latest versions to minimize vulnerabilities.',
        ]
      },
      {
        subtopic: 'Responsibilities',
        text: ['Employees: Must follow the guidelines for secure email communication, report phishing attempts, and use encryption for sensitive messages.',
          'IT Department: Responsible for implementing email encryption tools, monitoring email traffic for threats, and responding to phishing reports.',
          'Supervisors: Ensure their teams comply with the email security standards outlined in this policy.',
        ]
      },
      {
        subtopic: 'FAQs',
        text: ['What should I do if I receive a suspicious email? :- Do not open the email or click on any links. Forward it to the IT Security Team at [IT Support Email] for review.',
          'Can I send sensitive information through my personal email account? :- No, all sensitive information must be sent using the bank’s secure, encrypted email system.',
          'How do I encrypt an email? :- Follow the instructions provided by the IT Department on using the bank’s approved email encryption tools. If you need assistance, contact IT Support.',
        ]
      },
      {
        subtopic: 'Compliance',
        text: 'Failure to comply with this policy may result in disciplinary action, including termination of employment. Legal actions may also be taken if the violation results in a data breach or other serious security incident.',
        
      },
      {
        subtopic: 'Contact IT Support',
        text: 'For assistance with email security or to report a phishing attempt, contact the IT Department at [Phone Number] or [Email].',
        
      },
    ],
  },
  {
    id: 7,
    name: 'Device and Endpoint Security Policy',
    content: [
      {
        subtopic: 'Purpose',
        text: 'This policy ensures that all devices used to access Samurdhi Bank’s systems and data are secure. It outlines best practices for protecting devices from security threats and preventing unauthorized access to sensitive information.',
      },
      {
        subtopic: 'Why It’s Important',
        text: 'Devices such as laptops, desktops, and mobile phones are common targets for cyberattacks. Securing these endpoints helps protect Samurdhi Bank’s network and data, reducing the risk of breaches or unauthorized access through compromised devices.',
      },
      {
        subtopic: 'Scope',
        text: 'This policy applies to all employees, contractors, third-party service providers, and any other personnel who use devices to access Samurdhi Bank’s systems, networks, and data.',
      },
      {
        subtopic: 'Policy Requirements',
      },
      {
        subtopic: 'Device Updates and Patching:',
        text: ['All devices used to access the bank’s systems must have the latest security patches and updates installed.',
          'Operating systems, software applications, and security tools (e.g., antivirus) must be regularly updated to address known vulnerabilities.',
          'Automatic updates should be enabled where possible, and employees must not delay or ignore update notifications.',
        ]
      },
      {
        subtopic: 'Antivirus Software and Endpoint Protection:',
        text: ['Every device must have up-to-date antivirus software and endpoint protection installed.',
          'The bank’s IT department will provide approved security tools for installation on all corporate devices.',
          'Employees must run regular scans and ensure antivirus software is set to update its virus definitions automatically.',
        ]
      },
      {
        subtopic: 'Mobile Device Security:',
        text: ['Employees using mobile devices to access the bank’s systems must follow these guidelines:',
          'Enable strong passwords or biometric security (e.g., fingerprint, facial recognition).',
          'Use VPNs (Virtual Private Networks) to access the bank’s network remotely.',
          'Avoid connecting to public Wi-Fi when accessing sensitive bank systems or data.',
          'Mobile devices should be configured to auto-lock after a period of inactivity, and encryption must be enabled for sensitive data.',
        ]
        
      },
      {
        subtopic: 'Lost or Stolen Devices:',
        text: ['Employees must report any lost or stolen devices immediately to the IT Security Team or the Incident Response Team.',
          'Lost or stolen devices will be remotely wiped of sensitive data to prevent unauthorized access.',
          'Employees are responsible for securing their devices and should ensure they are physically protected (e.g., using a secure location when not in use).',
        ]
      },
      {
        subtopic: 'Examples of Device Security Best Practices',
        text: ['Secure: Regularly updating operating systems, using a VPN to access the bank’s systems, and enabling automatic security updates.',
          'Insecure: Using a device with outdated software, accessing sensitive data over public Wi-Fi without a VPN, or failing to report a lost device.',
        ]
      },
      {
        subtopic: 'Responsibilities',
        text: ['Employees: Responsible for securing their devices, ensuring they are updated, and reporting any incidents such as loss or theft.',
          'IT Department: Provides endpoint protection tools, manages software updates, and handles device security incidents.',
          'Supervisors/Managers: Ensure their teams comply with device security requirements.',
        ]
      },
      {
        subtopic: 'FAQs',
        text: ['How often should I update my device’s software? :- Devices should be updated as soon as new patches or updates are available. If automatic updates are enabled, they should be applied immediately.',
          'What should I do if I lose my device? :- Report it immediately to the IT Security Team so they can remotely wipe the device and prevent unauthorized access.',
          'Can I use my personal device to access the bank’s systems? :- Yes, but it must comply with the bank’s security policies, including using endpoint protection, a VPN, and enabling encryption.',
        ]
      },
      {
        subtopic: 'Compliance',
        text: 'Failure to comply with this policy may result in disciplinary action, including termination of employment. Additionally, legal actions may be taken if non-compliance leads to a data breach or security incident.',
        
      },
      {
        subtopic: 'Contact IT Support',
        text: 'For any questions about device security or to report a lost or stolen device, contact the IT Department at [Phone Number] or [Email].',
        
      },
    ],
  },
  {
    id: 8,
    name: 'Remote Work and Mobile Device Policy',
    content: [
      {
        subtopic: 'Purpose',
        text: 'This policy defines the security practices and requirements for employees working remotely or using mobile devices to access Samurdhi Bank’s systems. It aims to ensure that remote work is conducted securely, protecting sensitive data and minimizing the risk of breaches.',
      },
      {
        subtopic: 'Why It’s Important',
        text: 'With an increasing reliance on remote work, maintaining secure connections and protecting sensitive information are critical. Ensuring that employees follow security protocols when working outside the office safeguards the bank’s systems and customer data from unauthorized access.',
      },
      {
        subtopic: 'Scope',
        text: 'This policy applies to all employees, contractors, and third-party service providers who work remotely or use mobile devices to access Samurdhi Bank’s systems and data.',
      },
      {
        subtopic: 'Policy Requirements',
      },
      {
        subtopic: 'Use of Secure Connections (VPN):',
        text: ['Employees must use the bank’s Virtual Private Network (VPN) when accessing Samurdhi Bank’s systems or network remotely.',
          'The VPN encrypts all data in transit, ensuring that sensitive information is protected from interception.',
          'Remote access to the bank’s systems without using the VPN is strictly prohibited.',
        ]
      },
      {
        subtopic: 'Security Standards for Remote Devices:',
        text: ['All devices used for remote work, including laptops, tablets, and smartphones, must comply with the bank’s security standards:',
          'Encryption must be enabled to protect stored data.',
          'Regular patching and updates are required for operating systems and software to address security vulnerabilities.',
          'Employees must ensure that their personal devices meet these security standards if they are used for remote work.',
        ]
      },
      {
        subtopic: 'Prohibition of Storing Sensitive Data on Personal Devices:',
        text: ['Sensitive data (e.g., customer information, internal reports, financial records) must not be stored on personal devices.',
          'Employees should use secure cloud services or approved storage solutions provided by the bank to handle sensitive information.',
          'Personal devices used for remote work must not store unencrypted files or emails containing sensitive data.',
        ]
        
      },
      {
        subtopic: 'Guidelines for Using Remote Collaboration Tools Securely:',
        text: ['Employees must follow security best practices when using remote collaboration tools (e.g., video conferencing, file sharing, messaging apps)',
          'Only use approved collaboration platforms that comply with the bank’s security requirements.',
          'Ensure that all meetings and file transfers are conducted in encrypted environments.',
          'Sensitive information should not be shared over unsecured collaboration tools.',
          'Screen sharing should be limited to necessary content, and employees must ensure no sensitive data is visible during meetings.',
        ]
      },
      {
        subtopic: 'Mobile Device Security:',
        text: ['Mobile devices used for remote work must have:',
          'Strong passwords or biometric authentication enabled.',
          'Encryption enabled to protect sensitive data.',
          'Encryption enabled to protect sensitive data.',
          'Auto-lock and remote wipe features activated in case of loss or theft.',
          'Public Wi-Fi should be avoided when accessing sensitive bank systems. If necessary, a VPN must always be used.',
        ]
      },
      {
        subtopic: 'Examples of Secure Remote Work Practices',
        text: ['Secure: Accessing the bank’s systems via a VPN, using bank-approved collaboration tools, and storing files in secure cloud environments.',
          'Insecure: Accessing sensitive data over public Wi-Fi without a VPN, using unapproved apps for file sharing, or storing customer data on a personal device.',
        ]
      },
      {
        subtopic: 'Responsibilities',
        text: ['Employees: Must ensure their remote work environment complies with the bank’s security policies, including using VPNs, keeping devices updated, and following secure collaboration practices.',
          'IT Department: Provides and manages secure remote access solutions, including the VPN and endpoint protection tools, and monitors for potential security incidents.',
          'Supervisors/Managers: Ensure their teams are aware of and follow remote work security protocols.',
        ]
      },
      {
        subtopic: 'FAQs',
        text: ['Can I access the bank’s systems without a VPN? :- No, all remote access must go through the bank’s VPN for security purposes.',
          'What should I do if I need to store sensitive files? :- Use the secure cloud services or file storage solutions provided by the bank. Storing sensitive data on personal devices is prohibited.',
          'Which collaboration tools can I use for work? :- Only use bank-approved collaboration tools that meet the bank’s security standards. Contact IT if you’re unsure which tools are authorized.',
        ]
      },
      {
        subtopic: 'Compliance',
        text: 'Non-compliance with this policy, including unauthorized remote access or improper use of personal devices, may result in disciplinary action, including termination of employment, and legal actions if necessary.',
        
      },
      {
        subtopic: 'Contact IT Support',
        text: 'For assistance with remote access, VPN setup, or questions about secure remote work practices, contact the IT Department at [Phone Number] or [Email].',
        
      },
    ],
  },
  {
    id: 9,
    name: 'Information Classification and Handling Policy',
    content: [
      {
        subtopic: 'Purpose',
        text: 'This policy defines the classification levels of information at Samurdhi Bank and outlines the procedures for securely handling, storing, transmitting, and disposing of data based on its classification level. The goal is to ensure that sensitive information is protected according to its level of confidentiality and importance.',
      },
      {
        subtopic: 'Why It’s Important',
        text: 'Proper classification of information helps ensure that sensitive data is adequately protected and handled according to its risk level. By following this policy, Samurdhi Bank can prevent data breaches, unauthorized access, and misuse of critical information.',
      },
      {
        subtopic: 'Scope',
        text: 'This policy applies to all employees, contractors, and third-party service providers who handle, access, or manage Samurdhi Bank’s information, documents, and data.',
      },
      {
        subtopic: 'Policy Requirements',
      },
      {
        subtopic: 'Information at Samurdhi Bank is classified into the following categories:',
        text: ['Public: Information that can be freely shared with the public without risk (e.g., marketing materials, press releases).',
          'Internal: Information intended for internal use only, such as non-sensitive operational documents.',
          'Confidential: Information that is restricted to authorized personnel (e.g., customer records, internal reports). Unauthorized access or disclosure could harm the bank’s operations or reputation.',
          'Restricted: The most sensitive information (e.g., financial records, private customer data, legal documents). Access is strictly limited to select individuals, and improper handling or disclosure could have severe financial, legal, or reputational impacts.',
        ]
      },
      {
        subtopic: 'Handling, Storing, and Transmitting Information:',
        text: ['Public Information: Can be freely distributed. No special handling or security requirements.',
          'Internal Information: Must be stored in approved internal systems and not shared externally without authorization. Emailing or sharing this information must be done within secure, internal channels.',
        ]
      },
      {
        subtopic: 'Confidential Information:',
        text: ['Must be stored in encrypted databases or secure file storage systems.',
          'Can only be shared with authorized personnel. When transmitted, it must be done via encrypted email or secure file transfer methods.',
          'Physical copies must be stored in locked cabinets.',
        ]
        
      },
      {
        subtopic: 'Restricted Information:',
        text: ['Requires the highest level of security and must be encrypted at rest and in transit.',
          'Access is limited to authorized personnel based on job roles.',
          'When shared, use secure, authenticated methods such as TLS or VPN.',
          'Physical copies must be stored in high-security storage with limited access.',
        ]
      },
      {
        subtopic: 'Document Storage and Disposal:',
      },
      {
        subtopic: 'Secure Storage:',
        text: ['All classified information must be stored in designated secure systems, databases, or storage facilities depending on its classification.',
          'Access to these systems or physical storage must be limited based on the classification level.',
        ]
      },
      {
        subtopic: 'Disposal:',
        text: ['Public and Internal information can be discarded using regular methods.',
          'Confidential and Restricted information must be securely destroyed using approved disposal methods:',
          'Shredding for paper documents.',
        ]
      },
      {
        subtopic: 'Access Control Based on Information Classification:',
        text: ['Access to information must be granted according to its classification level using role-based access control (RBAC).',
          'Least privilege principle must be enforced, ensuring that employees only access the information necessary for their job roles.',
          'Regular audits of access permissions will be conducted to ensure compliance with access control requirements.',
        ]
      },
      {
        subtopic: 'Examples of Classified Information Handling',
        text: ['Confidential: Customer financial data is stored in an encrypted database and only accessible by authorized personnel. When no longer needed, it is securely deleted.',
          'Restricted: Legal documents related to mergers are stored in a high-security vault and transmitted only using encrypted email with multi-factor authentication (MFA).',
        ]
      },
      {
        subtopic: 'Responsibilities',
        text: ['Employees: Must handle, store, and transmit information according to its classification level and report any unauthorized access or misuse.',
          'IT Department: Responsible for enforcing encryption and access controls and ensuring secure systems are in place for storing classified information.',
          'Supervisors/Managers: Ensure that their teams understand the classification levels and follow the handling and storage protocols.',
        ]
      },
      {
        subtopic: 'FAQs',
        text: ['How do I determine the classification level of a document? :- Refer to the bank’s classification guidelines or consult with your supervisor. If unsure, classify information as confidential until further clarification.',
          'What should I do if I need to share confidential information externally? :- Use approved secure transmission methods such as encrypted email or secure file sharing. Do not use public or unsecured platforms.',
          'How should I dispose of restricted information? :- Physical copies should be shredded, and digital files should be securely wiped or destroyed by the IT Department.',
        ]
      },
      {
        subtopic: 'Compliance',
        text: 'Failure to comply with this policy, including improper handling or unauthorized access to classified information, may result in disciplinary action, including termination of employment. Legal action may be taken in cases of severe violations.',
        
      },
      {
        subtopic: 'Contact IT Support',
        text: 'For assistance with remote access, VPN setup, or questions about secure remote work practices, contact the IT Department at [Phone Number] or [Email].',
        
      },
    ],
  },
  {
    id: 10,
    name: 'Third-Party and Vendor Management Policy',
    content: [
      {
        subtopic: 'Purpose',
        text: 'This policy defines the requirements for managing third-party vendors at Samurdhi Bank. It aims to ensure that all vendors comply with the bank’s security standards and protocols to protect sensitive data and minimize potential risks.',
      },
      {
        subtopic: 'Why It’s Important',
        text: 'Third-party vendors may have access to critical systems, data, or operations of the bank. Inadequate management of these relationships can lead to security vulnerabilities, data breaches, and regulatory non-compliance. By following this policy, Samurdhi Bank ensures that vendors adhere to the bank’s security, privacy, and operational standards, reducing risk exposure.',
      },
      {
        subtopic: 'Scope',
        text: 'This policy applies to all employees, departments, and business units of Samurdhi Bank that engage third-party vendors, contractors, or service providers who have access to the bank’s systems, data, or operations.',
      },
      {
        subtopic: 'Policy Requirements',
      },
      {
        subtopic: 'Security Screening and Risk Assessment of Vendors',
        text: ['All third-party vendors must undergo a comprehensive security screening before engagement.',
          'Risk assessments must be conducted to evaluate the potential impact of the vendor on Samurdhi Bank’s operations and security. The risk assessment will include evaluating the vendor’s history of data breaches, compliance with regulatory standards, and data handling practices.',
        ]
      },
      {
        subtopic: 'Contractual Security Obligations',
      },
      {
        subtopic: 'Vendor contracts must include clear security obligations, covering:',
        text: ['Data handling requirements: outlining how the vendor will process, store, and protect the bank’s data.',
          'Breach notification: vendors are required to notify Samurdhi Bank immediately in case of a data breach or security incident.',
          'Compliance requirements: vendors must comply with relevant data protection regulations and Samurdhi Bank’s internal policies.',
        ]
      },
      {
        subtopic: 'Regular Audits of Third-Party Systems',
        text: ['Samurdhi Bank will conduct regular audits of the security systems and practices of third-party vendors to ensure ongoing compliance with the bank’s standards.',
          'Audits may include assessments of the vendor’s data protection mechanisms, access control policies, and overall security posture.',
        ]
        
      },
      {
        subtopic: 'Vendor Access Termination Procedures',
        text: ['Vendor access to the bank’s systems or data must be terminated once the business relationship ends or when access is no longer required.',
          'This includes deactivating any user credentials, revoking permissions, and ensuring that all sensitive data shared with the vendor is securely returned or destroyed.',
        ]
      },
      {
        subtopic: 'Document Storage and Disposal',
        text: ['Vendor-related documentation, including contracts and risk assessments, must be securely stored and accessible only to authorized personnel.',
          'Upon termination of a vendor relationship, any confidential or restricted data held by the vendor must be securely destroyed or returned to Samurdhi Bank.',
        ]
      },
      {
        subtopic: 'Access Control Based on Vendor Services:',
        text: ['Vendors must have limited access to the banks systems and data, restricted to what is necessary for their contracted services.',
          'Role-based access control (RBAC) must be enforced, ensuring that vendors only access systems or data relevant to their work.',
        ]
      },
      {
        subtopic: 'Responsibilities',
        text: ['Employees: Must ensure compliance with this policy when engaging third-party vendors.',
          'IT Department: Responsible for conducting security screenings, risk assessments, and audits of vendor systems.',
          'Procurement Department: Ensures that contractual obligations with vendors include the necessary security and compliance requirements.',
          'Legal Department: Reviews and approves all vendor contracts to ensure that legal and regulatory obligations are met.',
        ]
      },
      {
        subtopic: 'FAQs',
        text: ['How is vendor risk assessed? :- A risk assessment is conducted by the IT and Procurement departments before engaging a vendor, focusing on their security history, data handling, and compliance practices.',
          'What happens if a vendor fails an audit? :- If a vendor fails an audit, immediate corrective actions will be required, which could include contract termination if compliance is not restored.',
          'How should vendor access be terminated? :- Once vendor services are no longer required, their access to Samurdhi Bank’s systems must be revoked, and any data they hold must be securely deleted or returned.',
        ]
      },
      {
        subtopic: 'Compliance',
        text: 'Failure to adhere to this policy may result in disciplinary action for employees and the termination of vendor contracts. In cases of severe non-compliance or security incidents, legal actions may also be taken.',
        
      },
      {
        subtopic: 'Contact IT Support',
        text: 'For assistance with remote access, VPN setup, or questions about secure remote work practices, contact the IT Department at [Phone Number] or [Email].',
        
      },
    ],
  },
  {
    id: 11,
    name: 'Physical Security Policy',
    content: [
      {
        subtopic: 'Purpose',
        text: 'This policy defines the requirements for securing physical access to Samurdhi Bank’s offices and data centers. The goal is to ensure that access to sensitive areas is controlled, monitored, and restricted to authorized personnel only, reducing the risk of unauthorized entry and security breaches.',
      },
      {
        subtopic: 'Why It’s Important',
        text: 'Controlling physical access to Samurdhi Bank’s offices and data centers is essential to safeguard sensitive information, equipment, and critical infrastructure. Unauthorized access to these areas can result in data breaches, theft, or damage to the bank’s assets. By implementing stringent physical security measures, the bank can protect its operations and maintain customer trust.',
      },
      {
        subtopic: 'Scope',
        text: 'This policy applies to all employees, contractors, and visitors who require access to Samurdhi Bank’s offices, data centers, and secure areas.',
      },
      {
        subtopic: 'Policy Requirements',
        text: ['Control of Entry to Secure Areas',
          'Access to secure areas such as data centers, server rooms, and sensitive operational zones must be controlled using keycards, biometric authentication, or other approved security systems.',
          'Only authorized personnel with a verified need-to-access should be granted entry to these areas.',
          'Multi-factor authentication may be required for particularly sensitive locations.',
        ]
      },

      {
        subtopic: 'Surveillance of Critical Areas',
        text: ['CCTV monitoring must be implemented in all critical areas, including data centers, server rooms, and other high-security zones.',
          'Surveillance footage must be recorded, securely stored, and regularly reviewed to ensure compliance with security protocols.',
        ]
      },
      {
        subtopic: 'Logging and Monitoring of Visitor Access',
        text: ['All visitor access to secure areas must be logged, including the time of entry, exit, and the purpose of the visit.',
          'Visitors must be accompanied by an authorized employee during their time in secure areas.',
          'Visitor logs must be regularly reviewed and securely stored for auditing purposes.',
        ]
        
      },
      {
        subtopic: 'Guidelines for Securing Workstations and Data Storage Rooms',
        text: ['Employees must lock workstations when leaving their desks, especially in public or shared office areas.',
          'Data storage rooms must be locked at all times and only accessible to authorized personnel. Sensitive paper documents and backup storage devices should be kept in secure, locked cabinets.',
          'Portable storage devices such as USB drives must be securely stored when not in use.',
        ]
      },
      {
        subtopic: 'Document Storage and Disposal',
        text: ['Physical documents and data storage devices containing confidential or restricted information must be securely stored in locked cabinets or data storage rooms.',
          'Disposal of sensitive physical documents must be done through shredding or other approved destruction methods.',
        ]
      },
      {
        subtopic: 'Access Control Based on Security Zones',
        text: ['Physical access control measures must be implemented based on the security level of each area within the bank’s premises.',
          'Role-based access control (RBAC) will determine the level of access granted to employees, contractors, and visitors based on their job functions.',
        ]
      },
      {
        subtopic: 'Responsibilities',
        text: ['Employees: Responsible for following physical security protocols, such as securing workstations and reporting any suspicious activities.',
          'Security Department: Manages keycard and biometric systems, monitors CCTV footage, and handles visitor access logs.',
          'IT Department: Ensures that secure data storage facilities are properly protected and that surveillance systems are functioning.',
          'Facility Management: Responsible for the maintenance of physical security systems and ensuring that secure areas are properly monitored and locked.',
        ]
      },
      {
        subtopic: 'FAQs',
        text: ['How can I request access to a secure area? :- Access requests must be submitted through the Security Department, and approval will be based on job roles and security requirements.',
          'What should I do if I lose my keycard? :- Immediately report the loss to the Security Department so the card can be deactivated and replaced.',
          'How are visitors logged? :- Visitors must check in with the Security Department, where their access will be logged, and they will be issued a temporary access badge.',
        ]
      },
      {
        subtopic: 'Compliance',
        text: 'Failure to comply with this policy may result in disciplinary action, including termination of employment. Unauthorized access or security breaches could lead to legal actions and penalties.',
        
      },
      {
        subtopic: 'Contact Security Department',
        text: 'For assistance with physical security, access requests, or reporting suspicious activities, contact the Security Department at [Phone Number] or [Email].',
        
      },
    ],
  },
  {
    id: 12,
    name: 'Audit and Monitoring Policy',
    content: [
      {
        subtopic: 'Purpose',
        text: 'This policy establishes the guidelines for regularly auditing and monitoring Samurdhi Bank’s systems to ensure compliance with security standards, detect potential threats, and maintain the integrity of the banks operations. It aims to protect the bank from potential breaches or unauthorized activity.',
      },
      {
        subtopic: 'Why It’s Important',
        text: 'Regular audits and continuous monitoring are critical to identifying security vulnerabilities, unauthorized access, and non-compliance with bank policies or regulations. By adhering to this policy, Samurdhi Bank can ensure the early detection of risks, maintain compliance, and protect its systems and data from malicious activities.',
      },
      {
        subtopic: 'Scope',
        text: 'This policy applies to all systems, applications, networks, and users within Samurdhi Bank, including employees, contractors, and third-party vendors who have access to the bank’s systems.',
      },
      {
        subtopic: 'Policy Requirements',
        text: ['Continuous Monitoring of Network Activity and System Logs',
          'The bank’s IT Department must ensure continuous monitoring of network traffic, user actions, and system logs across all critical systems and applications.',
          'Monitoring tools must be in place to detect suspicious activity, unauthorized access, or abnormal patterns that could indicate a security breach.',
          'Alerts should be set up to notify security personnel of any potential threats in real time.',
        ]
      },

      {
        subtopic: 'Regular Audits of Access Controls and Security Configurations',
        text: ['Regular audits must be conducted to review user access controls, security configurations, and compliance with security policies.',
          'Access control audits must ensure that role-based access control (RBAC) is enforced and that users only have access to the systems and data necessary for their job roles.',
          'Audits of security configurations should focus on firewall settings, encryption protocols, and system hardening measures.',
        ]
      },
      {
        subtopic: 'Retention of Logs and Audit Trails',
        text: ['All system logs, user activity logs, and audit trails must be securely retained for a defined period, typically 12 to 24 months, depending on regulatory requirements.',
          'Logs should be stored in a secure and tamper-proof manner to prevent unauthorized modification or deletion.',
          'After the retention period, logs must be securely archived or destroyed according to the bank’s data retention policies.',
        ]
        
      },
      {
        subtopic: 'Reporting Audit Findings and Corrective Actions',
        text: ['All audit findings, including non-compliance or security vulnerabilities, must be reported to management and the relevant stakeholders.',
          'A plan for corrective actions must be created and implemented based on the audit results to address identified issues.',
          'Follow-up audits must be conducted to ensure that corrective actions have been completed and are effective.',
        ]
      },
      {
        subtopic: 'Document Storage and Disposal',
        text: ['All audit reports and monitoring logs must be securely stored in compliance with the bank’s data storage policies.',
          'Upon the expiration of the retention period, audit logs should be securely deleted or archived to prevent unauthorized access.',
        ]
      },
      {
        subtopic: 'Access Control for Audit Data',
        text: 'Access to logs, audit trails, and monitoring data must be restricted to authorized personnel in the IT and Security departments. Only individuals with a legitimate need should have access to this data.',
        
      },
      {
        subtopic: 'Responsibilities',
        text: ['IT Department: Responsible for setting up and maintaining monitoring systems, conducting audits, and ensuring that logs are securely stored.',
          'Security Department: Monitors the network and system logs, investigates suspicious activities, and ensures compliance with security policies.',
          'Management: Reviews audit findings and ensures that corrective actions are taken promptly.',

        ]
      },
      {
        subtopic: 'FAQs',
        text: ['Regular audits are typically conducted on a quarterly or bi-annual basis, depending on regulatory requirements and internal security protocols.',
          'What happens if a security issue is identified during an audit? :- If a security issue is identified, it will be reported to management, and a corrective action plan will be developed and implemented to resolve the issue.',
          'How long are logs retained? :- Logs and audit trails are typically retained for 12 to 24 months, depending on regulatory and business requirements.',
        ]
      },
      {
        subtopic: 'Compliance',
        text: 'Non-compliance with this policy may result in disciplinary actions, including termination of access to systems or employment. Security breaches due to inadequate monitoring or audits may also lead to legal consequences for the bank.',
        
      },
      {
        subtopic: 'Contact IT Support',
        text: 'For assistance with audit and monitoring systems or to report security issues, contact the IT Department at [Phone Number] or [Email].',
        
      },
    ],
  },
  
  // Add more policies with subtopics here
];


const Policies = () => {
  const { user } = useAuthStore();  // Get the logged-in user
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [isPolicyRead, setIsPolicyRead] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");  // To show error if policy already read

  const openModal = (policy) => {
    setSelectedPolicy(policy);
    setErrorMessage("");  // Reset error message when opening a new policy
  };
  const closeModal = () => setSelectedPolicy(null);

  const handlePolicyRead = async (policy) => {
    try {
      // Send a request to the backend to save policy read status
      const response = await axios.post('http://localhost:5000/api/policy/read', {
        user: user.name,
        policyId: policy.id,
        policyName: policy.name
      });

      console.log(response.data.message);  // Log success message
      setIsPolicyRead(true);  // Update state to indicate policy has been read
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);  // Set error message if already read
      } else {
        console.error('Error saving policy read status', error);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-wrap gap-5 justify-center p-5">
        {policies.map((policy) => (
          <div
            key={policy.id}
            className="bg-white border border-gray-300 p-6 w-64 h-52 cursor-pointer text-center rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl hover:border-gray-400 duration-300 ease-in-out"
            onClick={() => openModal(policy)}
          >
            <h3 className="font-bold text-lg text-gray-800">{policy.name}</h3>
          </div>
        ))}
      </div>

      {selectedPolicy && (
        <Modal
          isOpen={!!selectedPolicy}
          onRequestClose={closeModal}
          className="bg-white p-8 w-[90vw] md:w-[800px] h-[75vh] mx-auto rounded-lg shadow-lg overflow-y-auto border border-gray-200 mt-10 transition-transform duration-300"
        >
          <h2 className="font-bold text-2xl mb-4 text-gray-900">{selectedPolicy.name}</h2>
          {selectedPolicy.content.map((section, index) => (
            <div key={index} className="policy-section mt-6">
              <h3 className="font-semibold text-xl text-gray-800">{section.subtopic}</h3>
              {Array.isArray(section.text) ? (
                <ul className="list-disc list-inside mt-2 text-gray-700">
                  {section.text.map((item, idx) => (
                    <li key={idx} className="ml-4">{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-gray-700">{section.text}</p>
              )}
            </div>
          ))}

          {/* Acknowledgment section */}
          <div className="acknowledgment mt-8 flex items-center space-x-2">
            <input
              type="radio"
              className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded-full"
              checked={isPolicyRead}
              onChange={() => handlePolicyRead(selectedPolicy)}  // Call API when checked
              disabled={isPolicyRead || !!errorMessage}  // Disable if already read or error
            />
            <span className="text-gray-600">I have read this policy</span>
          </div>

          {/* Display error message if the policy is already read */}
          {errorMessage && (
            <p className="text-red-600 mt-4">{errorMessage}</p>
          )}

          <button
            onClick={closeModal}
            className="mt-6 p-3 w-full md:w-auto bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out shadow-lg"
          >
            Close
          </button>
        </Modal>
      )}

      <Footer />
    </div>
  );
};

export default Policies;