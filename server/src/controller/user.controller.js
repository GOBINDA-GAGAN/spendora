import User from "../models/user.model.js";

export const updateProfile = async (req, res) => {
  try {
    const { name, username, mobileNumber, city, country, address, state } =
      req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
        username,
        mobileNumber,
        city,
        country,
        address,
        state,
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};
