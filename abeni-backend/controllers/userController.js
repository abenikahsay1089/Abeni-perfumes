const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { sendPasswordResetEmail, sendVerificationEmail } = require('../utils/email');
const validator = require('validator');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Please fill all fields' });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Please enter a valid email' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }
    if (username.length < 3) {
      return res.status(400).json({ error: 'Username must be at least 3 characters' });
    }

    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      if (userExists.email === email) {
        return res.status(400).json({ error: 'Email already registered' });
      } else {
        return res.status(400).json({ error: 'Username already taken' });
      }
    }

    // Create user as unverified
    const user = await User.create({ username, email, password, isEmailVerified: false });

    // Create verification token with longer expiration (7 days)
    const rawToken = crypto.randomBytes(20).toString('hex');
    user.emailVerificationToken = crypto.createHash('sha256').update(rawToken).digest('hex');
    user.emailVerificationExpires = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
    await user.save();

    const verifyUrl = `${process.env.FRONTEND_URL}/verify-email/${rawToken}`;
    await sendVerificationEmail(user.email, verifyUrl);

    return res.status(201).json({
      success: true,
      message: 'Registration successful. Please check your email to verify your account.'
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    // Require email verification before login
    if (!user.isEmailVerified) {
      return res.status(403).json({ error: 'Please verify your email before logging in' });
    }

    const token = generateToken(user._id);
    res.json({ _id: user._id, username: user.username, email: user.email, isAdmin: user.isAdmin, token });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: 'If an account exists, a reset email has been sent' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    await sendPasswordResetEmail(user.email, resetUrl);

    res.json({ success: true, message: 'Password reset email sent' });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Server error during password reset' });
  }
};

const resetPassword = async (req, res) => {
  const { password } = req.body;
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

  try {
    const user = await User.findOne({
      passwordResetToken: hashedToken,
              passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ error: 'Invalid or expired token' });

    user.password = password;
          user.passwordResetToken = undefined;
          user.passwordResetExpires = undefined;
    await user.save();

    const token = generateToken(user._id);
    res.json({ success: true, token, message: 'Password updated successfully' });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Server error during password update' });
  }
};

// Verify email with debugging
const verifyEmail = async (req, res) => {
  const rawToken = req.params.token;
  const hashed = crypto.createHash('sha256').update(rawToken).digest('hex');
  
  try {
    console.log('Verifying email with token:', rawToken.substring(0, 10) + '...');
    console.log('Current time:', new Date().toISOString());
    
    const user = await User.findOne({
      emailVerifyToken: hashed
    });

    if (!user) {
      console.log('No user found with this token');
      return res.status(400).json({ error: 'Invalid verification link' });
    }

    console.log('User found:', user.email);
    console.log('Token expires at:', new Date(user.emailVerifyExpire).toISOString());
    console.log('Time until expiry:', user.emailVerifyExpire - Date.now(), 'ms');

    if (user.emailVerifyExpire < Date.now()) {
      console.log('Token has expired');
      return res.status(400).json({ error: 'Verification link has expired. Please request a new one.' });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    console.log('Email verified successfully for:', user.email);
    return res.json({ success: true, message: 'Email verified successfully. You can now log in.' });
    
  } catch (err) {
    console.error('Verify email error:', err);
    res.status(500).json({ error: 'Server error during email verification' });
  }
};

// Resend verification with longer expiration
const resendVerification = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.json({ success: true, message: 'If an account exists, an email has been sent' });
    if (user.isEmailVerified) return res.json({ success: true, message: 'Account already verified' });

    const rawToken = crypto.randomBytes(20).toString('hex');
    user.emailVerifyToken = crypto.createHash('sha256').update(rawToken).digest('hex');
    user.emailVerifyExpire = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
    await user.save();

    const verifyUrl = `${process.env.FRONTEND_URL}/verify-email/${rawToken}`;
    await sendVerificationEmail(user.email, verifyUrl);

    return res.json({ success: true, message: 'Verification email sent' });
  } catch (err) {
    console.error('Resend verification error:', err);
    res.status(500).json({ error: 'Server error while resending verification' });
  }
};



module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendVerification
};