import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PostContext } from "../../Context/PostContext";
import moment from "moment";

const AVATAR_BASE = "https://ui-avatars.com/api/?background=dbeafe&color=1d4ed8&bold=true&size=128&name=";

function getAvatar(photo, name) {
  if (!photo || photo.includes("undefined") || photo.includes("null")) {
    return `${AVATAR_BASE}${encodeURIComponent(name || "U")}`;
  }
  return photo;
}

export default function PostCard({ post, callback }) {
  const [showComments, setShowComments] = useState(false);
  const [commentCounter, setCommentCounter] = useState(3);
  const [comments, setComments] = useState([]);
  const [commentsContent, setCommentsContent] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const commentInputRef = useRef(null);
  const { createComments, deletePost } = useContext(PostContext);

  useEffect(() => {
    setComments(post.comments || []);
  }, []);

  async function handleComments(e) {
    e.preventDefault();
    if (!commentsContent.trim()) return;
    setIsSubmittingComment(true);
    const response = await createComments({ content: commentsContent, post: post._id });
    if (response) setComments(response);
    setCommentsContent("");
    setIsSubmittingComment(false);
  }

  async function handleDelete() {
    setIsDeleting(true);
    await deletePost(post._id);
    setShowDeleteModal(false);
    if (callback) callback();
  }

  return (
    <>
      {showDeleteModal && (
        <div style={{ position:"fixed",inset:0,background:"rgba(15,23,42,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:16,backdropFilter:"blur(4px)" }}>
          <div style={{ background:"var(--surface)",borderRadius:"var(--radius-xl)",boxShadow:"var(--shadow-lg)",maxWidth:360,width:"100%",padding:28 }}>
            <div style={{ width:48,height:48,borderRadius:"50%",background:"var(--danger-light)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px" }}>
              <svg width="22" height="22" fill="none" stroke="var(--danger)" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
            </div>
            <h3 style={{ fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,textAlign:"center",color:"var(--text-primary)",margin:"0 0 8px" }}>Delete this post?</h3>
            <p style={{ fontSize:14,color:"var(--text-secondary)",textAlign:"center",margin:"0 0 24px" }}>This action cannot be undone.</p>
            <div style={{ display:"flex",gap:10 }}>
              <button onClick={() => setShowDeleteModal(false)} style={{ flex:1,padding:"10px",borderRadius:"var(--radius-md)",border:"1px solid var(--border)",background:"transparent",fontSize:14,fontWeight:500,cursor:"pointer",color:"var(--text-secondary)" }}>Cancel</button>
              <button onClick={handleDelete} disabled={isDeleting} style={{ flex:1,padding:"10px",borderRadius:"var(--radius-md)",border:"none",background:"var(--danger)",fontSize:14,fontWeight:600,cursor:"pointer",color:"white" }}>{isDeleting?"Deleting...":"Delete"}</button>
            </div>
          </div>
        </div>
      )}

      <div className="fade-up" style={{ background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"var(--radius-lg)",boxShadow:"var(--shadow-sm)",maxWidth:600,margin:"0 auto 16px",overflow:"hidden",transition:"box-shadow 0.2s ease,transform 0.2s ease" }}
        onMouseEnter={e=>{e.currentTarget.style.boxShadow="var(--shadow-md)";e.currentTarget.style.transform="translateY(-1px)";}}
        onMouseLeave={e=>{e.currentTarget.style.boxShadow="var(--shadow-sm)";e.currentTarget.style.transform="translateY(0)";}}
      >
        {/* Header */}
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px 12px" }}>
          <Link to={`/postDetails/${post._id}`} style={{ display:"flex",alignItems:"center",gap:12,textDecoration:"none" }}>
            <img src={getAvatar(post?.user?.photo,post?.user?.name)} alt={post?.user?.name}
              style={{ width:42,height:42,borderRadius:"50%",objectFit:"cover",border:"2px solid var(--brand-light)" }}
              onError={e=>{e.target.src=`${AVATAR_BASE}${encodeURIComponent(post?.user?.name||"U")}`;}}
            />
            <div>
              <p style={{ fontSize:14,fontWeight:600,color:"var(--text-primary)",margin:0 }}>{post?.user?.name}</p>
              <p style={{ fontSize:12,color:"var(--text-tertiary)",margin:0 }}>@{post?.user?.username||post?.user?.name?.toLowerCase().replace(/\s/g,"")} · {moment(post?.createdAt).fromNow()}</p>
            </div>
          </Link>
          {callback && (
            <button onClick={()=>setShowDeleteModal(true)} style={{ width:34,height:34,borderRadius:"var(--radius-sm)",border:"none",background:"transparent",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--text-tertiary)",transition:"all 0.15s" }}
              onMouseEnter={e=>{e.currentTarget.style.color="var(--danger)";e.currentTarget.style.background="var(--danger-light)";}}
              onMouseLeave={e=>{e.currentTarget.style.color="var(--text-tertiary)";e.currentTarget.style.background="transparent";}}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
            </button>
          )}
        </div>

        {/* Body */}
        <Link to={`/postDetails/${post._id}`} style={{ textDecoration:"none",display:"block" }}>
          {post.body && <p style={{ fontSize:14.5,color:"var(--text-primary)",lineHeight:1.65,padding:"0 20px 14px",margin:0 }}>{post.body}</p>}
          {post.image && (
            <div style={{ overflow:"hidden",borderTop:"1px solid var(--border)",borderBottom:"1px solid var(--border)" }}>
              <img src={post.image} alt="Post" style={{ width:"100%",maxHeight:340,objectFit:"cover",display:"block" }}/>
            </div>
          )}
        </Link>

        {comments.length > 0 && (
          <div style={{ padding:"8px 20px 0" }}>
            <span style={{ fontSize:12,color:"var(--text-tertiary)" }}>{comments.length} comment{comments.length!==1?"s":""}</span>
          </div>
        )}

        {/* Actions */}
        <div style={{ display:"flex",padding:"8px 12px",borderTop:"1px solid var(--border)",marginTop:8,gap:4 }}>
          {[
            { label:"Like", active:liked, onClick:()=>setLiked(v=>!v), icon:<svg width="16" height="16" fill={liked?"var(--brand)":"none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/></svg> },
            { label:"Comment", active:showComments, onClick:()=>{setShowComments(v=>!v);setTimeout(()=>commentInputRef.current?.focus(),100);}, icon:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
          ].map(({label,active,onClick,icon})=>(
            <button key={label} onClick={onClick} style={{ display:"flex",alignItems:"center",gap:6,padding:"7px 12px",borderRadius:"var(--radius-sm)",border:"none",background:active?"var(--brand-light)":"transparent",color:active?"var(--brand)":"var(--text-secondary)",fontSize:13,fontWeight:500,cursor:"pointer",transition:"all 0.15s" }}>
              {icon}{label}
            </button>
          ))}
          <button style={{ display:"flex",alignItems:"center",gap:6,padding:"7px 12px",borderRadius:"var(--radius-sm)",border:"none",background:"transparent",color:"var(--text-secondary)",fontSize:13,fontWeight:500,cursor:"pointer",marginLeft:"auto" }}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            Share
          </button>
        </div>

        {/* Comments */}
        {showComments && (
          <div style={{ background:"var(--surface-2)",borderTop:"1px solid var(--border)",padding:"16px 20px" }}>
            {comments.slice(0,commentCounter).map(comment=>(
              <div key={comment._id} style={{ display:"flex",gap:10,marginBottom:12 }}>
                <img src={getAvatar(comment.commentCreator?.photo,comment.commentCreator?.name)} alt={comment.commentCreator?.name}
                  style={{ width:32,height:32,borderRadius:"50%",objectFit:"cover",flexShrink:0 }}
                  onError={e=>{e.target.src=`${AVATAR_BASE}${encodeURIComponent(comment.commentCreator?.name||"U")}`;}}
                />
                <div style={{ background:"var(--surface)",borderRadius:"var(--radius-md)",padding:"8px 14px",flex:1,border:"1px solid var(--border)" }}>
                  <p style={{ fontSize:12,fontWeight:600,color:"var(--text-primary)",margin:"0 0 2px" }}>{comment.commentCreator?.name}</p>
                  <p style={{ fontSize:13.5,color:"var(--text-secondary)",margin:0 }}>{comment.content}</p>
                </div>
              </div>
            ))}
            {comments.length>commentCounter && (
              <button onClick={()=>setCommentCounter(c=>c+3)} style={{ fontSize:12,color:"var(--brand)",background:"none",border:"none",cursor:"pointer",fontWeight:500,padding:"0 0 10px" }}>
                View {comments.length-commentCounter} more comments
              </button>
            )}
            <form onSubmit={handleComments} style={{ display:"flex",gap:10,marginTop:4 }}>
              <input ref={commentInputRef} type="text" value={commentsContent} onChange={e=>setCommentsContent(e.target.value)} placeholder="Write a comment..."
                style={{ flex:1,padding:"9px 16px",border:"1px solid var(--border)",borderRadius:999,fontSize:13,outline:"none",background:"var(--surface)",color:"var(--text-primary)",fontFamily:"'DM Sans',sans-serif" }}
                onFocus={e=>{e.target.style.borderColor="var(--brand)";}} onBlur={e=>{e.target.style.borderColor="var(--border)";}}
              />
              <button type="submit" disabled={!commentsContent.trim()||isSubmittingComment} style={{ padding:"9px 18px",borderRadius:999,border:"none",background:"var(--brand)",color:"white",fontSize:13,fontWeight:600,cursor:"pointer" }}>
                {isSubmittingComment?"...":"Post"}
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}