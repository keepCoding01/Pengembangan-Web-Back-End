import jwt from "jsonwebtoken";
import Account from "../models/account.js";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;

const login = (req, res) => {
  const msg = req.session.err || "";
  req.session.err = "";
  res.render("login", { account: req.session.account || "", message: msg });
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};

const auth = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Account.findOne({ where: { email } });
    if (!user || user.password !== password) {
      req.session.err = "Incorrect email or password";
      return res.redirect("/login");
    }

    const tokenPayload = { id: user.id, email: user.email };
    let token;
    if (user.token) {
      token = user.token;
    } else {
      token = jwt.sign(tokenPayload, secretKey, { expiresIn: "1h" });
      user.token = token;
      await user.save();
    }

    req.session.account = { id: user.id, email: user.email, username: user.username };
    res.redirect("/");
  } catch (error) {
    req.session.err = "Authentication failed";
    res.redirect("/login");
  }
};

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await Account.findOne({ where: { email } });
    if (existingUser) {
      return res.render("register", { message: "Email already registered" });
    }

    const user = await Account.create({ username, email, password });
    const tokenPayload = { id: user.id, email: user.email };
    const token = jwt.sign(tokenPayload, secretKey, { expiresIn: "1h" });
    user.token = token;
    await user.save();

    res.redirect("/login");
  } catch (error) {
    res.status(500).render("register", { message: "Registration failed" });
  }
};

export default { login, logout, auth, register };
