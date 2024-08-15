const UsersModel = require("../models/users.model");
const GiftsModel = require("../models/gifts.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
class UsersController {
  async register(req, res) {
    try {
      const data = await req.body;
      const saltRounds = 10;
      bcrypt.genSalt(saltRounds, async function (err, salt) {
        bcrypt.hash(req.body.password, salt, async function (err, hash) {
          data.password = hash;
          const existsUser = await UsersModel.find({ tel: data.tel });
          if (existsUser.length > 0) {
            return res.status(400).json({
              success: false,
              message: "Tài khoản đã tồn tại. Vui lòng thay đổi số điện thoại",
            });
          } else {
            const user = await UsersModel.create(data);
            // const populateUser = await UsersModel.findById(user._id);
            res.status(200).json({ success: true, data: user });
          }
        });
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async login(req, res) {
    try {
      const { tel, password } = req.body;
      const data = await UsersModel.findOne({ tel: tel });
      if (!data) {
        return res
          .status(400)
          .json({ success: false, message: "Tài khoản không tồn tại" });
      } else {
        const checkPassword = await bcrypt.compare(password, data.password);
        if (checkPassword) {
          const accessToken = jwt.sign(
            { id: data._id },
            process.env.ACCESS_TOKEN,
            {
              expiresIn: "30s",
            }
          );
          const refreshToken = jwt.sign(
            { id: data._id },
            process.env.REFRESH_TOKEN,
            {
              expiresIn: "10d",
            }
          );
          const updatedData = await UsersModel.findByIdAndUpdate(
            data._id,
            { refreshToken: refreshToken },
            { new: true }
          ).populate("gifts");
          res.status(200).json({
            success: true,
            data: {
              fullName: updatedData._doc.fullName,
              points: updatedData._doc.points,
              accessToken,
              refreshToken,
            },
          });
        } else {
          res
            .status(500)
            .json({ success: false, message: "Mật khẩu không chính xác" });
        }
      }
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async logout(req, res) {
    try {
      const data = await UsersModel.findByIdAndUpdate(
        req.user._id,
        { refreshToken: null },
        { new: true }
      );
      res.status(200).json({ success: true, data: data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async refreshToken(req, res) {
    try {
      const oldRefreshToken = req.params.token;
      console.log(oldRefreshToken);
      // Check existence of token
      if (oldRefreshToken) {
        // Check if token is valid
        jwt.verify(
          oldRefreshToken,
          process.env.REFRESH_TOKEN,
          async (err) => {
            if (err) {
              res
                .status(403)
                .json({ success: false, message: "Token not valid" });
              return;
            }
          }
        );
        // Check if token has expired
        const decoded = jwt.decode(
          oldRefreshToken,
          process.env.REFRESH_TOKEN
        );
        if (decoded.exp < Date.now() / 1000) {
          res.status(403).json({ success: false, message: "Token expired" });
          return;
        }
        // Check if user exists
        const user = await UsersModel.findOne({
          refreshToken: oldRefreshToken,
        });
        // Generate new tokens
        const newAccessToken = jwt.sign(
          { id: user._id },
          process.env.ACCESS_TOKEN,
          { expiresIn: "30s" }
        );
        const newRefreshToken = jwt.sign(
          { id: user._id },
          process.env.REFRESH_TOKEN,
          {
            expiresIn: "10d",
          }
        );
        // Update user
        await UsersModel.findOneAndUpdate(
          { _id: user._id },
          { refreshToken: newRefreshToken }
        );
        // Return new tokens
        const populateUser = await UsersModel.findById(user._id);
        res.status(200).json({
          success: true,
          data: { ...populateUser._doc, accessToken: newAccessToken },
          data: {
            fullName: populateUser._doc.fullName,
            points: populateUser._doc.points,
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          },
        });
      }
    } catch (err) {
      res.status(500).json({ success: false, message1: err.message });
    }
  }

  async buyGifts(req, res) {
    try {
      const data = await UsersModel.findByIdAndUpdate(
        req.user._id,
        { $push: { gifts: req.body.id }, $inc: { points: -req.body.price } },
        { new: true }
      );
      res.status(200).json({ success: true, data: data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
}

module.exports = new UsersController();
