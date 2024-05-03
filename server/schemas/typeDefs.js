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
    receivedMessages: [Message]
    sentMessages: [Message]
  }

  type Skill {
     _id: ID!
    skillText: String
    skillAuthor: String
    createdAt: String!
  }

  type Message {
    _id: ID!
    sender: Profile!
    recipient: Profile!
    text: String!
    createdAt: String!
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
  }
 
  type Mutation {
    addProfile(name: String!, email: String!, password: String! ): Auth
    login(email: String!, password: String!): Auth
    addInfo(profileId: ID!, jerseyNumber: Int!, position: String!, phoneNumber: String!): Profile
    uploadProfilePic(profileId: ID!, file: Upload!): Profile
    addSkill(profileId: ID!, skillText: String! ): Skill
    sendMessage(recipientId: ID!, text: String!): Message!
    removeSkill(skillId: ID!): Skill
    removeMessage(messageId: ID!): Message
  }
`;

module.exports = typeDefs;