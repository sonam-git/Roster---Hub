const { gql } = require('apollo-server-express');

const typeDefs = gql`
scalar Upload
  type Profile {
    _id: ID
    name: String
    email: String
    jerseyNumber: Int
    position: String
    phoneNumber: String
    profilePic: String
    skills: [Skill]
    posts: [Post]
    socialMediaLinks: [SocialMediaLink]
    receivedMessages: [Message]
    sentMessages: [Message]
  }

  type Skill {
     _id: ID!
    skillText: String
    skillAuthor: String
    createdAt: String!
  }

  type Post {
    _id: ID!
    postText: String
    postAuthor: String!
    createdAt: String!
    comments: [Comment]
  }

  type Comment {
    _id: ID!
    commentText: String!
    commentAuthor: String!
    createdAt: String!
  }

  type Message {
    _id: ID!
    sender: Profile!
    recipient: Profile!
    text: String!
    createdAt: String!
  }

  type SocialMediaLink {
    _id: ID!
    userId: ID!
    type: String!
    link: String!
  }

 
  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    me: Profile
    skills : [Skill]
    skill(skillId: ID!) : Skill
    receivedMessages: [Message]!
    socialMediaLinks(userId: ID!): [SocialMediaLink]!
    posts: [Post]
    post(postId: ID!): Post
  }
 
  type Mutation {
    addProfile(name: String!, email: String!, password: String! ): Auth
    login(email: String!, password: String!): Auth
    addInfo(profileId: ID!, jerseyNumber: Int!, position: String!, phoneNumber: String!): Profile
    uploadProfilePic(profileId: ID!, profilePic: Upload!): Profile
    addSkill(profileId: ID!, skillText: String! ): Skill
    sendMessage(recipientId: ID!, text: String!): Message!
    removeSkill(skillId: ID!): Skill
    removeMessage(messageId: ID!): Message
    saveSocialMediaLink(userId: ID!, type: String!, link: String!): SocialMediaLink!
    updateName(name: String!): Profile
    updatePassword(currentPassword: String!, newPassword: String!): Profile
    deleteProfile(profileId: ID!):Profile
    addPost(postText: String!): Post
    updatePost(postId: ID!, postText: String!): Post
    removePost(postId: ID!): Post
    addComment(postId: ID!, commentText: String!): Post
    updateComment(postId: ID!, commentId: ID!, commentText: String!): Post
    removeComment(postId: ID!, commentId: ID!): Post
  }
`;

module.exports = typeDefs;