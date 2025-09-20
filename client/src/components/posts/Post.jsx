export default function PostComponent({content , mediaUrl , likeCount , likedByMe , onLike , userId}){
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
            <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3">
                    {userId?.slice(-2).toUpperCase()}
                </div>
                <span className="text-gray-700 font-semibold">User ID: {userId?.slice(-8)}</span>
            </div>
            
            <div className="mb-4 text-gray-800 text-lg leading-relaxed">
                {content}
            </div>
            
            {mediaUrl && (
                <div className="mb-4">
                    <img
                        src={mediaUrl}
                        alt="Post Media"
                        className="max-h-64 w-full object-cover rounded-md border border-gray-200"
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                </div>
            )}
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <button
                    onClick={onLike}
                    className={`flex items-center px-4 py-2 rounded-full transition-all duration-200 ${
                        likedByMe
                            ? 'bg-red-500 text-white hover:bg-red-600'
                            : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-500'
                    }`}
                >
                    <span className="mr-2 text-lg">
                        {likedByMe ? "❤️" : "🤍"}
                    </span>
                    <span className="font-medium">{likeCount}</span>
                </button>
                
                <span className="text-xs text-gray-400">
                    Post ID: {userId?.slice(-6)}
                </span>
            </div>
        </div>
    )
}