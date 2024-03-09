// uploadController.js
const cloudinary = require("../config/cloudinaryConfig"); // Adjust the path accordingly
const multer = require("multer");

const storage = multer.memoryStorage();
const singleUpload = multer({ storage }).single("file");

const uploadController = async (req, res) => {
  try {
    singleUpload(req, res, (err) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Upload failed", error: err.message });
      }

      // If you reach this point, the file has been uploaded to memory
      // Now, you can upload it to Cloudinary
      const image = req.file.buffer.toString("base64");
      cloudinary.uploader.upload(
        `data:image/png;base64,${image}`,
        (error, result) => {
          if (error) {
            return res.status(500).json({
              message: "Cloudinary upload failed",
              error: error.message,
            });
          }

          // Handle the result or send a response to the client
          res.json({
            message: "File uploaded successfully!",
            cloudinaryDetails: result,
          });
        }
      );
    });
  } catch (error) {
    console.error("Error during file upload:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  uploadController,
};
