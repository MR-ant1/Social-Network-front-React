
import "./Home.css"
import { useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import { PostCard } from "../../common/PostCard/PostCard"
import { GetPosts, createPostCall, likeCall } from "../../services/apiCalls"
import { userData } from "../../app/slices/userSlice"
import { RedirectButton } from "../../common/RedirectButton/RedirectButton"
import { useNavigate } from 'react-router-dom'
import { PostInput } from "../../common/PostInput/PostInput"
import { CButton } from "../../common/CButton/CButton"
import { updateDetail } from "../../app/slices/postDetailSlice"
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { Heart } from "lucide-react"



export const Home = () => {

    const reduxUser = useSelector(userData)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [posts, setPosts] = useState([])

    const inputHandler = (e) => {
        setStory((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const manageDetail = (post) => {
        dispatch(updateDetail({ detail: post }));
        navigate("/detailHome");
    };

    // eslint-disable-next-line no-unused-vars
    const [story, setStory] = useState({
        title: "",
        description: ""
    })

    // eslint-disable-next-line no-unused-vars
    const [storyError, setStoryError] = useState({
        titleError: "",
        descriptionError: ""
    })

    useEffect(() => {
        toast.dismiss()
        storyError.titleError &&
            toast.warn(storyError.titleError)
        storyError.descriptionError &&
            toast.warn(storyError.descriptionError)
    }, [storyError])


    useEffect(() => {
        const postFeed = async () => {
            try {
                const fetched = await GetPosts(reduxUser.tokenData.token)
                setPosts(fetched.data)
   

            } catch (error) {
                console.log(error)
            }
        }
        if (reduxUser.tokenData.token && posts.length === 0) {
            postFeed()
        }
    }, [posts])



    const sendPost = async () => {
        try {
            for (let elemento in story) {
                if (story[elemento] === "") {
                    throw new Error("All fields are required"),
                    toast.error("All fields are required")
                }
            }
          
            const fetched = await createPostCall(reduxUser.tokenData.token, story)

            if (fetched.data && fetched.data._id) {
                setPosts([...posts, fetched.data])
            }
            setStory({
                title:"",
                description:""
            })
            

            if (fetched.success === true) {
                toast.success(fetched.message)
            } else { toast.error(fetched.message) }

        } catch (error) {
            console.log(error.message)
        }
    }

    const likePost = async (postId) => {

        try {
            const fetched = await likeCall(reduxUser.tokenData.token, postId)

            if (fetched.message === "Like") {
                toast.success(fetched.message)
            } else toast.info(fetched.message)

            if (fetched.data && fetched.data._id) {
                setPosts(posts.map(post => post._id === postId ? fetched.data
                 : post))}

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="homeDesign">

            {reduxUser.tokenData.token === undefined ? (
                <>
                <div className="welcomeView">
                    <div className="welcomeMsg">Bienvenido a Post It!</div>
                    <RedirectButton
                        className={"loginButtonDesign"}
                        title={"Login"}
                        emitFunction={() => navigate("/login")}
                    />
                    <RedirectButton
                        className={"registerButtonDesign"}
                        title={"Register"}
                        emitFunction={() => navigate("/register")}
                    />
                    </div>
                </>
            ) : (

                posts.length > 0 ? (
                    <>
                    <div className="homeHeader">
                    FEED
                    </div>
                        <div className="postPanel">
                            <div className="writeBox">
                                <PostInput
                                    className={`postTitleInput`}
                                    type={"text"}
                                    name={"title"}
                                    value={story.title}
                                    placeholder={"¿Qué hay de nuevo?"}
                                    changeFunction={inputHandler}

                                />
                                <PostInput
                                    className={`createPostInput`}
                                    type={"text"}
                                    name={"description"}
                                    value={story.description}
                                    placeholder={"Desarrolla tu historia"}
                                    changeFunction={inputHandler}
                                />
                            </div>

                            <div className="sendButton">
                                <CButton
                                    className={"createPostButton"}
                                    title={"Publicar"}
                                    emitFunction={(sendPost)}
                                />

                            </div>
                        </div>

                        <div className="cardsDesign">
                            {posts.slice(0, posts.length).map(      //Giving a limit to ensure that only brings one time each existing post
                                post => {
                                    return (
                                        <div className="cardDiv" key={post._id}>
                                            <PostCard
                                                authorFirstName={post.authorFirstName}
                                                title={post.title.length > 20 ? post.title.substring(0, 20) : post.title}
                                                description={post.description.length > 40 ? post.description.substring(0, 40) + "..." : post.description}
                                                clickFunction={() => manageDetail(post)}
                                            />
                                            <div className="likeContainer" key={post._id} >
                                                <CButton
                                                className={"likeButton"}
                                                title={<Heart fill={post.likes.includes(reduxUser.tokenData.user.userId) ? "red"
                                                : "white"} />}
                                                emitFunction={() => likePost(post._id)}
                                                />
                                                <div className="likesNum">{post.likes.length}</div>
                                            </div>
                                            
                                        </div>
                                    )
                                }).reverse()}
                        </div>
                    </>

                ) : (
                    <div className="homeDesign">LOADING</div>
                ))}
            <ToastContainer
                position="top-center"
                autoClose={300}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
}