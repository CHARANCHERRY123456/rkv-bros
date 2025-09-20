import { useState } from "react";
import axiosClient from "../../utils/axiosClient";

export default function CreateNewPost({onPostCreated}){
    const [content , setContent] = useState("");
    const [mediaUrl , setMediaUrl] = useState("");

    const handleSubmit = async(e) => {
        alert("submitting form");
        e.preventDefault();
        if(!content.trim()) return;
        try {
            const res = await axiosClient.post("/post" , {content , mediaUrl});
            onPostCreated(res.data);
            setContent("");
            setMediaUrl("");
        } catch (error) {
            console.error("error posting : " , error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}  >
            <textarea 
                value={content}
                onChange={(e)=> setContent(e.target.value)}
                placeholder="Whats on your mind"
                rows={3}
            />
            <input
                type="text"
                placeholder="Image URL (optional)"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                style={{ width: "100%", marginTop: "0.5rem" }}
            />

            <button type="submit">
                Post
            </button>

        </form>
    )

}