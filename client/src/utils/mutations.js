import { gql } from "@apollo/client";

export const ADD_PROFILE = gql`
  mutation addProfile($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      token
      profile {
        _id
        name
        skills {
          skillText
          skillAuthor
          _id
          createdAt
        }
      }
    }
  }
`;

export const ADD_INFO = gql`
  mutation addInfo(
    $profileId: ID!
    $jerseyNumber: Int!
    $position: String!
    $phoneNumber: String!
  ) {
    addInfo(
      profileId: $profileId
      jerseyNumber: $jerseyNumber
      position: $position
      phoneNumber: $phoneNumber
    ) {
      _id
      name
      jerseyNumber
      position
      phoneNumber
    }
  }
`;

export const UPLOAD_PROFILE_PIC = gql`
  mutation UploadProfilePic($profileId: ID!, $file: Upload!) {
    uploadProfilePic(profileId: $profileId, file: $file) {
      _id
      name
      profilePic
    }
  }
`;

export const ADD_SKILL = gql`
  mutation addSkill($profileId: ID!, $skillText: String!) {
    addSkill(profileId: $profileId, skillText: $skillText) {
      _id
      skillText
      skillAuthor
      createdAt
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const REMOVE_SKILL = gql`
  mutation removeSkill($skillId: ID!) {
    removeSkill(skillId: $skillId) {
      _id
      skillText
      skillAuthor
      createdAt
    }
  }
`;

export const REMOVE_MESSAGE = gql`
mutation Mutation($messageId: ID!) {
  removeMessage(messageId: $messageId) {
    _id
    text
  }
}
`;

export const SEND_MESSAGE = gql`
mutation SendMessage($recipientId: ID!, $text: String!) {
  sendMessage(recipientId: $recipientId, text: $text) {
    text
    _id
    createdAt
    recipient {
      _id
      name
    }
    sender {
      _id
      name
    }
  }
}
`
