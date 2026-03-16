import { useContext, useEffect, useState } from "react";
import profilePic from "../../assets/a1.jpg";
import postsPic from "../../assets/p1.jpg";
import { Link } from "react-router-dom";
import { PostContext } from "../../Context/PostContext";
import moment from "moment";
export default function PostCard({ post, callback }) {
  const [showComments, setShowComments] = useState(false);
  const [commentCounter, setCommentCounter] = useState(1);
  const [comments, setcomments] = useState([]);
  let { createComments, deletePost } = useContext(PostContext);
  const [commentsContent, setCommentsContent] = useState(null);

  useEffect(() => {
    setcomments(post.comments);
  }, []);


  async function handleComments(e) {
    e.preventDefault();
    let response = await createComments(
      {
        content: commentsContent,
        post: post._id
      }
    )

    // console.log(response);
    setcomments(response)
    setCommentsContent("")
  }


  async function handleDeletePosts(id) {
    let response = await deletePost(id);
    console.log(response);
    callback()


  }
  return (
    <div className="card bg-base-100 shadow-md p-4 max-w-xl mx-auto my-6 relative">
      <button onClick={() => document.getElementById('my_modal_1').showModal()} className="bg-slate-400 cursor-pointer text-blue-700 px-2 py-2 absolute top-0 right-0">X</button>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Dialoug</h3>
          <p className="py-4">Are you Sure You Eant to Delete this Post</p>
          <div className="modal-action justify-between ">
            <form onSubmit={(e) => e.preventDefault()} method="dialog " className=" ">

              <button className="btn ">Close</button>
              <button className="btn" onClick={() => handleDeletePosts(post._id)}
              >Delete</button>
            </form>
          </div>
        </div>
      </dialog>
      <Link to={`/postDetails/${post._id}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={post?.user?.photo} alt={post?.user?.name} />
            </div>
          </div>
          <div>
            <p className="font-bold">{post?.user?.name}</p>
            <p className="text-sm text-gray-400">{moment(post?.createdAt).fromNow()}</p>
          </div>
        </div>

        <p className="mb-3">{post.body}</p>

        <img
          src={post.image ? post.image : postsPic}
          className="rounded-lg w-full h-auto mb-4"
          alt="Post"
        />
      </Link>

      <div className="flex gap-3 text-sm text-gray-500">
        <button className="btn btn-ghost btn-sm">👍 Like</button>


        <button
          className="btn btn-ghost btn-sm"
          onClick={() => setShowComments(!showComments)}
        >
          💬 Comment {comments.length}
        </button>
        <button className="btn btn-ghost btn-sm">↪️ Share</button>
      </div>

      {/* Toggle Comments Section */}
      {showComments && (
        <div className="mt-4">
          {/* Existing Comments */}
          {comments
            .slice(0, commentCounter)

            .map((comment) => (
              <div key={comment._id} className="mb-4">
                <div className="mb-2 flex justify-between gap-3 items-center">
                  <div className="">
                    <div className=" avatar">
                      <div className="w-8 h-8 rounded-full ">
                        <img
                          src={
                            comment.commentCreator.photo.includes("undefined")
                              ? profilePic
                              : comment.commentCreator.photo
                          }
                          alt="Commenter"
                        />
                      </div>
                    </div>
                    <p>{comment.commentCreator.name} </p>
                  </div>
                  <div className="chat-bubble w-full">{comment.content}</div>
                </div>
              </div>
            ))}

          {comments.length > commentCounter && (
            <div className="text-center">
              <button
                onClick={() => setCommentCounter(commentCounter + 1)}
                className="btn btn-transparent btn-sm mb-3"
              >
                Load More Comments
              </button>
            </div>
          )}

          {/* New Comment Input */}
          <form
            onSubmit={(e) => handleComments(e)}
            className="flex  gap-5 content-between items-center"
          >
            <input
              type="text"
              name="content"
              value={commentsContent}
              onChange={(e) => setCommentsContent(e.target.value)}
              placeholder="Write a comment..."
              className="input input-bordered w-full"
            />
            <button type="submit" className="px-3 py-2 bg-blue-400 text-white rounded-xl">
              Add
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
