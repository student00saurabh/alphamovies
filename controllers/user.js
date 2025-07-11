const { saveRedirectUrl } = require("../middleware.js");
const User = require("../models/user.js");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

module.exports.renderSignupForm = async (req, res) => {
  res.render("users/signup.ejs");
};

// Configure transporter (use your actual email service credentials)
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "thecubicals123@gmail.com",
    pass: process.env.EMAIL_PASS, // Use app-specific password
  },
});

module.exports.signup = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    const username = email.split("@")[0];
    const newUser = new User({ email, username });

    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, async (err) => {
      if (err) return next(err);

      // ✅ Send Welcome Email
      const mailOptions = {
        from: "AlphaMovies <noreply@alphamovies.in>",
        to: registeredUser.email,
        subject: "🎬 Welcome to AlphaMovies!",
        html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; background-color: #f4f7f9; border-radius: 12px; border: 1px solid #e0e0e0;">
      <h2 style="color: #78b4d2;">Hello ${registeredUser.username}, Welcome to AlphaMovies! 🍿</h2>
      <p style="font-size: 16px; color: #333;">You’re officially part of the AlphaMovies club — where cinema meets smart curation.</p>
      
      <p style="font-size: 15px; color: #555;">Here’s what you can do now:</p>
      <ul style="padding-left: 20px; color: #444;">
        <li>🎞️ Explore curated movie collections</li>
        <li>📚 Read quick summaries & detailed reviews</li>
        <li>🔖 Bookmark and share your favorites</li>
        <li>📆 Stay updated with latest releases & categories</li>
      </ul>

      <p style="font-size: 15px; color: #333;">Start watching, reviewing, and falling in love with films all over again!</p>

      <p style="margin-top: 30px; font-size: 15px; color: #444;">Cheers,<br><strong>The AlphaMovies Team</strong></p>
      
      <hr style="margin: 40px 0; border: none; border-top: 1px solid #ddd;">
      <p style="font-size: 12px; color: #888;">If you didn't create this account, you can safely ignore this email.</p>
    </div>
  `,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log("✅ Welcome email sent.");
      } catch (emailErr) {
        console.error("❌ Failed to send welcome email:", emailErr);
      }

      req.flash("success", "Welcome to AlphaMovies!");
      res.redirect("/");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  if (res.locals.currUser) {
    return res.redirect("/");
  }
  res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
  req.flash("success", "Welcome back to AlphaMovies!");
  res.redirect("/");
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out!");
    res.redirect("/");
  });
};
