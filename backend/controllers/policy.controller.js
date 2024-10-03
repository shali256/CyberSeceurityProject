import { PolicyRead } from '../models/Policy.model.js';

export const savePolicyReadStatus = async (req, res) => {
    const { user, policyId, policyName } = req.body;
  
    try {
      // Check if the user has already read this policy
      const existingRecord = await PolicyRead.findOne({ user, policyId });
      if (existingRecord) {
        return res.status(400).json({ message: 'You have already read this policy.' });
      }
  
      // If not read, save the policy read status
      const policyRead = new PolicyRead({
        user,
        policyId,
        policyName,
      });
  
      await policyRead.save();
      res.status(201).json({ message: 'Policy read status saved successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Error saving policy read status.', error });
    }
  };

  export const getReadPolicies = async (req, res) => {
    try {
      // Fetch all policies that have been read
      const readPolicies = await PolicyRead.find().select('user policyName readAt').lean();
  
      // Return the list of read policies
      res.status(200).json(readPolicies);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching read policies', error });
    }
  };