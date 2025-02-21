import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import {generateToken} from '../config/utils.js'
import cloudinary from '../config/cloudinary.js'

export const signupController = async (req, res) => {
      const {fullName, email, password, profilePic} = req.body;
      try {
            if(password.length < 8){
                  return res.status(400).json({message: 'Password must be at least 8 characters long'});
            }
            const user = await User.findOne({email});

            if(user) return res.status(400).json({message: 'Email already exists'});
            
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new User({
                  fullName,
                  email,
                  password: hashedPassword,
                  profilePic: profilePic || ''
            })

            if(newUser) {
                  generateToken(newUser._id, res)
                  await newUser.save();
                  res.status(201).json({
                        _id: newUser._id,
                        fullName: newUser.fullName,
                        email: newUser.email,
                        profilePic: newUser.profilePic
                  });
            }else {
                  res.status(400).json({message: 'Failed to create user'});
            }

      } catch (error) {
            console.log("Error in signupController: ", error.message);
            res.status(500).json({message: 'Server Error'});
      }
}

export const loginController = async (req, res) => {
      const { email, password } = req.body;
      try {
            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ message: 'User not found' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

            generateToken(user._id, res);
            res.json({
                  _id: user._id,
                  fullName: user.fullName,
                  email: user.email,
                  profilePic: user.profilePic
            });
      } catch (error) {
            console.log("Error in loginController: ", error.message);
            res.status(500).json({ message: 'Server Error' });
      }
}

export const logoutController = async (req, res) => {
      try {
            res.cookie("jwt", "", {maxAge: 0});
            res.status(200).json({message: 'Logged out'});
      } catch (error) {
            console.log("Error in logoutController: ", error.message);
            res.status(500).json({message: 'Server Error'});
      }
}

export const updateProfileController = async (req, res) => {
      try {
            const {profilePic} = req.body;
            const userId = req.user._id;

            if(!profilePic){
                  return res.status(400).json({message: 'Profile picture is required'});
            }

            const uploadResponse = await cloudinary.uploader.upload(profilePic)

            const updatedUser = await User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url}, {new: true});

            res.status(200).json(updatedUser)
      } catch (error) {
            console.log("Error in updateProfileController: ", error.message);
            res.status(500).json({message: 'Server Error'});
      }
}

export const checkAuthController = async (req, res) => {
      try {
            res.status(200).json(req.user);
      } catch (error) {
            console.log("Error in checkAuthController: ", error.message);
            res.status(500).json({message: 'Server Error'});
      }
}