const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
module.exports.register = async (req, res) => {
   
    //console.log({name,userName,password})
    const errors = validationResult(req);
    
    if (errors.isEmpty()) {
      const { name, userName, password } = req.body;
      const usernameExp = /^[a-zA-Z0-9_.-]+$/;

       console.log(usernameExp);
      const usernameTest = usernameExp.test(userName);
      
      
      if (!usernameTest) {
      
          return res.status(400).json({
              msg: `${userName} is invalid username letters, numbers, underscores and dashes are allowed only`,

            param: "userName",
          });
        }


        
      try {

       
        
        // check email exist or not
        const findUserName = await UserModel.findOne({ userName });
        if (!findUserName) {

          // hash password
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          await UserModel.create({
            name,
            userName,
            password: hashedPassword,
          });
          return res.status(201).json({ msg: "Your account has been created" });
        } else {
          // email is already exist in the database
          return res.status(400).json({ error: "User Name already exist" });
        }
      } catch (error) {
        return res.status(500).json({ error: "server internal error" });
      }
    } else {
      // validation failed
      return res.status(400).json({ errors: errors.array() });
    }
  };

  //login in validations
  module.exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      try {
        const { userName, password } = req.body;
        // find user in the database
        const user = await UserModel.findOne({ userName });
        if (user) {
          //  match password
          const matched = await bcrypt.compare(password, user.password);
          if (matched) {
            console.log("yes matchend")
            // create token
            const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
              expiresIn: "1d",
            });
            return res
              .status(200)
              .json({ token, msg: "Logged in successfully", userId: user._id });
          } else {
            // Invalid password
            return res.status(400).json({ error: "Invalid password" });
          }
        } else {
          // User/Email not found
          return res.status(404).json({ error: "User not found" });
        }
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    } else {
      // Validations failed
      return res.status(400).json({ errors: errors.array() });
    }
  };
