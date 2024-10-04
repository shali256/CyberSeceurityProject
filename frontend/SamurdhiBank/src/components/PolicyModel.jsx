import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PolicyModal = ({ onAgree }) => {
//   const [showDisagreeConfirmation, setShowDisagreeConfirmation] = useState(false);
  const navigate = useNavigate();

//   const confirmDisagree = () => {
//     setShowDisagreeConfirmation(false);
//     navigate("/"); // Navigate to login page if the user disagrees
//   };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-3xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Acceptable Use Policy</h2>
        
        {/* Policy Content */}
        <div className="policy-content overflow-y-auto max-h-80 mb-4 p-4 border rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Purpose</h3>
          <p>This policy outlines acceptable uses of Samurdhi Bank’s technology, systems, and information assets to ensure their secure, ethical, and lawful use.</p>
          
          <h3 className="font-semibold text-lg mb-2">Why It’s Important</h3>
          <p>The use of Samurdhi Bank’s IT systems and resources must align with the bank’s security, privacy, and legal requirements. This policy helps protect the bank’s assets, prevent security breaches, and maintain the integrity of its operations.</p>

          <h3 className="font-semibold text-lg mb-2">Scope</h3>
          <p>This policy applies to all employees, contractors, consultants, temporary staff, and any other individuals who use Samurdhi Bank’s IT systems, devices, and network resources.</p>

          <h3 className="font-semibold text-lg mb-2">Policy Requirements</h3>
          <p>Personal Use of Company Devices and Networks:</p>
          <ul className="list-disc list-inside">
            <li>Limited personal use of company devices and network resources is allowed, provided it does not interfere with work duties or violate this policy.</li>
            <li>Employees must not engage in any activity that consumes excessive bandwidth, such as streaming non-work-related media.</li>
          </ul>

          <p>Software and Application Usage:</p>
          <ul className="list-disc list-inside">
            <li>Unauthorized Software: Employees are prohibited from downloading or installing any unauthorized software or applications on company devices without approval from the IT Department.</li>
            <li>All software must be approved by IT to ensure compatibility, licensing, and security.</li>
          </ul>

          <p>Email, Internet, and Messaging Tools:</p>
          <ul className="list-disc list-inside">
            <li>Email Usage: Employees must use company-provided email accounts for all official communication. Sending sensitive information via personal email accounts is prohibited.</li>
            <li>Safe Browsing: Employees must practice safe browsing habits, avoiding untrustworthy websites or links.</li>
            <li>Messaging Tools: Use of instant messaging apps for business purposes must be authorized and secure.</li>
          </ul>

          <p>Prohibition of Illegal Activities:</p>
          <ul className="list-disc list-inside">
            <li>Bank resources must not be used for any activities that are illegal, unethical, or violate company policies, including but not limited to:</li>
            <li>Accessing or distributing offensive or inappropriate content.</li>
            <li>Engaging in unauthorized transactions or illegal file sharing.</li>
            <li>Hacking, phishing, or attempting to bypass security controls.</li>
          </ul>

          <h3 className="font-semibold text-lg mb-2">Responsibilities</h3>
          <p>Employees: Must adhere to this policy at all times and report any suspicious activity or violations.</p>
          <p>IT Department: Responsible for enforcing this policy and maintaining the security of the bank’s systems.</p>
          <p>Supervisors/Managers: Must ensure that their team members understand and comply with the acceptable use policy.</p>

          <h3 className="font-semibold text-lg mb-2">Compliance</h3>
          <p>Failure to comply with this policy may result in disciplinary actions, including termination of employment, and legal actions if illegal activities are involved.</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center mt-6">
          {/* <button
            onClick={() => setShowDisagreeConfirmation(true)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Disagree
          </button> */}
          <button
            onClick={onAgree}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Agree
          </button>
        </div>

        {/* Disagree Confirmation
        {showDisagreeConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p>Are you sure you want to disagree? You will be navigated back to the login page.</p>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setShowDisagreeConfirmation(false)}
                  className="bg-gray-300 text-black px-4 py-2 rounded mr-2 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDisagree}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Confirm Disagree
                </button>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default PolicyModal;
