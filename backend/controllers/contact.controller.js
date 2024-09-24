import Contact from '../models/contact.model.js';

/** POST: http://localhost:8080/api/contact */
export async function createContact(req, res) {
  const { username, email, message } = req.body;

  try {
    const newContact = new Contact({
      username,
      email,
      message
    });

    await newContact.save();
    return res.status(201).json({ message: 'Contact form submitted successfully', contact: newContact });
  } catch (error) {
    console.error('Error saving contact form:', error);
    return res.status(500).json({ message: 'Error saving contact form', error: error.message });
  }
}

/** GET: http://localhost:8080/api/contacts */
export async function getContacts(req, res) {
  try {
    const contacts = await Contact.find();
    return res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return res.status(500).json({ message: 'Error fetching contacts', error: error.message });
  }
}

/** DELETE: http://localhost:8080/api/contact/:id */
export async function deleteContact(req, res) {
  const { id } = req.params;
  
  try {
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    return res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    return res.status(500).json({ message: 'Error deleting contact', error: error.message });
  }
}

export async function updateContactResponse(req, res) {
    const { id } = req.params;
    const { response } = req.body;
  
    try {
      const contact = await Contact.findById(id);
      if (!contact) return res.status(404).json({ message: 'Contact not found' });
  
      contact.response = response;
      await contact.save();
      return res.status(200).json({ message: 'Response updated successfully', contact });
    } catch (error) {
      console.error('Error updating contact response:', error);
      return res.status(500).json({ message: 'Error updating contact response', error: error.message });
    }
  }



export async function getContactByUsername(req, res) {
        const { username} = req.params;
        try {
          const results = await Contact.find({ username });
          res.status(200).json(results);
        } catch (error) {
          res.status(400).json({ success: false, message: error.message });
        }
      };