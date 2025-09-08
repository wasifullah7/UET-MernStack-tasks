const User = require("../models/userModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ message: "All Fields are required!" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({ message: "Already exits" });
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPass,
    });
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.json({ error: "All fields required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid User" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    //we are sending cookies to frontend
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ message: "User LogIn successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.logOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 10,
    });
    res.status(201).json({ message: "User LogOut successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.sendOtp = async (req, res) => {
  try {
    // const {userId} = req.body;
    const userId = req.userId;
    const user = await User.findById(userId);
    if (user.isAccountverified) {
      return res.json({ message: "already verified" });
    }

const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: process.env.SENDER_EMAIL, // your gmail (e.g. "yourname@gmail.com")
    //     pass: process.env.SENDER_EMAIL_PASSWORD, // app password from Gmail
    //   },
    // });

    // await transporter.sendMail(mailOption);

    res.json({ message: `your otp is ${otp}` });
    console.log(otp)
    await user.save();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.verifyEmail = async (req, res) => {
  //we have to receive this "userId",so we have to make middleware   which takes token from cookie then find UserId from that token. Also in verifyOtp function to take userid
  const { otp } = req.body;
  const userId = req.userId;
  if (!userId || !otp) {
    return res.json({ message: "Missing Credentials" });
  }
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.json({ message: "Not Found" });
    }

    if (user.verifyOtp === "" || user.verifyOtp != otp) {
      return res.json({ message: "Not Valid OTP or not verified!" });
    }

    if (user.verifyOtpExpireAt < Date.now()) {
      return res.json({ message: "OTP Expired" });
    }

    //verify the user account
    user.isAccountverified = true;
    //reset
    user.verifyOtpExpireAt = 0;
    user.verifyOtp = "";
    await user.save();
    return res.json({ message: "Successfully Account Created" });
  } catch (error) {
    return res.json({ error: error.message });
  }
};

// check if user is authenticate or not
exports.isAuthenticated = async (req, res) => {
  try {
    return res.json({ message: "Yes Authenticated" });
  } catch (error) {
    return res.json({ error: error.message });
  }
};

  //send reset otp
  exports.sendResetOtp = async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.json({ message: "Email required" });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.json({ message: "Not found" });
      }

      const otp = String(Math.floor(100000 + Math.random() * 900000));
      user.resetOtp = otp;
      user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;
      await user.save();
    

      // Configure transporter (move these to .env file for security)
      // const transporter = nodemailer.createTransport({
      //   service: "gmail",
      //   auth: {
      //     user: process.env.SENDER_EMAIL, // your gmail (e.g. "yourname@gmail.com")
      //     pass: process.env.SENDER_EMAIL_PASSWORD, // app password from Gmail
      //   },
      // });

      // await transporter.sendMail(mailOption);

      res.json({ message: `your otp is ${otp}` });
    } catch (error) {
      return res.json({ error: error.message });
    }
  };

  // now reset password with otp
  exports.resetPassword = async (req, res) => {
    const { email, otp, newPass } = req.body;
    if (!email || !otp || !newPass) {
      return res.json({ message: "email,otp, required and new password" });
    }
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.json({ message: "User not found" });
      }
      if (user.resetOtp === "" || user.resetOtp !== otp) {
        return res.json({ message: "OTP not matched" });
      }
      if (user.resetOtpExpireAt < Date.now()) {
        return res.json({ message: "OTP expired" });
      }
      const hashedPass = await bcrypt.hash(newPass, 10);

      user.password = hashedPass;
      user.resetOtp = "";
      user.resetOtpExpireAt = 0;
      await user.save();

      return res.json({ message: "Successfully reset password" });
    } catch (error) {
      return res.json({ err: error.message });
    }
  };
