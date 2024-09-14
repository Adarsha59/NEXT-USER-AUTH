const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
import UserData from "@/models/user.model";

const mailHelper = async ({ email, emailType, userId }) => {
  try {
    // Generate verification or reset token
    const token = await bcrypt.hash(userId.toString(), 10);

    // Update the database based on email type
    if (emailType === "VERIFY") {
      await UserData.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: token,
          verifyTokenExpiration: Date.now() + 3600000, // 1 hour expiration
        },
      });
    } else if (emailType === "RESET") {
      await UserData.findByIdAndUpdate(userId, {
        $set: {
          resetToken: token,
          resetTokenExpiration: Date.now() + 3600000, // 1 hour expiration
        },
      });
    } else {
      throw new Error("Invalid email type");
    }

    // Setup the transporter (Mailtrap example)
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "9588f0de4cef15",
        pass: "df5266fc5b10bd",
      },
    });

    // Define the mail options
    const mailOptions = {
      from: "code.adarsha@gmail.com", // sender address
      to: email, // receiver's email
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your Password", // email subject
      html: `
        <h1>${
          emailType === "VERIFY" ? "Verify your Email" : "Reset your Password"
        }</h1>
        <p>Please ${
          emailType === "VERIFY" ? "verify" : "reset"
        } your email by clicking the following link:</p>
        <a href="http://localhost:3000/api/users/verify?token=${token}">
          ${emailType === "VERIFY" ? "Verify Email" : "Reset Password"}
        </a>
        ${
          emailType === "RESET"
            ? `
            <p>If you did not request a password reset, please ignore this email.</p>
            <p>Your password reset token is valid for 1 hour.</p>
          `
            : `
            <p>If you did not request email verification, please ignore this email.</p>
            <p>Your verification token is valid for 1 hour.</p>
          `
        }
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

export default mailHelper;
