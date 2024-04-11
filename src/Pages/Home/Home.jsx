
import "./Home.css"
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from "react"
import { PostCard } from "../../common/PostCard/PostCard"
import { GetPosts, createPostCall, likeCall } from "../../services/apiCalls"
import { userData } from "../../app/slices/userSlice"
import { RedirectButton } from "../../common/RedirectButton/RedirectButton"
import { useNavigate } from 'react-router-dom'
import { PostInput } from "../../common/PostInput/PostInput"
import { CButton } from "../../common/CButton/CButton"


export const Home = () => {

    const reduxUser = useSelector(userData)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [posts, setPosts] = useState([])

    const inputHandler = (e) => {
        setStory((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const [msgError, setMsgError] = useState("")

    // const [isDisabled, setIsDisabled] = useState(true)

    const [story, setStory] = useState({
        title: "",
        description: ""
    })



    useEffect(() => {
        const postFeed = async () => {
            try {
                const fetched = await GetPosts(reduxUser?.tokenData?.token)

                setPosts(fetched.data)


            } catch (error) {
                console.log(error)
            }
        }
        if (posts.length === 0) {
            postFeed()
        }
    }, [posts])



    const sendPost = async () => {
        try {
            for (let elemento in posts) {
                if (posts[elemento] === "") {
                    throw new Error("Todos los campos deben estar rellenos")
                }
            }
            const fetched = await createPostCall(reduxUser?.tokenData?.token, story)

            setMsgError(fetched.message)
            // setPosts(fetched.data)


            setTimeout(() => {
                setMsgError("")
            }, 3000)

        } catch (error) {
            setMsgError(error.message)
        }
    }

    const likePost = async (postId) => {
        try {

            const fetched = await likeCall(reduxUser?.tokenData?.token, postId)

            setMsgError(fetched.message)

            setTimeout(() => {
                setMsgError("")
            }, 3000)

        } catch (error) {
            setMsgError(error)
        }
    }

    return (
        <div className="homeDesign">

            {reduxUser?.tokenData?.token === undefined ? (
                <>
                    <div className="welcomeMsg">Bienvenido a Posstinger.</div>
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
                </>
            ) : (

                posts.length > 0 ? (
                    <>
                        <div className="postPanel">
                            <div className="writeBox">
                                <PostInput
                                    className={`postTitleInput`}
                                    type={"text"}
                                    // disabled={isDisabled}
                                    name={"title"}
                                    placeholder={"Titulo de tu historia"}
                                    changeFunction={inputHandler}
                                // onClick={() => setIsDisabled(false)}
                                />
                                <PostInput
                                    className={`createPostInput`}
                                    type={"textarea"}
                                    // disabled={isDisabled}
                                    name={"description"}
                                    placeholder={"Sorprende al mundo con su trama"}
                                    changeFunction={inputHandler}
                                // onClick={() => setIsDisabled(false)}
                                />
                            </div>

                            <div className="sendButton">
                                <div className="error">{msgError}</div>
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
                                        <div className="postContainer" key={post._id}>
                                            <PostCard
                                                authorFirstName={post.authorFirstName}
                                                title={post.title.length > 20 ? post.title.substring(0, 20) : post.title}
                                                description={post.description.length > 40 ? post.description.substring(0, 40) + "..." : post.description}
                                            />
                                            <div className="likeButton" key={post._id}>
                                                <CButton
                                                    className={"likeButton"}
                                                    title={post.likes.length}
                                                    emitFunction={() => likePost(post._id)}
                                                />
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                    </>

                ) : (                   
                    <div className="homeDesign">LOADING</div>
                ))}

        </div>
    )
}