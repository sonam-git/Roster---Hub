import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../../utils/queries';
import Post from '../Post';

const PAGE_SIZE = 3; // Number of posts per page

const PostsList = ({ userName, loggedInUserName,post }) => {
  const { loading, data, error } = useQuery(GET_POSTS);
  const [currentPage, setCurrentPage] = useState(1); // Current page number

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading posts</div>;
  }

  if (!data || !data.posts || !data.posts.length) {
    return <div>No posts yet</div>;
  }

  //Determine posts to display based on loggedInUserName and userName
  // const postsToDisplay = data.posts.filter(post =>
  //   post.postAuthor === loggedInUserName || post.postAuthor === userName
  // );
  const postsToDisplay = post ? data.posts.filter(post => post.postAuthor === userName) : data.posts.filter(post => post.userId === userName);

  if (postsToDisplay.length === 0) {
    return <div>No posts yet</div>;
  }

  // Calculate total number of pages
  const totalPages = Math.ceil(postsToDisplay.length / PAGE_SIZE);

  // Slice the posts based on current page
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedPosts = postsToDisplay.slice(startIndex, endIndex);

  // Function to handle page navigation
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-4">
      {paginatedPosts.map((post) => (
        <Post key={post._id} post={post} loggedInUserName={loggedInUserName}/>
      ))}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`px-3 py-1 mx-1 ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            } rounded`}
            onClick={() => goToPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PostsList;
