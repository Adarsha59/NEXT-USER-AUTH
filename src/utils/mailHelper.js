const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
import UserData from "@/models/user.model";

const mailHelper = async ({ email, emailType, userId }) => {
  try {
    // Generate verification or reset token if necessary
    const token = await bcrypt.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await UserData.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: token,
          verifyTokenExpiration: Date.now() + 3600000, // 1 hour
        },
      });
    } else if (emailType === "RESET") {
      await UserData.findByIdAndUpdate(userId, {
        $set: {
          resetToken: token,
          resetTokenExpiration: Date.now() + 3600000, // 1 hour
        },
      });
    } else {
      throw new Error("Invalid email type");
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "9588f0de4cef15",
        pass: "df5266fc5b10bd",
      },
    });

    const mailOptions = {
      from: "code.adarsha@gmail.com", // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your Password", // Subject line
      html: `
    
    <h1>${
      emailType === "VERIFY" ? "Verify your email" : "Reset your Password"
    }</h1>
    
    <p>Please ${
      emailType === "VERIFY" ? "verify" : "reset"
    } your email address by clicking the following link:</p>
    
    <a href="http://localhost:3000/api/users/verify/${token}">Verify</a>
    
    ${
      emailType === "RESET"
        ? `
    <p>If you didn't request a password reset, please ignore this email.</p>
    <p>Your password reset token is valid for 1 hour.</p>
    <a href="http://localhost:3000/api/users/reset?token=${token}">Reset Password</a>
    `
        : `
    
    <p>If you didn't request a verification, please ignore this email.</p>
    <p>Your verification token is valid for 1 hour.</p>
    <a href="http://localhost:3000/verify?token=${token}">Verify</a>
    `
    }
    `,
    };
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Error sending email: ", error);
    throw new Error("Failed to send email");
  }
};

export default mailHelper;
