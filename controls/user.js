import User, {
  validateLogin,
  validateRegister,
  validateUpdateUser,
} from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// get all users
const getUser = async (req, res) => {
  const { pageNumber } = req.query;
  const limit = 2

  try {
    const user = await User.find().select("-password")
      .skip((pageNumber - 1) * limit).limit(limit)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// get user by id
const getUserId = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password")
    res.status(200).json(user)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// create new user
const register = async (req, res) => {
  // validate user
  const { error } = validateRegister(req.body);
  if (error) return res.status(400).json({ message: error.message });

  try {
    const { email } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // hash password
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    // create new user
    user = new User(req.body);
    const result = await user.save();

    // token
    const token = jwt.sign({ id: user._id, username: user.username, isAdmin: user.isAdmin }, process.env.JWt_SECRET_KEY, { expiresIn: "30d" });

    const { password, ...other } = result._doc;
    res.status(201).json({ ...other, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// login user
const login = async (req, res) => {
  // validate user
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).json({ message: error.message });

  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: "email is incorrect or password " });

    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordMatch) return res.json({ message: "email is incorrect or password " });

    const token = jwt.sign({ id: user._id, username: user.username, isAdmin: user.isAdmin }, process.env.JWt_SECRET_KEY, { expiresIn: "30d" });
    const { password, ...other } = user._doc;
    res.status(200).json({ ...other, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// update user
const updateUser = async (req, res) => {
  if (req.user.id !== req.params.id) {
    return res.status(403).json({ message: "no authorized to update this user" });
  }

  // validate user
  const { error } = validateUpdateUser(req.body);
  if (error) return res.status(400).json({ message: error.message });

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("user deleted");
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  else {
    res.status(404).json({ message: "user not found" });
  }
}

export { getUser, register, login, updateUser, getUserId, deleteUser };
