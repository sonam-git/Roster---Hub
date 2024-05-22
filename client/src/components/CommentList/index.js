import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { PencilAltIcon, TrashIcon} from "@heroicons/react/solid";
import { REMOVE_COMMENT, UPDATE_COMMENT } from "../../utils/mutations";
import { GET_POSTS } from "../../utils/queries";
import Auth from "../../utils/auth";

const CommentList = ({ post, comments }) => {
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState("");
  const [updateSuccessMessage, setUpdateSuccessMessage] = useState("");

  const [removeComment] = useMutation(REMOVE_COMMENT,{refetchQueries: [{ query: GET_POSTS }]} );

  const [updateComment] = useMutation(UPDATE_COMMENT, {
    refetchQueries: [{ query: GET_POSTS }],
  });

  const postId = post._id;

  const handleDeleteComment = async (postId, commentId) => {
    try {
      await removeComment({ variables: { postId, commentId } });
      setDeleteSuccessMessage("Comment deleted successfully");
      setTimeout(() => {
        setDeleteSuccessMessage("");
      }, 3000);
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  const handleUpdateComment = async (postId, commentId) => {
    try {
      await updateComment({ variables: { postId, commentId, commentText } });
      setEditingCommentId(null);
      setCommentText("");
      setUpdateSuccessMessage("Comment updated successfully");
      setTimeout(() => {
        setUpdateSuccessMessage("");
      }, 3000);
    } catch (err) {
      console.error("Error updating comment:", err);
    }
  };

  return (
    <div className="mt-4 border-t pt-4">
      {deleteSuccessMessage && (
        <p className="text-green-500">{deleteSuccessMessage}</p>
      )}
      {updateSuccessMessage && (
        <p className="text-green-500">{updateSuccessMessage}</p>
      )}
      {comments?.length > 0 ? (
        comments.map((comment) => (
          <div
            key={comment._id}
            className="bg-gray-50 dark:bg-gray-700 shadow-sm rounded-lg p-3 mb-3"
          >
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-semibold">{comment.commentAuthor}</h4>
              <small className="text-gray-500">
                {new Date(parseInt(comment.createdAt)).toLocaleString()}
              </small>
            </div>
            {editingCommentId === comment._id ? (
              <div>
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full p-2 mt-2 border rounded dark:text-black"
                />
                <button
                  onClick={() => handleUpdateComment(postId, comment._id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded mt-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingCommentId(null)}
                  className="px-3 py-1 bg-gray-500 text-white rounded mt-2 ml-2"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  {comment.commentText}
                </p>
                {Auth.loggedIn() && Auth.getProfile().data.name === comment.commentAuthor && 
                  (
                    <div className="flex space-x-2">
                      <PencilAltIcon
                        className="h-5 w-5 text-blue-500 cursor-pointer"
                        title="Update"
                        onClick={() => {
                          setEditingCommentId(comment._id);
                          setCommentText(comment.commentText);
                        }}
                      />
                      <TrashIcon
                        className="h-5 w-5 text-red-500 cursor-pointer"
                        title="Delete"
                        onClick={() => handleDeleteComment(postId, comment._id)}
                      />
                    </div>
                  )}
              </>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No comments yet</p>
      )}
    </div>
  );
};

export default CommentList;
