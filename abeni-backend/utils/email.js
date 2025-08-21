const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendPasswordResetEmail = async (email, resetUrl) => {
  const mailOptions = {
    from: `Abeni Perfumes <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: 'Password Reset Request',
    html: `
      <p>You requested a password reset. Click the link below:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>This link expires in 10 minutes.</p>
    `
  };
  await transporter.sendMail(mailOptions);
};

const sendVerificationEmail = async (email, verificationCode) => {
  const mailOptions = {
    from: `Abeni Perfumes <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: 'Welcome to Abeni Perfumes - Verify Your Email',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #c49357;">Welcome to Abeni Perfumes!</h2>
        <p>Thank you for joining our fragrance community. To complete your registration, please enter this verification code:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <div style="
            background: #c49357; 
            color: white; 
            padding: 20px; 
            border-radius: 10px; 
            font-size: 32px; 
            font-weight: bold; 
            letter-spacing: 8px;
            display: inline-block;
            min-width: 200px;
          ">
            ${verificationCode}
          </div>
        </div>
        
        <p style="text-align: center; color: #666; font-size: 14px;">
          Enter this code on the verification page to complete your registration.
        </p>
        
        <p style="color: #666; font-size: 14px;">
          This code will expire in 10 minutes for security reasons.
        </p>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 14px;">
          If you didn't create an account with Abeni Perfumes, you can safely ignore this email.
        </p>
      </div>
    `
  };
  await transporter.sendMail(mailOptions);
};

const sendNewsletterSubscriptionEmail = async (email, personalDiscountCode) => {
  const mailOptions = {
    from: `Abeni Perfumes <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: 'Welcome to Abeni Perfumes Newsletter! 🎉',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
        <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #c49357; margin: 0; font-size: 28px;">Welcome to Abeni Perfumes!</h1>
            <p style="color: #666; margin: 10px 0 0 0; font-size: 16px;">Your journey into Ethiopian fragrances begins now</p>
          </div>
          
          <div style="background: linear-gradient(135deg, #c49357, #e6b17a); padding: 25px; border-radius: 8px; margin: 25px 0; text-align: center;">
            <h2 style="color: white; margin: 0 0 15px 0; font-size: 24px;">🎁 Your Exclusive Welcome Offer</h2>
            <p style="color: white; margin: 0; font-size: 18px; font-weight: bold;">Get 15% OFF your first order!</p>
            <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Use your personal code: <strong style="font-size: 20px;">${personalDiscountCode}</strong></p>
            <p style="color: white; margin: 10px 0 0 0; font-size: 12px; font-style: italic;">⚠️ This code is unique to you and can only be used once</p>
          </div>
          
          <div style="margin: 30px 0;">
            <h3 style="color: #333; margin-bottom: 20px;">What to expect from us:</h3>
            <div style="display: flex; align-items: center; margin: 15px 0;">
              <span style="background: #c49357; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; font-size: 14px;">🌺</span>
              <span style="color: #555;">Early access to new Ethiopian-inspired fragrances</span>
            </div>
            <div style="display: flex; align-items: center; margin: 15px 0;">
              <span style="background: #c49357; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; font-size: 14px;">💎</span>
              <span style="color: #555;">Exclusive member-only discounts and promotions</span>
            </div>
            <div style="display: flex; align-items: center; margin: 15px 0;">
              <span style="background: #c49357; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; font-size: 14px;">📚</span>
              <span style="color: #555;">Fragrance education and Ethiopian culture insights</span>
            </div>
            <div style="display: flex; align-items: center; margin: 15px 0;">
              <span style="background: #c49357; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; font-size: 14px;">🎯</span>
              <span style="color: #555;">Personalized fragrance recommendations</span>
            </div>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/shop" style="background: #c49357; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold; font-size: 16px;">
              Start Shopping Now
            </a>
          </div>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <h4 style="color: #333; margin: 0 0 15px 0;">Our Signature Ethiopian Ingredients:</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 14px;">
              <div style="color: #666;">☕ Ethiopian Coffee</div>
              <div style="color: #666;">🌹 Harar Rose</div>
              <div style="color: #666;">🌿 Koseret Herb</div>
              <div style="color: #666;">🕯️ Sacred Incense</div>
            </div>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          
          <div style="text-align: center; margin: 20px 0;">
            <p style="color: #666; font-size: 14px; margin: 0;">
              Follow us on social media for daily fragrance inspiration:
            </p>
            <div style="margin: 15px 0;">
              <a href="#" style="color: #c49357; text-decoration: none; margin: 0 10px; font-size: 16px;">📘 Facebook</a>
              <a href="#" style="color: #c49357; text-decoration: none; margin: 0 10px; font-size: 16px;">📷 Instagram</a>
              <a href="#" style="color: #c49357; text-decoration: none; margin: 0 10px; font-size: 16px;">🐦 Twitter</a>
            </div>
          </div>
          
          <div style="background: #fff3e0; padding: 20px; border-radius: 8px; border-left: 4px solid #c49357;">
            <p style="color: #8d6e63; margin: 0; font-size: 14px;">
              <strong>Note:</strong> You can unsubscribe from our newsletter at any time by clicking the unsubscribe link at the bottom of any email, or by contacting us directly.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #999; font-size: 12px; margin: 0;">
              Abeni Perfumes | Addis Ababa, Ethiopia<br>
              Bringing the essence of Ethiopia to the world
            </p>
          </div>
        </div>
      </div>
    `
  };
  
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Newsletter subscription email sent to: ${email}`);
  } catch (error) {
    console.error('Error sending newsletter subscription email:', error);
    throw error;
  }
};

module.exports = { 
  sendPasswordResetEmail, 
  sendVerificationEmail, 
  sendNewsletterSubscriptionEmail 
};