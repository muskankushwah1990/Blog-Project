const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema(
  {
    image: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    },
    description: {
        type: String,
        require: true
    },
   
  },
  { timestamps: true }
);

const AboutModel = mongoose.model("About", AboutSchema);
module.exports = AboutModel;
