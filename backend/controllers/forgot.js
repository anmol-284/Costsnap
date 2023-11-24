const user = require("../models/usermodel");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.forgot = async (req, res) => {
  const { email } = req.body;

  try {
    const foundUser = await user.findOne({ email });

    if (!foundUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const token = jwt.sign({ id: foundUser._id }, process.env.SUPER_SECRET, {
      expiresIn: "1hr",
    });

    const transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.USER,
        pass: process.env.PSWD,
      },
    });

    const mailOptions = {
      from: process.env.USER,
      to: email,
      subject: "CostSnap Reset Password Link",
      text: `http://localhost:8000/forgot/${foundUser._id}/${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error in sending Email:", error);
        return res
          .status(500)
          .json({ success: false, message: "Error in sending email." });
      } else {
        console.log("Email sent.", info.response);
        return res
          .status(200)
          .json({ success: true, message: "Email sent successfully." });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};
