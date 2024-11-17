const express = require("express");
require("dotenv").config();

const bodyParser = require("body-parser");
const crypto = require("crypto");
const app = express();

const port = process.env.PORT || 3000;
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbName = process.env.DB_NAME;

app.use(bodyParser.json());

const users = [
  {
    username: "admin",
    password: "password123",
    redirectUrl: "https://iosmirror.cc/home",
  },
  {
    username: "Rana",
    password: "rana123",
    redirectUrl: "https://iosmirror.cc/home",
  },
  {
    username: "Joshiji",
    password: "joshi123",
    redirectUrl: "https://iosmirror.cc/home",
  },
  {
    username: "swaraj",
    password: "user123",
    redirectUrl: "https://iosmirror.cc/home",
  },
];

// Temporary storage for tokens
const redirectTokens = {};

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    // Generate a one-time token
    const token = crypto.randomBytes(16).toString("hex");
    redirectTokens[token] = user.redirectUrl;

    // Return success and the token
    res.json({
      success: true,
      redirectToken: token,
      message: "user found ",
    });
  } else {
    
    res.json({ success: false ,
        message: "No user found "
    });
  }
});

app.get("/redirect/:token", (req, res) => {
  const { token } = req.params;

  const url = redirectTokens[token];
  if (url) {
    // Invalidate the token after use
    delete redirectTokens[token];
    res.redirect(url);
  } else {
    res.status(400).send("Invalid or expired token.");
  }
});

app.get("/secured", (req, res) => {
  res.send(
    "<h1>Welcome to the Secured Area</h1><p>You were redirected successfully.</p>"
  );
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
