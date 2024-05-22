import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { PencilAltIcon, TrashIcon, ChatAltIcon, XIcon } from '@heroicons/react/solid';
import { REMOVE_POST, UPDATE_POST, ADD_COMMENT } from '../../utils/mutations';
import { GET_POSTS } from '../../utils/queries';
import Auth from '../../utils/auth';
import CommentList from '../CommentList';

const PAGE_SIZE = 1; // Number of comments per page

const Post = ({ post }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [postText, setPostText] = useState(post.postText);
  const [isEdited, setIsEdited] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [removePost] = useMutation(REMOVE_POST, {
    refetchQueries: [{ query: GET_POSTS }],
  });

  const [updatePost] = useMutation(UPDATE_POST, {
    refetchQueries: [{ query: GET_POSTS }],
  });

  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [{ query: GET_POSTS }],
    onCompleted: () => {
      setCurrentPage(1); // Reset to first page after adding a comment
      setShowComments(true);
    }
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
      const { data } = await updatePost({ variables: { postId: post._id, postText } });
      setIsEditing(false);
      setIsEdited(true);
      setPostText(data.updatePost.postText);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddComment = async () => {
    try {
      await addComment({ variables: { postId: post._id, commentText } });
      setIsCommenting(false);
      setCommentText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleComment = () => {
    setIsCommenting(true);
    setShowComments(true);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
    if (!showComments) {
      setCurrentPage(1);
    }
  };

  const showNextComments = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const showPreviousComments = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const paginatedComments = post.comments.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="bg-gray-100 dark:bg-gray-800 shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm md:text-md lg:text-lg xl:text-xl ">{post?.postAuthor}</h3>
        {Auth.loggedIn() && Auth.getProfile().data._id === post.userId && (
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
        <ChatAltIcon
          className="h-5 w-5 text-green-500 cursor-pointer"
          title="Comment"
          onClick={handleComment}
        />
        {!showComments ? (
          <ChatAltIcon
            className="h-5 w-5 text-indigo-400 cursor-pointer"
            title="Show Comments"
            onClick={toggleComments}
          />
        ) : (
          <XIcon
            className="h-5 w-5 text-indigo-400 cursor-pointer"
            title="Close Comments"
            onClick={toggleComments}
          />
        )}
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
      {isCommenting && (
        <div>
          <textarea
            className="w-full p-2 mt-2 border rounded dark:text-black"
            placeholder="Add your comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button
            onClick={() => setIsCommenting(false)}
            className="px-3 py-1 bg-gray-500 text-white rounded mt-2"
          >
            Cancel
          </button>
          <button
            onClick={handleAddComment}
            className="px-3 py-1 bg-blue-500 text-white rounded mt-2 ml-2"
          >
            Add Comment
          </button>
        </div>
      )}
      {showComments && (
        <div>
          <CommentList comments={paginatedComments} post={post} />
          {post.comments.length > PAGE_SIZE && (
            <div className="flex justify-between mt-2">
              <button
                onClick={showPreviousComments}
                className="px-3 py-1 bg-gray-500 text-white rounded"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                onClick={showNextComments}
                className="px-3 py-1 bg-gray-500 text-white rounded"
                disabled={currentPage * PAGE_SIZE >= post.comments.length}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Post;
