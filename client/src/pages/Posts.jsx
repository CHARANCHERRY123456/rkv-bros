import { useState } from "react";
import PostComponent from "../components/posts/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import axiosClient from "../utils/axiosClient";

export default function Post() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 1;

  const fetchPosts = async () => {
    try {
      const res = await axiosClient.get(`/post?page=${page}&limit=${limit}`);
      if (Array.isArray(res.data)) {
        if (res.data.length < limit) setHasMore(false);
        setPosts(prev => [...prev, ...res.data]);
        setPage(prev => prev + 1);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Posts Feed</h1>
          <p className="text-gray-600 text-sm mt-1">Discover what's trending</p>
        </div>
      </div>

      {/* Posts Container */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchPosts}
          hasMore={hasMore}
          loader={
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-gray-600">Loading more posts...</span>
            </div>
          }
          endMessage={
            <div className="text-center py-8">
              <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full">
                <svg className="w-5 h-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 font-medium">You're all caught up!</span>
              </div>
            </div>
          }
        >
          {posts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v3M7 4H5a1 1 0 00-1 1v16a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1h-2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
              <p className="text-gray-500">Be the first to share something!</p>
            </div>
          )}
          
          {posts.map(post => (
            <PostComponent
              key={post._id}
              content={post.content}
              mediaUrl={post.mediaUrl}
              likeCount={post.likeCount}
              likedByMe={post.isLikeByMe}
              userId={post.userId}
            />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}
