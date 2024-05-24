require("dotenv").config();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const { AuthenticationError,UserInputError  } = require("apollo-server-express");
const { Profile, Skill, Message, SocialMediaLink,Post } = require("../models");
const { signToken } = require("../utils/auth");
const cloudinary = require("cloudinary").v2;
const secret = process.env.JWT_SECRET;
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
        })
        .populate('posts');
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
        }).populate('posts');
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
          })
          .populate('posts');
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
  // ************************** QUERY POSTS *******************************************//
    posts: async () => {
      try {
        const posts = await Post.find().sort({ createdAt: -1 }).populate('comments');
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    // finds a post by its posttId
    post: async (parent, { postId }) => {
      try {
        const post = await Post.findById(postId).populate('comments');;
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
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

    // ************************** ADD POST *******************************************//
    addPost: async (parent, { profileId, postText }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      if (postText.trim() === "") {
        throw new Error("Post body must not be empty");
      }

      try {
        // Create the post
        const post = await Post.create({
          postText,
          postAuthor: context.user.name,
          createdAt: new Date().toISOString(),
          userId: context.user._id,
        });

        // Update the profile to include the post
        await Profile.findOneAndUpdate(
          { _id: profileId },
          { $addToSet: { posts: post._id } }
        );
        return post;
      } catch (err) {
        console.error('Error creating post:', err);
        throw new Error('Error creating post');
      }
    },

    // ************************** UPDATE POST  *******************************************//
    updatePost: async (_, { postId, postText }, context) => {
      // Check if the user is authenticated
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      try {
        // Find the post by postId
        const post = await Post.findById(postId);

        if (!post) {
          throw new Error("Post not found.");
        }

        // Check if the current user is the author of the post
        if (post.userId !== context.user._id) {
          throw new AuthenticationError("You are not the author of this post.");
        }

        // Update the postText
        post.postText = postText;
        await post.save();

        return post;
      } catch (error) {
        throw new Error("Failed to update the post.");
      }
    },

    // ************************** DELETE POST *******************************************//
    removePost: async (parent, { postId }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
      try {
        return Post.findOneAndDelete({_id: postId})
      } catch (error) {
        console.error('Error deleting post:', error);
        throw new Error('Error deleting post.');
      }
    },

    // ************************** ADD COMMENT *******************************************//
    addComment: async (parent, { postId, commentText }, context) => {
     if (context.user) {
       try {
         const newComment = {
           commentText,
           commentAuthor: context.user.name,
           createdAt: new Date().toISOString(),
           userId: context.user._id,
         };

         const updatedPost = await Post.findOneAndUpdate(
           { _id: postId },
           { $push: { comments: newComment } },
           { new: true, runValidators: true }
         );

         return updatedPost;
       } catch (err) {
         console.error(err);
         throw new Error('Error adding comment');
       }
     }
     throw new AuthenticationError('Not logged in');
   },

// ************************** UPDATE COMMENT *******************************************//
    updateComment: async (parent, { postId, commentId, commentText }, context) => {
      if (context.user) {
        const post = await Post.findOneAndUpdate(
          { _id: postId, 'comments._id': commentId, 'comments.userId': context.user._id },
          {
            $set: {
              'comments.$.commentText': commentText,
            },
          },
          { new: true }
        );
        return post;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

 // ************************** REMOVE COMMENT *******************************************//
    removeComment: async (parent, { postId, commentId }, context) => {
      if (context.user) {
        return Post.findOneAndUpdate(
          { _id: postId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.name,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
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

        // ************************** FORGOT PASSWORD FUNCTIONALITY *******************************************//
        sendResetPasswordEmail: async (_, { email }) => {
          try {
          const user = await Profile.findOne({ email });
          if (!user) {
            return { message: "If an account with that email exists, a reset link has been sent." };
          }
    
          const resetToken = signToken({ email: user.email, name: user.name, _id: user._id });
    
          const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: process.env.EMAIL_USER, 
              pass: process.env.EMAIL_PASSWORD, 
            },
          });
    
          const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
                   Please click on the following link, or paste this into your browser to complete the process:\n\n
                   http://localhost:3000/reset-password/${resetToken}\n\n
                   If you did not request this, please ignore this email and your password will remain unchanged.\n`
          };
    
          await transporter.sendMail(mailOptions);
    
          return { message: "If an account with that email exists, a reset link has been sent." };
        } catch (error) {
          console.error(error);
          return { message: "An error occurred while sending the reset email." };
        }
        },
 // ************************** RESET PASSWORD FUNCTIONALITY *******************************************//
 resetPassword: async (_, { token, newPassword }) => {
  try {
    const decoded = jwt.verify(token, secret);
    const user = await Profile.findOne({ email: decoded.data.email });

    if (!user) {
      throw new UserInputError('Invalid token or user does not exist');
    }

    // Set the new password using the method defined in the Profile model
    user.password = newPassword;
    await user.save();

    return { message: "Password has been successfully reset." };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AuthenticationError("Password reset token has expired.");
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new AuthenticationError("Password reset token is invalid.");
    } else {
      throw new AuthenticationError("An error occurred during password reset.");
    }
  }
}

  },
};

module.exports = resolvers;

// resetPassword: async (_, { newPassword },context) => {
 
//   try {
//     const profile = await Profile.findById(context.user._id);
//         if (!profile) {
//           throw new Error("Profile not found!");
//         }

// console.log(profile)
//     // Update the password with the new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     profile.password = hashedPassword;
//     await  profile.save();

//     return { message: "Password has been successfully reset." };
//   } catch (error) {
//     console.error("Error resetting password:", error);
//     return { message: "Failed to reset password." };
//   }
// }