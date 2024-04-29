import React from 'react';
import { useMutation } from '@apollo/client';
import { REMOVE_MESSAGE } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

const MessageList = ({messages, isLoggedInUser = false}) => {
  const [removeMessage, { error }] = useMutation(REMOVE_MESSAGE, {
    update(cache, { data: { removeMessage } }) {
      try {
        // Remove the deleted skill from the cache
        const { me } = cache.readQuery({ query: QUERY_ME });
        const updatedMessage = me.messages.filter(
          (message) => message._id !== removeMessage._id
        );
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, messages: updatedMessage } },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleRemoveMessage = async (messageId ) => {
    try {
      // Call the removeSkill mutation with skillId
      await removeMessage({
        variables: { messageId },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!messages.length) {
    return <h3>No Messages Yet</h3>;
  }

  return (
    <div>
      <div className="flex-row justify-space-between my-4">
        {messages.map((message) => (
          <div key={message._id} className="col-12 col-xl-6">
            <div className="card mb-3">
            <p className="card-header bg-dark text-light p-2 m-0 display-flex align-center">
                <span className='message-text'>{message.text}</span>
                <span className='author-name'> By: {message._id}</span>
                {isLoggedInUser && (
                  <button
                    className="btn btn-sm btn-danger ml-auto"
                    onClick={() => handleRemoveMessage(message._id)} 
                  >
                    X
                  </button>
                )}
            </p>
            </div>
          </div>
        ))}
      </div>
      {error && (
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}
    </div>
  );
}

export default MessageList