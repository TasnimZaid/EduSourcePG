const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const knex = require('../knex-config');
const nodemailer = require('nodemailer');
require("dotenv").config();

// Configure nodemailer transport
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

// Function to send OTP
const sendOtp = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
  };
  
  return transporter.sendMail(mailOptions);
};

// Register a new teacher
exports.register = async (req, res) => {
  try {
    const { name, email, password, university_name , national_id } = req.body;

    // Check if the user already exists
    const existingUser = await knex('teacher').where({ email }).first();
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert the new teacher
    const newTeacher = await knex('teacher').insert({
      name,
      email,
      password: hashedPassword,
      university_name ,
      national_id
    }).returning('*'); // Return the inserted teacher

    // Generate and send OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
    await knex('teacher').where({ id: newTeacher[0].id }).update({ otp }); // Save OTP in the database
    await sendOtp(newTeacher[0].email, otp); // Send OTP to teacher's email

    res.status(201).json({ message: 'Registration successful. OTP sent to your email.', teacherId: newTeacher[0].id });
  } catch (error) {
    console.error('Registration failed:', error);
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

// Login a teacher (without OTP)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the teacher in the database
    const teacher = await knex('teacher').where({ email }).first();
    if (!teacher) {
      return res.status(401).json({ message: 'Invalid login information.' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, teacher.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid login information.' });
    }

    // Create a token
    const token = jwt.sign({ userId: teacher.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Send the response with token and teacher details
    res.json({
      message: "Login successful.",
      token,
      teacher: {
        id: teacher.id,
        name: teacher.name,
        email: teacher.email,
        university_name: teacher.university_name,
        role : teacher.role
      }
    });

  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

// Verify OTP
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Verify OTP
    const teacher = await knex('teacher').where({ email, otp }).first();
    if (!teacher) {
      return res.status(401).json({ message: 'Invalid OTP or email.' });
    }

    // Create a token
    const token = jwt.sign({ userId: teacher.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Clear OTP after successful verification
    await knex('teacher').where({ id: teacher.id }).update({ otp: null });

    // Send the token and teacher details
    res.status(200).json({
      message: 'OTP verified successfully.',
      token,
      teacher: {
        id: teacher.id,
        name: teacher.name,
        email: teacher.email,
        university_name: teacher.university_name,
      }
    });

  } catch (error) {
    console.error("Verification failed:", error);
    res.status(500).json({ message: "Verification failed", error: error.message });
  }
};

// Setup password for the teacher
exports.setupPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await knex("teacher").where({ email }).update({ password: hashedPassword });
    
    if (result === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "Password set successfully" });
  } catch (error) {
    console.error("Password setup failed:", error);
    res.status(500).json({ message: "Password setup failed", error: error.message });
  }
};
