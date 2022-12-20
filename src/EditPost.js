import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import format from "date-fns/format";
import { useStoreActions, useStoreState } from "easy-peasy";

const EditPost = () => {

    const editTitle = useStoreState((state) => state.editTitle)
    const editBody = useStoreState((state) => state.editBody)
    // const posts = useStoreState((state) => state.posts)

    const setEditTitle = useStoreActions((actions) => actions.setEditTitle)
    const setEditBody = useStoreActions((actions) => actions.setEditBody)
    const editPost = useStoreActions((actions) => actions.editPost)

    const navigate = useNavigate()

    // const { posts, setPosts } = useContext(DataContext)  

    const { id } = useParams()
    const getPostById = useStoreState((state) => state.getPostById)
    const post = getPostById(id)

    useEffect(() => {
        if (post) {
            setEditTitle(post.title)
            setEditBody(post.body)
        }
    }, [post, setEditTitle, setEditBody])

    const handleEdit = (id) => {
        const datetime = format(new Date(), 'MMM dd, yyyy pp')
        const updatedPost = { id, title: editTitle, datetime, body: editBody }
    
        editPost(updatedPost)
        navigate(`/post/${id}`)
    }

  return (
    <main className="NewPost">
        {editTitle &&
            <>
                <h2>Edit Post</h2>
                <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="postTitle">Title:</label>
                <input 
                    type="text" 
                    id="postTitle" 
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                />
                <label htmlFor="postBody">Post:</label>
                <textarea 
                    id="postBody" 
                    cols="30" 
                    rows="10"
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                />
                <button type="button" onClick={() => handleEdit(post.id)}>Submit</button>
                </form>
            </>
        }
        {!editTitle &&
            <>
                <h2>Post Not Found</h2>
                <p>Well, thats disappointing.</p>
                <p>
                    <Link to='/'>Visit Our Homepage</Link>
                </p>
            </>
        }
    </main>
  )
};

export default EditPost;
