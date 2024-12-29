import Contact from "../model/Contact.js";

// SEND INPUT DATA FROM CONTACT-US
export const postContact = async (req, res) => {
  try {
    const contact = req.body;
    if (
      !contact.name ||
      !contact.email ||
      !contact.subject ||
      !contact.message
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the input fields",
      });
    }

    const newContact = new Contact(contact);
    await newContact.save();

    return res.status(201).json({ success: true, data: newContact });
  } catch (error) {
    console.error("Error sending the contact form:", error.message);

    if (!res.headersSent) {
      return res.status(500).json({ success: false, message: "Server Error." });
    }
  }
};
