const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const User = require("../models/user-model");
const OTP = require("../models/userotpverification-model");


const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: `${process.env.GENERATE_EMAIL}`,
    pass: `${process.env.GENERATE_PASSWORD}`,
  },
});


const sendOTPByEmail = async (otp, recipientEmail) => {
  try {
    const info = await transporter.sendMail({
      from: `${process.env.MAIL_FROM}`,
      to:`${process.env.MAIL_TO}`,
      subject: "Your OTP",
      text: `Your OTP is: ${otp}`,
    });
    console.log("OTP email sent:", info);
    return true;
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return false;
  }
};

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const checkUserPresent = await User.findOne({ email });

    if (!checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User is already registered",
      });
    }

    
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    
    let result = await OTP.findOne({ otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      result = await OTP.findOne({ otp });
    }

    await OTP.create({ email, otp });

   
    const emailSent = await sendOTPByEmail(otp, email);

    if (emailSent) {
      return res.status(200).json({
        success: true,
        message: "OTP sent successfully",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Failed to send OTP via email",
      });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const otpRecord = await OTP.findOne({ email, otp });

    if (!otpRecord || otpRecord.expiry < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
        
      });
    }

    await OTP.deleteOne({ email, otp });

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
