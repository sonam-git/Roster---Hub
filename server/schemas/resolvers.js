const { AuthenticationError } = require("apollo-server-express");
const { Profile, Skill ,Message} = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find().populate("skills").populate('receivedMessages')
    },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId })
      .populate("skills").populate('receivedMessages')
    },
    //By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findById({ _id: context.user._id })
        .populate("skills").populate('receivedMessages')
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    receivedMessages: async (_, __, { user }) => {
      // Check if the user is authenticated
      if (!user) {
        throw new AuthenticationError('You need to be logged in to view messages');
      }

      try {
        // Retrieve messages received by the authenticated user
        const messages = await Message.find({ recipient: user._id }).populate('sender');
        return messages;
      } catch (error) {
        console.error('Error fetching messages:', error);
        throw new Error('Failed to fetch messages');
      }
    },
},

  Mutation: {
    addProfile: async (parent, { name, email, password }) => {
      const profile = await Profile.create({ name, email, password });
      const token = signToken(profile);

      return { token, profile };
    },
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

    addInfo: async (
      parent,
      { profileId, jerseyNumber, position, phoneNumber },
      context
    ) => {
      // Check if the user is logged in
      if (context.user) {
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
      } else {
        throw new AuthenticationError("You need to be logged in!");
      }
    },

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
    sendMessage: async (_, { recipientId, text }, { user }) => {
      // Check if the user is authenticated
      if (!user) {
        throw new AuthenticationError('You need to be logged in to send messages');
      }

      try {
        // Find the recipient user
        const recipient = await Profile.findById(recipientId);
        // console.log('recipient',recipient.name)
        if (!recipient) {
          throw new Error('Recipient user not found');
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
await Profile.findByIdAndUpdate(user._id, { $push: { sentMessages: savedMessage._id } });
await Profile.findByIdAndUpdate(recipientId, { $push: { receivedMessages: savedMessage._id } });

        return savedMessage;
      } catch (error) {
        console.error('Error sending message:', error);
        throw new Error('Failed to send message');
      }
    },
    
    removeMessage: async (parent, { messageId }, context) => {
      if (!context.user._id) {
        throw new AuthenticationError("You need to be logged in!");
      }
    
      try {
        const deletedMessage = await Message.findOneAndDelete({ _id: messageId });
    
        if (!deletedMessage) {
          throw new Error("Message not found");
        }
    
        return deletedMessage; // Return the deleted message object
      } catch (error) {
        console.error("Error deleting Message:", error);
        throw new Error("Error deleting Message.");
      }
    },
    
    
  }
};

module.exports = resolvers;
