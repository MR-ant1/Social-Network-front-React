
import './Profile.css';
import { userData } from '../../app/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';
import { CInput } from '../../common/CInput/CInput';
import { validate } from '../../utils/validations';
import { CButton } from '../../common/CButton/CButton';
import { GetMyPosts, GetProfile, UpdateCall, deletePostCall } from '../../services/apiCalls';
import { PostCard } from '../../common/PostCard/PostCard';
import { updateDetail } from '../../app/slices/postDetailSlice';
// import toast, {Toaster} from 'react-hot-toast'


export const Profile = () => {

    const navigate = useNavigate();

    const [loadedData, setLoadedData] = useState(false)

    const [loadedPosts, setLoadedPosts] = useState(false)

    const [posts, setPosts] = useState([])

    const reduxUser = useSelector(userData)

    const [write, setWrite] = useState("disabled")

    const dispatch = useDispatch()

    // const deleteNotify = () => toast(deleteMsgError);

    useEffect(() => {
        if (!reduxUser.tokenData.token) {
            navigate("/")
        }
    }, [reduxUser])

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: ""
    })

    const [userError, setUserError] = useState({
        firstNameError: "",
        lastNameError: "",
        emailError: ""
    })

    const [updateMsgError, setUpdateMsgError] = useState("")

    const [deleteMsgError, setDeleteMsgError] = useState("")

    const inputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const checkError = (e) => {
        const error = validate(e.target.name, e.target.value)

        setUserError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error
        }))
    }

    const manageDetail = (post) => {
        dispatch(updateDetail({ detail: post }));
        navigate("/detail");
    };

    useEffect(() => {
        // eslint-disable-next-line no-unused-vars
        const UserProfile = async () => {
            try {
                const fetched = await GetProfile(reduxUser.tokenData.token)
                console.log(fetched)
                setUser({
                    firstName: fetched.data.firstName,
                    lastName: fetched.data.lastName,
                    email: fetched.data.email
                })

                setLoadedData(true)

            } catch (error) {
                setUpdateMsgError(error.message)
            }
        }
        if (!loadedData) {
            UserProfile()
        }
    }, [user])

    useEffect(() => {
        const myPosts = async () => {
            try {
                const fetched = await GetMyPosts(reduxUser.tokenData.token)

                setPosts(fetched.data)
                setLoadedPosts(true)

                if(posts.length===0) {setLoadedPosts(false)}

            } catch (error) {
                console.log(error)
            }
        }
        myPosts()
    }, [posts])


    const UpdateProfile = async () => {
        try {
            for (let elemento in user) {
                if (user[elemento] === "") {
                    throw new Error("Todos los campos deben estar rellenos")
                }
            }

            const fetched = await UpdateCall(reduxUser?.tokenData?.token, user)
            setUpdateMsgError(fetched.message)
            
            setWrite("disabled")

            setTimeout(() => {
                setUpdateMsgError("")
            }, 3000)

        } catch (error) {
            setUpdateMsgError(error.message)
        }
    }

    const deletePost = async (id) => {
        try {
            const fetched = await deletePostCall(id, reduxUser.tokenData.token)
            setDeleteMsgError(fetched.message)

            setTimeout(() => {
                setDeleteMsgError("")
            }, 3000)

        } catch (error) {
            setDeleteMsgError(error.message)
        }
    }


    return (
       
        <div className="profileDesign">
            
            {loadedData ? (
                <div className='inputsContainer'>
                    <CInput
                        className={`inputDesign ${userError.firstNameError !== "" ? "inputDesignError" : ""
                            }`}
                        type={"text"}
                        name={"firstName"}
                        disabled={write}
                        value={user.firstName || ""}
                        changeFunction={inputHandler}
                        blurFunction={checkError}
                    />
                    <div className="error">{userError.firstNameError}</div>
                    <CInput
                        className={`inputDesign ${userError.lastNameError !== "" ? "inputDesignError" : ""
                            }`}
                        type={"text"}
                        name={"lastName"}
                        disabled={write}
                        value={user.lastName || ""}
                        changeFunction={inputHandler}
                        blurFunction={checkError}
                    />
                    <div className="error">{userError.lastNameError}</div>
                    <CInput
                        className={`inputDesign ${userError.emailError !== "" ? "inputDesignError" : ""
                            }`}
                        type={"email"}
                        name={"email"}
                        disabled={true}
                        value={user.email || ""}
                        changeFunction={inputHandler}
                        blurFunction={checkError}
                    />
                    <div className="error">{userError.emailError}</div>
                    <CButton
                        className={write === "" ? " updateButton" : "allowButton"}
                        title={write === "" ? "Actualizar" : "Habilitar"}
                        emitFunction={write === "" ? UpdateProfile : () => setWrite("")}
                    />
                    <div className="error">{updateMsgError}</div>
                </div>
            ) : (
                <div>loading</div>
            )}
            {loadedPosts ? (
                <div className='myPosts'>
                    {posts.slice(0, posts.length).map(
                        post => {
                            return (
                                <div className='myPostCard' key={post._id}>
                                    <PostCard
                                        authorFirstName={post.authorFirstName}
                                        title={post.title.length > 20 ? post.title.substring(0, 20) : post.title}
                                        description={post.description.length > 40 ? post.description.substring(0, 40) + "..." : post.description}
                                        clickFunction={() => manageDetail(post)}
                                    />
                                    <div className='deleteButton'>
                                        <CButton key={post._id}
                                            className={"deletePostButton"}
                                            title={"Eliminar"}
                                            emitFunction={(() => deletePost(post._id))}
                                            
                                        />
                                        
                                    </div>
                                    <div className="error">{deleteMsgError}</div>
                                </div>
                            )
                        }
                    )
                    }
                </div>

            ) : (
                <div>Aun no hay Posts</div>
            )}

        </div>
    )
}