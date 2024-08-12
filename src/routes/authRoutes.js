const { Router } = require("express");
const authUser = require("../middlewares/authMiddleWare");
const fetch = require("node-fetch");
const bcrypt = require("bcrypt");
const { createUser } = require("../service/userService");
const { models } = require("../models");
const dotenv = require("dotenv");
const authRoutes = Router();
const axios = require("axios");
const { createJwtToken } = require("../service/jwtService");
const { Op } = require("sequelize");

const crypto = require("crypto");
// const bcrypt = require("bcrypt");
const { sendEmail } = require("../service/emailServics");
// const { emit } = require("npm");

dotenv.config();

// authRoutes.post("/logincheck", authUser("admin"), (req, res) => {
//   console.log("ends here");
//   res.status(200).send();
// });

// Google oAuth.2.0
// Initiates the Google Login flow
authRoutes.get("/google/login", (req, res) => {
  console.log("bbhbj", process.env.GOOGLE_CLIENT_ID);
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=profile email`;
  res.redirect(url);
});

// Callback URL for handling the Google Login response
authRoutes.get("/google/callback", async (req, res) => {
  const { code } = req.query;

  try {
    // Exchange authorization code for access token
    const { data } = await axios.post(process.env.GOOGLE_OAUTH_URL, {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      code,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
    });

    const { access_token, id_token } = data;

    // Use access_token or id_token to fetch user profile
    const { data: profile } = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    console.log(profile);

    if (!profile.verified_email) {
      return res.status(400).json({ message: "Email not verified" });
    }

    const existingUser = await models.User.findOne({
      where: { provider_id: profile.email },
    });

    if (existingUser) {
      console.log("existing user");
      return res.json({
        success: true,
        message: "Login successful",
        user: {
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.provider_id,
          profilePicture: existingUser.profile_picture_url,
        },
        token: createJwtToken(existingUser), // Implement token generation logic
      });
    } else {
      console.log("new user");

      let newUser = await models.User.create({
        name: profile.given_name || profile.email,
        provider_id: profile.email,
        profile_picture_url: profile.picture,
        registration_type: "google",
        // password_hash: hashedPassword, // In a real application, ensure the password is hashed
      });
      // await createUser({});
      // console.log("222, ttt", ttt2);

      // Code to handle user authentication and retrieval using the profile data
      return res.json({
        success: true,
        message: "Signup successful",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.provider_id,
          profilePicture: newUser.profile_picture_url,
        },
        token: createJwtToken(newUser), // Implement token generation logic
      });
    }

    res.redirect("/kjnkjn");
  } catch (error) {
    console.error("Error:", error);
    res.redirect("/login");
  }
});

//Email and pass authentication

authRoutes.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("1111");
    const User = models.User;
    let ttt = await User.create({
      name: username,
      email: email,
      password_hash: hashedPassword, // In a real application, ensure the password is hashed
      registration_type: "email",
    });
    // await createUser({});
    console.log("222, ttt", ttt);
    await res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Registration failed" });
  }
});

// / User login
authRoutes.post("/login", async (req, res) => {
  try {
    console.log("req.body");
    const { email, password } = req.body;
    console.log(req.body);
    const user = await models.User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    console.log(user);
    console.log("llll", user.password_hash);
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const token = createJwtToken();

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Login failed" });
  }
});

authRoutes.post("/request-reset-password", async (req, res) => {
  try {
    console.log("req.body");
    const { email, password } = req.body;
    console.log(req.body);
    const user = await models.User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "User not exists" });
    }
    console.log(user);
    console.log("llll", user.password_hash);

    const existing_reset_tkns = await models.TokenManagement.update(
      { status: "invalid" },
      {
        where: {
          user_id: user.id,
          token_type: "refresh",
          status: "active",
        },
      }
    );

    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, 10);

    const newToken = await models.TokenManagement.create({
      user_id: user.id,
      token: hash,
      token_type: "refresh", // Or 'access', 'blacklist'
      status: "active", // Or 'revoked', 'expired'
      expires_at: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
    });
    const link =
      "http://localhost:3000/api/v1/auth/reset-password" +
      `?token=${resetToken}&id=${user.id}`;

    let resf = await sendEmail(
      email,
      "Password Reset Request",
      "Please click the below password to reset the account \n" + link,
      ""
    );

    console.log(res);

    res.status(200).send(resetToken);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Login failed" });
  }
});

authRoutes.get("/reset-password", async (req, res) => {
  const { token, id } = req.query;
  // res.status(200).json({ token, id });
  console.log("ppppppppl", token);

  // Fetch the most recent active reset token for the user
  const stored_reset_tkn = await models.TokenManagement.findOne({
    where: {
      user_id: id,
      token_type: "refresh",
      status: "active",
      // expires_at: {
      //   [Op.gt]: new Date(), // Ensure token has not expired
      // },
    },
    order: [["created_at", "DESC"]], // Get the most recent one
  });

  if (!stored_reset_tkn) {
    return res.status(401).json({ error: "Token not found or expired" });
  }
  //
  stored_reset_tkn.status = "used";
  await stored_reset_tkn.save();

  const tkn_match = await bcrypt.compare(token, stored_reset_tkn.token);
  if (!tkn_match) {
    return res.status(401).json({ error: "Authentication failed" });
  }
  const new_token = createJwtToken({ user: { id } });

  res.status(200).json({ new_token });
});

module.exports = { authRoutes };
