
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const Profile = () => {

    const navigate = useNavigate();

    const [loadedData, setLoadedData] = useState(false)

    const [posts, setPosts] = useState([])

    const reduxUser = useSelector(userData)

    const [write, setWrite] = useState("disabled")

    const dispatch = useDispatch()

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
                console.log(error.message)
            }
        }
        if (!loadedData) {
            UserProfile()
        }
    }, [user])

    useEffect(() => {
    toast.dismiss()
    userError.firstNameError && 
    toast.warn(userError.firstNameError)
    userError.lastNameError && 
    toast.warn(userError.lastNameError)
    }, [userError])

    useEffect(() => {
        const myPosts = async () => {
            try {
                const fetched = await GetMyPosts(reduxUser.tokenData.token)

                setPosts(fetched.data)

            } catch (error) {
                console.log(error)
            }
        }

        if (reduxUser.tokenData.token && posts.length === 0) {
        myPosts()}
    }, [posts])


    const UpdateProfile = async () => {
        try {
            for (let elemento in user) {
                if (user[elemento] === "") {
                    throw new Error("Todos los campos deben estar rellenos")
                }
            }

            const fetched = await UpdateCall(reduxUser?.tokenData?.token, user)
            if (fetched.success === true) {
                toast.success(fetched.message)
            }else  toast.error(fetched.message)
            
            setWrite("disabled")

            

        } catch (error) {
            console.log(error.message)
        }
    }

    const deletePost = async (id) => {
        try {
            const fetched = await deletePostCall(id, reduxUser.tokenData.token)
            if (fetched.success === true){
            toast.success(fetched.message)
            }
            if (fetched.success === false){
                toast.error(fetched.message)
                }

            setPosts(    
                posts.filter((post) => post._id !== id) 
            )
            
        } catch (error) {
            console.log(error.message)
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
                 
                    <CButton
                        className={write === "" ? " updateButton" : "allowButton"}
                        title={write === "" ? "Actualizar" : "Habilitar"}
                        emitFunction={write === "" ? UpdateProfile : () => setWrite("")}
                    />
              
                </div>
            ) : (
                <div>loading</div>
            )}
            {posts.length > 0 ? (
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
                                </div>
                            )
                        }
                    ).reverse()
                    }
                </div>

            ) : (
                <div>Aun no hay Posts</div>
            )}
        <ToastContainer 
        position="top-center"
        autoClose={2000}
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