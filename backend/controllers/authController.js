const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const sendEmail = require("../utils/email.js");
const AppError = require("../utils/appError.js");
const User = require("./../models/userModel.js");
const catchAsync = require("./../utils/catchAsync");

const signToken = id => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

const createSendToken = (
  user,
  statusCode,
  res
) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() +
        process.env.JWT_COOKIE_EXPIRES_IN *
          24 *
          60 *
          60 *
          1000
    ),
    httpOnly: true,
    secure: true,
    sameSite:
      process.env.NODE_ENV === "production"
        ? "strict"
        : "none",
    partitioned: true,
  };

  // if (process.env.NODE_ENV === "production")
  //   cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "Success",
    token,
    data: {
      user: user,
    },
  });
};

exports.signup = catchAsync(
  async (req, res, _next) => {
    const newUser = await User.create(req.body);

    createSendToken(newUser, 201, res);
  }
);

exports.login = catchAsync(
  async (req, res, next) => {
    const { email, password } = req.body;
    //Check Exists
    if (!email || !password) {
      return next(
        new Error(
          "Please Provide email and password",
          400
        )
      );
    }
    //Check If correct
    const user = await User.findOne({
      email,
    }).select("+password");

    if (
      !user ||
      !(await user.correctPassword(
        password,
        user.password
      ))
    ) {
      return next(
        new Error(
          "Incorrect email or password",
          401
        )
      );
    }

    //Send Token
    createSendToken(user, 200, res);
  }
);

exports.protect = catchAsync(
  async (req, res, next) => {
    //Get Token and Check
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith(
        "Bearer"
      )
    ) {
      token =
        req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(
        new Error(
          "You are not logged in! You must be logged in to get access.",
          401
        )
      );
    }

    //Verification
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );

    //Check If Still Exists
    const decodedUser = await User.findById(
      decoded.id
    );

    if (!decodedUser) {
      return next(
        new AppError(
          "The user belonging to this token no longer exists!",
          401
        )
      );
    }

    //Check if user changed password
    if (
      decodedUser.changedPassword(decoded.iat)
    ) {
      return next(
        new AppError(
          "User Recently Changed password. Please login again!",
          401
        )
      );
    }

    //Access now granted to route
    req.user = decodedUser;
    next();
  }
);

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    //roles ["admin",'moderator]
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          "You do not have permission to perform this action",
          403
        )
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(
  async (req, res, next) => {
    //Get user email
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user)
      return next(
        new AppError(
          "There is no user with that email!",
          404
        )
      );
    ///Generate reset token
    const resetToken =
      user.createPasswordResetToken();

    await user.save({
      validateBeforeSave: false,
    });
    //Send token to users email
    const resetURL = `${
      req.protocol === "http" &&
      process.env.NODE_ENV === "production"
        ? "https"
        : req.protocol
    }://${req.get(
      "host"
    )}/api/v1/users/resetPassword/${resetToken}`;

    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}. \n if you didn't forget your password, please ignore this email.`;

    try {
      await sendEmail({
        email: user.email,
        subject: `Your password reset token (please use it within 10 minutes)`,
        message: message,
      });

      res.status(200).json({
        status: "Success",
        message: "Token sent to email",
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({
        validateBeforeSave: false,
      });

      return next(
        new AppError(
          "Ther was an error sending the email, please try again later.",
          500
        )
      );
    }
  }
);
exports.resetPassword = catchAsync(
  async (req, res, next) => {
    //Get user based on token
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    //If token isnt expired, set the new password
    if (!user) {
      return next(
        new AppError(
          "Token is invalid or has expired",
          400
        )
      );
    }
    user.password = req.body.password;
    user.passwordConfirm =
      req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    //Update changedPasswordAt property for user

    //Log user in
    createSendToken(user, 200, res);
  }
);

exports.updatePassword = catchAsync(
  async (req, res, next) => {
    //Get user from collection
    const user = await User.findById(
      req.user.id
    ).select("+password");

    //Check if posted current password is correct
    if (
      !(await user.correctPassword(
        req.body.passwordCurrent,
        user.password
      ))
    )
      return next(
        new AppError(
          "Current password is wrong",
          400
        )
      );

    /// If so, update password
    user.password = req.body.password;
    user.passwordConfirm =
      req.body.passwordConfirm;

    await user.save();
    // Log user in
    createSendToken(user, 200, res);
  }
);

module.exports;
