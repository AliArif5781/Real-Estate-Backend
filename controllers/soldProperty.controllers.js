import { postModel } from "../models/post.model.js";

export const sold = async (req, res) => {
  try {
    // 1. Find the property
    const property = await postModel.findById(req.params.id);
    console.log(property, "property");
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // 2. Verify ownership (if needed)
    // if (property.user.toString() !== req.user._id.toString()) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "Unauthorized: Only owner can mark as sold"
    //   });
    // }

    // 3. Update property status
    property.status = "sold";
    property.soldAt = new Date();
    await property.save();

    // 4. Send success response
    res.status(200).json({
      success: true,
      message: "Property marked as sold successfully",
      property,
    });
  } catch (error) {
    console.error("Error marking as sold:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getSoldProperties = async (req, res) => {
  try {
    const soldProperties = await postModel
      .find({ status: "sold" })
      .sort({ soldAt: -1 }) // Newest first
      .populate("user", "name email") // Include seller info
      .lean();
    console.log(soldProperties, "soldPRoperties");
    res.status(200).json({
      success: true,
      count: soldProperties.length,
      properties: soldProperties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching sold properties",
      error: error.message,
    });
  }
};

export const responseSoldProperties = async (req, res) => {
  try {
    const { id } = req.params;
    const { response } = req.body; // Destructure `response` from body

    console.log(response, "responseSoldProperties"); // Should log 'accept' or 'decline'

    const updatedProperty = await postModel.findByIdAndUpdate(
      id,
      {
        responseProperty: response === "accept" ? "accepted" : "declined", // Update the field
        isSold: response === "accept",
      },

      { new: true }
    );

    console.log(updatedProperty.responseProperty, "updatedProperty"); // Should now show the updated value
    res
      .status(200)
      .json({ success: true, responsePropertyData: updatedProperty });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating property response",
      error: error.message,
    });
  }
};
