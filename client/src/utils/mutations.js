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
  mutation uploadProfilePic($profileId: ID!, $profilePic: Upload!) {
    uploadProfilePic(profileId: $profileId, profilePic: $profilePic) {
      _id
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
`;
export const SAVE_SOCIAL_MEDIA_LINK = gql`
mutation  saveSocialMediaLink($userId: ID!, $type: String!, $link: String!) {
  saveSocialMediaLink(userId: $userId, type: $type, link: $link) {
    _id
    userId
    type
    link
  }
}
`;

export const UPDATE_NAME_MUTATION = gql`
  mutation UpdateName($name: String!) {
    updateName(name: $name) {
      _id
      name
    }
  }
`;

// Mutation to update the password
export const UPDATE_PASSWORD_MUTATION = gql`
mutation UpdatePassword($currentPassword: String!, $newPassword: String!) {
  updatePassword(currentPassword: $currentPassword, newPassword: $newPassword) {
    _id
    name
  }
}
`;