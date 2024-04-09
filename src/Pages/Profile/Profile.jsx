
import './Profile.css';
import { userData } from '../../app/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { CInput } from '../../common/CInput/CInput';
import { validate } from '../../utils/validations';
import { CButton } from '../../common/CButton/CButton';
import { GetMyPosts, GetProfile, UpdateCall } from '../../services/apiCalls';
import { PostCard } from '../../common/PostCard/PostCard';


export const Profile = () => {

    const navigate = useNavigate();

    const [loadedData, setLoadedData] = useState(false)

    const [loadedPosts, setLoadedPosts] = useState(false)

    const [posts, setPosts] = useState([])

    const reduxUser = useSelector(userData)

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

    const [msgError, setMsgError] = useState("")

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
                setMsgError(error.message)
            }
        }
        if (loadedData===false) {
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
            setMsgError(fetched.message)

        } catch (error) {
            setMsgError(error.message)
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
                        className={"cbuttonDesign"}
                        title={"Update Info"}
                        emitFunction={UpdateProfile}
                    />
                    <div className="error">{msgError}</div>
                </div>
            
        ) : (
            <div>loading</div>
        )}
            {loadedPosts ? (
              <div className='myAppointments'>
                {posts.slice(0, posts.length).map(
                                post => {
                                    return (
                                        <div key={post._id}>
                                            <PostCard
                                                authorFirstName={post.authorFirstName}
                                                title={post.title.length > 20 ? post.title.substring(0, 20) : post.title}
                                                description={post.description.length > 40 ? post.description.substring(0, 40) + "..." : post.description}
                                            />
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