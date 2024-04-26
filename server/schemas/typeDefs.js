  const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Profile {
    _id: ID
    name: String
    email: String
    jerseyNumber: Int
    position: String
    phoneNumber: String
    skills: [Skill]
  }

  type Skill {
     _id: ID!
    skillText: String
    skillAuthor: String
    createdAt: String!
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    skills : [Skill]
    skill(skillId: ID!) : Skill
    me: Profile
  }
 
  type Mutation {
    addProfile(name: String!, email: String!, password: String! ): Auth
    login(email: String!, password: String!): Auth
    addInfo(profileId: ID!, jerseyNumber: Int!, position: String!, phoneNumber: String!): Profile
    addSkill(profileId: ID!, skillText: String! ): Skill
    removeSkill(skillId: ID!): Skill
  }
`;

module.exports = typeDefs;
