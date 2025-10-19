import { useState } from "react";
import axiosClient from "../../utils/axiosClient";
import { toast } from "react-hot-toast";

export default function CreateNewPost({onPostCreated}){
    const [content , setContent] = useState("");
    const [mediaUrl , setMediaUrl] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!content.trim()) return;
        
        toast.loading("Creating post...");
        try {
            const res = await axiosClient.post("/post" , {content , mediaUrl});
            onPostCreated(res.data);
            setContent("");
            setMediaUrl("");
            toast.dismiss();
            toast.success("Post created successfully!");
        } catch (error) {
            console.error("error posting : " , error.message);
            toast.dismiss();
            toast.error("Failed to create post. Please try again.");
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
            {/* Header */}
            <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg mr-4">
                    U
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Create New Post</h3>
                    <p className="text-sm text-gray-500">Share your thoughts with the world</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Content Textarea */}
                <div className="relative">
                    <textarea 
                        value={content}
                        onChange={(e)=> setContent(e.target.value)}
                        placeholder="What's on your mind today?"
                        rows={4}
                        className="w-full p-4 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-500"
                    />
                    <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                        {content.length}/500
                    </div>
                </div>

                {/* Media URL Input */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Add an image URL (optional)"
                        value={mediaUrl}
                        onChange={(e) => setMediaUrl(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-500"
                    />
                </div>

                {/* Image Preview */}
                {mediaUrl && (
                    <div className="relative">
                        <img
                            src={mediaUrl}
                            alt="Preview"
                            className="max-h-48 w-full object-cover rounded-lg border border-gray-200"
                            onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        <button
                            type="button"
                            onClick={() => setMediaUrl("")}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-200"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Footer Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center text-sm text-gray-500">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Public
                        </div>
                    </div>
                    
                    <button
                        type="submit"
                        disabled={!content.trim()}
                        className={`px-6 py-2 rounded-full font-medium transition-all duration-200 flex items-center space-x-2 ${
                            content.trim()
                                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-md hover:shadow-lg transform hover:scale-105'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        <span>Share Post</span>
                    </button>
                </div>
            </form>
        </div>
    )

}