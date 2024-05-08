import { gql } from '@apollo/client';

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      name
      jerseyNumber
      position
      phoneNumber
      profilePic
      socialMediaLinks { 
        _id
        userId
        type
        link
      }
      skills {
        _id
        skillText
        skillAuthor
        createdAt
      }
      receivedMessages {
        _id
        text
        createdAt
        sender {
          _id
          name
        }
        recipient {
          _id
          name
        }
      }
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      name
      jerseyNumber
      position
      phoneNumber
      profilePic
      socialMediaLinks {
        _id
        userId
        type
        link
      }
      skills {
        _id
        skillText
        skillAuthor
        createdAt
      }
      receivedMessages {
        _id
        text
        createdAt
        sender {
          _id
          name
        }
        recipient {
          _id
          name
        }
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      jerseyNumber
      position
      phoneNumber
      profilePic
      socialMediaLinks { 
        _id
        userId
        type
        link
      }
      skills {
        _id
        skillText
        skillAuthor
        createdAt
      }
      receivedMessages {
        _id
        text
        createdAt
        sender {
          _id
          name
        }
        recipient {
          _id
          name
        }
      }
      sentMessages {
        _id
        text
        createdAt
        sender {
          _id
          name
        }
        recipient {
          _id
          name
        }
      }
    }
  }
`;

export const RECEIVED_MESSAGES = gql`
  query ReceivedMessages {
    receivedMessages {
      _id
      text
      createdAt
      sender {
        _id
        name
      }
      recipient {
        _id
        name
      }
    }
  }
`;
