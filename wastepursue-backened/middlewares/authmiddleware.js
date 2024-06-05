const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const user = await User.findOne({ email });

    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    
    if (!user.isAdmin) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

   
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SEC_KEY,
      { expiresIn: 3600 }, 
      (err, token) => {
        if (err) throw err;
        
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = loginUser;
