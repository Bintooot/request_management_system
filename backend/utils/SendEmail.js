import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, text) => {
  // Create a transporter with Gmail's SMTP settings
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // Set up email data
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender's email (same as user in auth)
    to, // Recipient's email
    subject, // Subject of the email
    text, // Body of the email
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email. Please try again later.");
  }
};
