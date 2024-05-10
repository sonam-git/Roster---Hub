const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const profileSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  jerseyNumber: {
    type: Number,
    required: false,
  },
  position: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  profilePic: {
    type: String,
    required: false,
  },
  skills: [
    {
      type: Schema.Types.ObjectId,
      ref: "Skill",
    },
  ],
  socialMediaLinks: [ 
    {
      type: Schema.Types.ObjectId,
      ref: "SocialMediaLink",
    },
  ],

  sentMessages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
  receivedMessages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});

// set up pre-save middleware to create password
profileSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
profileSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// update password methods
profileSchema.methods.updatePassword = async function (oldPassword, newPassword) {
 // Check if the old password matches
 const isMatch = await bcrypt.compare(oldPassword, this.password);
 if (!isMatch) {
   throw new Error("Incorrect old password!");
 }

 // Hash the new password
 const saltRounds = 10;
 const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

 // Update the password field
 this.password = hashedPassword;

 // Save the updated profile
 await this.save();
};

const Profile = model("Profile", profileSchema);

module.exports = Profile;
