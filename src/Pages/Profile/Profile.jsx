
import './Profile.css';
import { userData } from '../../app/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';
import { CInput } from '../../common/CInput/CInput';
import { validate } from '../../utils/validations';
import { CButton } from '../../common/CButton/CButton';
import { GetMyPosts, GetProfile, UpdateCall, deleteCall } from '../../services/apiCalls';
import { PostCard } from '../../common/PostCard/PostCard';
import { updateDetail } from '../../app/slices/postDetailSlice';


export const Profile = () => {

    const navigate = useNavigate();

    const [loadedData, setLoadedData] = useState(false)

    const [loadedPosts, setLoadedPosts] = useState(false)

    const [posts, setPosts] = useState([])

    const reduxUser = useSelector(userData)

    const dispatch = useDispatch()

    useEffect(() => {
        if (!reduxUser?.tokenData.token) {
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
                const fetched = await GetProfile(reduxUser?.tokenData?.token)

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
        if (loadedData === false) {
            UserProfile()
        }
    }, [user])


    const UpdateProfile = async () => {
        try {
            for (let elemento in user) {
                if (user[elemento] === "") {
                    throw new Error("Todos los campos deben estar rellenos")
                }
            }

            const fetched = await UpdateCall(reduxUser?.tokenData?.token, user)
            setUpdateMsgError(fetched.message)

        } catch (error) {
            setUpdateMsgError(error.message)
        }
    }

    const deletePost = async (id) => {
        try {
            const fetched = await deleteCall(id, reduxUser.tokenData.token)
            setDeleteMsgError(fetched.message)


        } catch (error) {
            setDeleteMsgError(error.message)
        }
    }

    useEffect(() => {

        const myPosts = async () => {
            try {
                const fetched = await GetMyPosts(reduxUser.tokenData.token)

                setPosts(fetched.data)
                setLoadedPosts(true)

            } catch (error) {
                console.log(error)
            }
        }
        myPosts()
    }, [posts])

    return (

        <div className="profileDesign">
            {loadedData ? (
                <div className='inputsContainer'>
                    <CInput
                        className={`inputDesign ${userError.firstNameError !== "" ? "inputDesignError" : ""
                            }`}
                        type={"text"}
                        name={"firstName"}
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
                        className={"updateButton"}
                        title={"Update Info"}
                        emitFunction={UpdateProfile}
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
                                        title={post.title}
                                        description={post.description}
                                        clickFunction={() => manageDetail(post)}
                                    />
                                    <div className='deleteButton'>
                                        <CButton key={post._id}
                                            className={"deletePostButton"}
                                            title={"Eliminar"}
                                            emitFunction={(() => deletePost(post._id))}
                                        />
                                        <div className="error">{deleteMsgError}</div>
                                    </div>
                                </div>
                            )
                        }
                    )
                    }
                </div>

            ) : (
                <div>loading</div>
            )}

        </div>
    )
}