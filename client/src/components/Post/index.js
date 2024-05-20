import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { PencilAltIcon, TrashIcon, ChatAltIcon } from '@heroicons/react/solid';
import { REMOVE_POST, UPDATE_POST } from '../../utils/mutations';
import { GET_POSTS } from '../../utils/queries';
import Auth from '../../utils/auth';

const Post = ({ post, loggedInUserName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [postText, setPostText] = useState(post.postText);
  const [isEdited, setIsEdited] = useState(false);

  const [removePost] = useMutation(REMOVE_POST, {
    refetchQueries: [{ query: GET_POSTS }],
  });

  const [updatePost] = useMutation(UPDATE_POST, {
    refetchQueries: [{ query: GET_POSTS }],
  });

  const handleDelete = async () => {
    try {
      await removePost({ variables: { postId: post._id } });
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedPost = await updatePost({ variables: { postId: post._id, postText } });
      setIsEditing(false);
      setIsEdited(true); // Set isEdited to true after update
      // Update the post's createdAt field in the UI
      setPostText({ ...post, createdAt: updatedPost.data.updatePost.createdAt });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{post?.postAuthor}</h3>
        {Auth.loggedIn() && loggedInUserName === post.postAuthor && (
          <div className="flex space-x-2">
            <PencilAltIcon
              className="h-5 w-5 text-blue-500 cursor-pointer"
              title="Update"
              onClick={() => setIsEditing(true)}
            />
            <TrashIcon
              className="h-5 w-5 text-red-500 cursor-pointer"
              title="Delete"
              onClick={handleDelete}
            />
          </div>
        )}
        <ChatAltIcon className="h-5 w-5 text-green-500 cursor-pointer" title="Comment" />
      </div>
      {isEditing ? (
        <div>
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            className="w-full p-2 mt-2 border rounded dark:text-black"
          />
          <button
            onClick={handleUpdate}
            className="px-3 py-1 bg-blue-500 text-white rounded mt-2"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="px-3 py-1 bg-gray-500 text-white rounded mt-2 ml-2"
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <p className="text-gray-700 dark:text-white mt-2">{post?.postText}</p>
          {isEdited && (
            <small className="text-gray-500">Edited: {new Date().toLocaleString()}</small>
          )}
        </>
      )}
      {post.createdAt && (
        <small className="text-gray-500">
          {isEdited ? '   Originally posted: ' : ''}
          {new Date(parseInt(post.createdAt)).toLocaleString()}
        </small>
      )}
    </div>
  );
};

export default Post;
