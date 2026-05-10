import React, { useContext, useState } from "react";
import { PostContext } from "../../Context/PostContext";

export default function AddPost({ callback }) {
  const { createPost } = useContext(PostContext);
  const [postBody, setPostBody] = useState("");
  const [postImage, setPostImage] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  function handleImageChange(e) {
    const file = e.target.files[0];
    setPostImage(file);
    if (file) setPreview(URL.createObjectURL(file));
    else setPreview(null);
  }

  async function handleCreatePost(e) {
    e.preventDefault();
    if (!postBody.trim() && !postImage) return;
    setIsLoading(true);
    const formData = new FormData();
    formData.append("body", postBody);
    if (postImage) formData.append("image", postImage);
    await createPost(formData);
    setPostBody("");
    setPostImage(undefined);
    setPreview(null);
    if (callback) callback();
    setIsLoading(false);
  }

  return (
    <div style={{ background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"var(--radius-lg)",boxShadow:"var(--shadow-sm)",maxWidth:600,margin:"0 auto 20px",padding:"18px 20px" }}>
      <h2 style={{ fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:700,color:"var(--text-primary)",margin:"0 0 14px" }}>Create a post</h2>
      <form onSubmit={handleCreatePost}>
        <textarea value={postBody} onChange={e=>setPostBody(e.target.value)} placeholder="What's on your mind?" rows={3}
          style={{ width:"100%",padding:"12px 16px",border:"1px solid var(--border)",borderRadius:"var(--radius-md)",fontSize:14,color:"var(--text-primary)",background:"var(--surface-2)",resize:"none",outline:"none",fontFamily:"'DM Sans',sans-serif",lineHeight:1.6,transition:"border-color 0.15s" }}
          onFocus={e=>{e.target.style.borderColor="var(--brand)";e.target.style.background="var(--surface)";}}
          onBlur={e=>{e.target.style.borderColor="var(--border)";e.target.style.background="var(--surface-2)";}}
        />
        {preview && (
          <div style={{ position:"relative",marginTop:10,borderRadius:"var(--radius-md)",overflow:"hidden",border:"1px solid var(--border)" }}>
            <img src={preview} alt="Preview" style={{ width:"100%",maxHeight:200,objectFit:"cover",display:"block" }}/>
            <button type="button" onClick={()=>{setPreview(null);setPostImage(undefined);}} style={{ position:"absolute",top:8,right:8,width:28,height:28,borderRadius:"50%",border:"none",background:"rgba(15,23,42,0.6)",color:"white",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:700 }}>×</button>
          </div>
        )}
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:12 }}>
          <label style={{ display:"flex",alignItems:"center",gap:6,padding:"7px 14px",borderRadius:"var(--radius-md)",border:"1px solid var(--border)",cursor:"pointer",fontSize:13,fontWeight:500,color:"var(--text-secondary)",transition:"all 0.15s" }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--brand)";e.currentTarget.style.color="var(--brand)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.color="var(--text-secondary)";}}
          >
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            Photo
            <input type="file" accept="image/*" onChange={handleImageChange} style={{ display:"none" }}/>
          </label>
          <button type="submit" disabled={isLoading||(!postBody.trim()&&!postImage)} style={{ padding:"8px 22px",borderRadius:"var(--radius-md)",border:"none",background:"linear-gradient(135deg,var(--brand) 0%,#3b82f6 100%)",color:"white",fontSize:13.5,fontWeight:600,cursor:"pointer",boxShadow:"0 2px 8px rgba(26,86,219,0.3)" }}>
            {isLoading?"Posting...":"Post"}
          </button>
        </div>
      </form>
    </div>
  );
}