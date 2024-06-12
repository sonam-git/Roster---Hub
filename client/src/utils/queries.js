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
      posts {
        _id
        postText
        postAuthor
        createdAt
        userId
        comments {
          _id
          commentText
          commentAuthor
          createdAt
          userId
        }
      }
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
      posts {
        _id
        postText
        postAuthor
        createdAt
        userId
        comments {
          _id
          commentText
          commentAuthor
          createdAt
          userId
        }
      }
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
      posts {
        _id
        postText
        postAuthor
        createdAt
        userId
        comments {
          _id
          commentText
          commentAuthor
          createdAt
          userId
        }
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

export const GET_POSTS = gql`
query Posts {
  posts {
    _id
    userId
    postAuthor
    postText
    createdAt
    comments {
      commentText
      _id
      commentAuthor
      createdAt
      userId
    }
    likes
    likedBy
  }
}
`;

export const GET_POST = gql`
query Post($postId: ID!) {
  post(postId: $postId) {
    _id
    userId
    createdAt
    postAuthor
    postText
    comments {
      commentText
      _id
      commentAuthor
      createdAt
      userId
    }
    likes
    likedBy
  }
}
`;

export const GET_SKILLS = gql`
query Skills {
  skills {
    _id
    skillText
    skillAuthor
    createdAt
  }
}
`;

export const GET_COMMENTS = gql`
query Comments {
  comments {
    _id
    commentText
    commentAuthor
    createdAt
    userId
  }
}`;

export const GET_COMMENT = gql`
query Comment($commentId: ID!) {
  comment(commentId: $commentId) {
    _id
    commentText
    commentAuthor
    createdAt
    userId
  }
}`;

