import nodemailer from "nodemailer";

// Function to send the welcome email
export const sendWelcomeEmail = async (user) => {
  try {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      // Configure your email service provider
      service: "gmail",
      auth: {
        user: process.env.STORFLEET_SMPT_MAIL,
        pass: process.env.STORFLEET_SMPT_MAIL_PASSWORD,
      },
    });

    // Send the welcome email
    await transporter.sendMail({
      from: `${process.env.STORFLEET_SMPT_MAIL}`,
      to: user.email,
      subject: "Welcome to Our Company!",
      html: `
        <img src="https://files.codingninjas.in/logo1-32230.png" alt="Company Logo" style="display: block; margin: 0 auto;">
        <h1 style="text-align: center;">Welcome to Storefleet</h1>
        
        <p style="text-align: center;">Hello, ${user.name}</p>
        <p style="text-align: center;">Thank you for registering with Storefleet. We are excited to have you as a new member of our community</p>
        
        <div style="text-align: center;">
          <a href="#" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Get Started</a>
        </div>
      `,
    });

    console.log("Welcome email sent successfully!");
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};
