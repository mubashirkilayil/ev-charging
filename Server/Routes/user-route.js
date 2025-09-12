const express = require('express');
const User = require('../db/Models/user-schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    return res
      .status(200)
      .json({ message: 'New user added successfully', success: true, newUser });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});
router.post('/sign-up', async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    console.log(req.body);

    const findEmail = await User.findOne({ email });
    if (findEmail) {
      return res.status(400).json({
        success: false,
        message: 'This email is already registerd, Go with login API',
      });
    }
    if (password != confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Password and confirmPassword are not same, take action!',
      });
    }
    // const hashedPassword = await bcrypt.hash(password, 2);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    return res
      .status(200)
      .json({ success: true, message: 'New user added', newUser });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginUser = await User.findOne({ email });
    if (!loginUser) {
      return res.status(400).json({
        success: false,
        message: 'This email is not registerd , go with signup API',
      });
    }
    const passwordCompare = await bcrypt.compare(password, loginUser.password);

    if (!passwordCompare) {
      console.log(password, loginUser.password, passwordCompare);

      return res.status(400).json({
        success: false,
        message: 'Check password!',
      });
    }
    const secret = 'guyds7wserfjke7qw38545ey';
    const token = jwt.sign(
      {
        id: loginUser._id,
        name: loginUser.name,
        role: loginUser.role,
      },
      secret,
      { expiresIn: '5h' }
    );

    return res.status(200).json({
      success: true,
      message: 'Login successfully',
      token,
      user: {
        name: loginUser.name,
      },
      id: loginUser._id,
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const emailCheck = await User.findOne({ email });
    if (!emailCheck) {
      return res.status(400).json({
        success: false,
        message: 'This email is not registerd yet!',
      });
    }
    const secret = 'guyds7wserfjke7qw38545ey';
    const token = jwt.sign(
      {
        userId: emailCheck._id,
      },
      secret,
      { expiresIn: '5h' }
    );
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'learnedfrom8@gmail.com',
        pass: 'xjmp kzdy geyr feqz',
      },
    });
    const mailOptions = {
      from: 'learnedfrom8@gmail.com',
      to: email,
      subject: 'PASSWORD RESET EMAIL',
      text: `Hai,
                please reset your password using this token : ${token}`,
    };
    transporter.sendMail(mailOptions, () => {
      return res
        .status(200)
        .json({ message: 'Password reset email has been send' });
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});
router.post('/reset-password', async (req, res) => {
  try {
    const { email, password, confirmPassword, token } = req.body;
    const resetPassword = await User.findOne({ email });
    if (!resetPassword) {
      return res.status(400).json({
        success: false,
        message: ' This email is not registerd yet, please do signup!',
      });
    }
    if (password != confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Password does not matching!',
      });
    }
    const secret = 'guyds7wserfjke7qw38545ey';
    const decoded = jwt.verify(token, secret);
    const hashedPassword = await bcrypt.hash(password, 2);

    const updatedPassword = await User.updateOne(
      { email },
      {
        password: hashedPassword,
        confirmPassword: password,
      }
    );
    console.log(updatedPassword);

    return res.status(200).json({
      success: true,
      message: 'Password updated successfully',
      updatedPassword,
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userById = await User.findById(id);
    if (!userById) {
      return res.status(404).json({
        success: false,
        message: `There is no user with this Id : ${id}`,
      });
    }
    return res.status(200).json({ success: true, userById });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const userUpdate = await User.findByIdAndUpdate(id, body, { new: true });
    if (!userUpdate) {
      return res.status(404).json({
        success: false,
        message: `There is no user with this Id : ${id}`,
      });
    }
    return res
      .status(200)
      .json({ success: true, message: 'user updated', userUpdate });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.findByIdAndDelete(id);
    if (!deleteUser) {
      return res.status(404).json({
        success: false,
        message: `There is no user with the Id : ${id}`,
      });
    }
    return res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      deleteUser,
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});
module.exports = router;
