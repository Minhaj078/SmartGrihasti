import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // You can change this
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"Support" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};
