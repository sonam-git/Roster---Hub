const { AuthenticationError } = require("apollo-server-express");
const { Profile, Skill, Message, SocialMediaLink } = require("../models");
const { signToken } = require("../utils/auth");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
cloudinary.config({
  cloud_name: "dey5y9jip",
  api_key: "279571669115484",
  api_secret: "ms63UupjyfnTLl07NGMlh3H-LpU",
});

const resolvers = {
  // ############ QUERIES ########## //
  Query: {
    // ************************** QUERY ALL PROFILES *******************************************//
    profiles: async () => {
      return Profile.find()
        .populate({
          path: "receivedMessages",
          populate: { path: "sender" },
        })
        .populate("skills")
        .populate({
          path: "socialMediaLinks",
          populate: { path: "link" },
        })
        .populate({
          path: "sentMessages",
          populate: [{ path: "sender" }, { path: "recipient" }],
        });
    },
    // ************************** QUERY SINGLE PROFILE *******************************************//
    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId })
        .populate({
          path: "receivedMessages",
          populate: { path: "sender" },
        })
        .populate("skills")
        .populate({
          path: "socialMediaLinks",
          populate: { path: "link" },
        });
    },
    // ************************** QUERY ME (LOGIN USER) *******************************************//
    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findById(context.user._id)
          .populate({
            path: "receivedMessages",
            populate: { path: "sender" },
          })
          .populate({
            path: "sentMessages",
            populate: { path: "recipient" },
          })
          .populate("skills")
          .populate({
            path: "socialMediaLinks",
            populate: { path: "link" },
          });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // ************************** QUERY RECIEVED MESSAGES *******************************************//
    receivedMessages: async (_, __, { user }) => {
      // Check if the user is authenticated
      if (!user) {
        throw new AuthenticationError(
          "You need to be logged in to view messages"
        );
      }

      try {
        // Retrieve messages received by the authenticated user
        const messages = await Message.find({ recipient: user._id });
        return messages;
      } catch (error) {
        console.error("Error fetching messages:", error);
        throw new Error("Failed to fetch messages");
      }
    },
    // ************************** QUERY SOCIAL MEDIA LINKS *******************************************//
    socialMediaLinks: async (_, { userId }, context) => {
      try {
        // Fetch social media links from the SocialMediaLink model based on the user's ID
        const socialMediaLinks = await SocialMediaLink.find({ userId });
        return socialMediaLinks;
      } catch (error) {
        throw new Error("Failed to fetch social media links: " + error.message);
      }
    },
  },
  // ########## MUTAIIONS ########### //
  Mutation: {
    // **************************  SIGN UP / ADD USER *******************************************//
    addProfile: async (parent, { name, email, password }) => {
      const profile = await Profile.create({ name, email, password });
      const token = signToken(profile);

      return { token, profile };
    },
    // ************************** LOGIN  *******************************************//
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw new AuthenticationError("No profile with this email found!");
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(profile);
      return { token, profile };
    },
    // ************************** ADD INFO *******************************************//
    addInfo: async (
      parent,
      { profileId, jerseyNumber, position, phoneNumber },
      context
    ) => {
      // Check if the user is logged in
      if (!context.user) {
        throw new AuthenticationError(
          "You need to be logged in to update profile information"
        );
      }
      try {
        // Check if the profile exists
        const profile = await Profile.findById(profileId);
        if (!profile) {
          throw new Error("Profile not found!");
        }

        // Update the profile with the additional information
        profile.jerseyNumber = jerseyNumber;
        profile.position = position;
        profile.phoneNumber = phoneNumber;

        // Save the updated profile
        await profile.save();

        return profile;
      } catch (error) {
        console.error("Error updating profile information:", error);
        throw new Error("Failed to update profile information");
      }
    },
    // ************************** UPLOAD PROFILE PIC USING CLOUDINARY  *******************************************//
    uploadProfilePic: async (_, { profileId, profilePic }, context) => {
      if (!context.user) {
        throw new AuthenticationError(
          "You need to be logged in to update profile picture"
        );
      }

      try {
        let imageUrl = null;
        // Upload the image to Cloudinary only if an image was provided
        if (profilePic) {
          const { secure_url: uploadedImageUrl } =
            await cloudinary.uploader.upload(profilePic, {
              allowed_formats: [
                "png",
                "jpg",
                "jpeg",
                "svg",
                "ico",
                "jifif",
                "webp",
              ],
            });
          imageUrl = uploadedImageUrl;
        }

        // Find the profile by ID
        const profile = await Profile.findById(profileId);
        if (!profile) {
          throw new Error("Profile not found!");
        }

        // Update the profile's profilePic property with the Cloudinary URL
        profile.profilePic = imageUrl;

        // Save the updated profile
        await profile.save();

        return profile;
      } catch (error) {
        console.error("Error uploading profile picture:", error);
        throw new Error("Failed to upload profile picture");
      }
    },
    // ************************** ADD SKILL  *******************************************//
    addSkill: async (parent, { profileId, skillText }, context) => {
      if (context.user) {
        if (skillText.trim() === "") {
          throw new Error("skilltext must not be empty");
        }
        const skill = await Skill.create({
          skillText,
          skillAuthor: context.user.name,
          createdAt: new Date().toISOString(),
        });

        await Profile.findOneAndUpdate(
          { _id: profileId },
          { $addToSet: { skills: skill._id } }
        );

        return skill;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // ************************** REMOVE SKILL *******************************************//
    removeSkill: async (parent, { skillId }, context) => {
      // console.log('line143',context.user)
      if (!context.user._id) {
        throw new AuthenticationError("You need to be logged in!");
      }
      try {
        return Skill.findOneAndDelete({ _id: skillId });
      } catch (error) {
        console.error("Error deleting skill:", error);
        throw new Error("Error deleting Skill.");
      }
    },
    // ************************** SEND MESSAGE *******************************************//
    sendMessage: async (_, { recipientId, text }, { user }) => {
      // Check if the user is authenticated
      if (!user) {
        throw new AuthenticationError(
          "You need to be logged in to send messages"
        );
      }

      try {
        // Find the recipient user
        const recipient = await Profile.findById(recipientId);
        // console.log('recipient',recipient.name)
        if (!recipient) {
          throw new Error("Recipient user not found");
        }

        // Create a new message with the sender set to the authenticated user's ID
        const message = new Message({
          sender: user._id, // Set the sender to the authenticated user's ID
          recipient: recipientId, // Set the recipient to the provided user ID
          text,
          createdAt: new Date().toISOString(), // Format the current date and time
        });

        // Save the message to the database
        const savedMessage = await message.save();
        // Update sender's sentMessages and recipient's receivedMessages
        await Profile.findByIdAndUpdate(user._id, {
          $push: { sentMessages: savedMessage._id },
        });
        await Profile.findByIdAndUpdate(recipientId, {
          $push: { receivedMessages: savedMessage._id },
        });

        return savedMessage;
      } catch (error) {
        console.error("Error sending message:", error);
        throw new Error("Failed to send message");
      }
    },
    // ************************** REMOVE MESSAGE *******************************************//
    removeMessage: async (parent, { messageId }, context) => {
      if (!context.user._id) {
        throw new AuthenticationError("You need to be logged in!");
      }

      try {
        const deletedMessage = await Message.findOneAndDelete({
          _id: messageId,
        });

        if (!deletedMessage) {
          throw new Error("Message not found");
        }

        return deletedMessage; // Return the deleted message object
      } catch (error) {
        console.error("Error deleting Message:", error);
        throw new Error("Error deleting Message.");
      }
    },
    // ************************** SAVE SOCIAL MEDIA LINK  *******************************************//
    saveSocialMediaLink: async (_, { userId, type, link }) => {
      try {
        // Save or update the social media link in the SocialMediaLink model
        let socialMediaLink = await SocialMediaLink.findOneAndUpdate(
          { userId, type },
          { link },
          { upsert: true, new: true }
        );

        // Find the Profile by its ID and update the socialMediaLinks array
        const updatedProfile = await Profile.findOneAndUpdate(
          { _id: userId },
          { $addToSet: { socialMediaLinks: socialMediaLink._id } },
          { new: true }
        ).populate("socialMediaLinks");

        if (!updatedProfile) {
          throw new Error("Profile not found!");
        }

        return socialMediaLink;
      } catch (error) {
        throw new Error("Failed to save social media link: " + error.message);
      }
    },
    // ************************** UPDATE USER NAME *******************************************//
    updateName: async (_, { name }, context) => {
      if (!context.user) {
        throw new AuthenticationError(
          "You need to be logged in to update name!"
        );
      }

      try {
        const profile = await Profile.findById(context.user._id);

        if (!profile) {
          throw new Error("Profile not found!");
        }

        profile.name = name;
        await profile.save();
        return profile;
      } catch (error) {
        console.error("Error updating name:", error);
        throw new Error("Failed to update name.");
      }
    },

    // ************************** UPDATE PASSWORD *******************************************//
    updatePassword: async (_, { currentPassword, newPassword }, context) => {
      // Check if the user is authenticated
      if (!context.user) {
        throw new AuthenticationError(
          "You need to be logged in to update the password!"
        );
      }
      try {
        // Find the user's profile
        const profile = await Profile.findById(context.user._id);
        if (!profile) {
          throw new Error("Profile not found!");
        }

        // Check if the current password matches
        const isMatch = await profile.isCorrectPassword(currentPassword);
        if (!isMatch) {
          throw new Error("Incorrect current password!");
        }

        profile.password = newPassword;
        await profile.save();
        return profile;
      } catch (error) {
        console.error("Error updating password:", error);
        throw new Error("Failed to update password.");
      }
    },
    // ************************** DELETE PROFILE *******************************************//
    deleteProfile: async (_, { profileId }, context) => {
      if (!context.user) {
        throw new AuthenticationError(
          "You need to be logged in first to remove profile "
        );
      }
      try {
        // Find the profile by ID and delete it
        const profile = await Profile.findByIdAndDelete(profileId);
        if (!profile) {
          throw new Error("Profile not found");
        }
        // Delete all skills associated with the deleted profile
        await Skill.deleteMany({ _id: { $in: profile.skills } });

        // Delete all social media links associated with the deleted profile
        await SocialMediaLink.deleteMany({ userId: profileId });
        // Delete messages where the deleted profile is either sender or recipient
        await Message.deleteMany({
          $or: [{ sender: profileId }, { recipient: profileId }],
        });
        return profile;
      } catch (error) {
        console.error("Error removing profile:", error);
        throw new Error("Failed to remove profile");
      }
    },
  },
};

module.exports = resolvers;
