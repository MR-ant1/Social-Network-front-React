
import "./SuperAdmin.css"
import { useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import { PostCard } from "../../common/PostCard/PostCard"
import { GetPosts, usersCall } from "../../services/apiCalls"
import { userData } from "../../app/slices/userSlice"
import { useNavigate } from 'react-router-dom'

export const Home = () => {

    const reduxUser = useSelector(userData)

    const navigate = useNavigate()

    const [posts, setPosts] = useState([])

    const [loadedData, setLoadedData] = useState(false)

    // eslint-disable-next-line no-unused-vars
    const [msgError, setMsgError] = useState("")

    const [users, setUsers] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "",
        likedPosts: ""
    })

    // const [deleteMsgError, setDeleteMsgError] = useState("")

    useEffect(() => {
        if (reduxUser?.tokenData.role !== "super_admin") {
            navigate("/")
        }
    }, [reduxUser])
    
       useEffect(() => {
         const postFeed = async () => {
                try {
                    const fetched = await GetPosts(reduxUser.tokenData.token)

                    setPosts(fetched.data)
                    

                } catch (error) {
                    console.log(error)
                }
            }
            postFeed()
       }, [posts])
           
    
    useEffect(() => {
        const getUsers = async () => {
        try {
            const fetched = await usersCall(reduxUser?.tokenData?.token)

            setMsgError(fetched.message)
            setUsers({
                firstName: fetched.data.firstName,
                lastName: fetched.data.lastName,
                email: fetched.data.email,
                password: fetched.data.password,
                role: fetched.data.role,
                likedPosts: fetched.data.likedPosts  
            })
            
            setLoadedData(true)

            setTimeout(() => {
                setMsgError("")
            }, 3000)

        } catch (error) {
            console.log(error)
        } 
    } 
    if (loadedData === false) {
    getUsers()
    }
    }, [users])
   

    // const deletePost = async (id) => {
    //     try {
    //         const fetched = await deletePostCall(id, reduxUser.tokenData.token)
    //         setDeleteMsgError(fetched.message)

    //         setTimeout(() => {
    //             setDeleteMsgError("")
    //         }, 3000)

    //     } catch (error) {
    //         setDeleteMsgError(error.message)
    //     }
    // }

    return (
        <div className="adminDesign">

            {posts.length === 0 ? (
                <div className="adminDesign">LOADING</div>
            ) : (
                    <div className="post&UserCards">
                        <div className="cardsDesign">
                            {posts.slice(0, posts.length).map(      
                                post => {
                                    return (
                                        <div className="postContainer" key={post._id}>
                                            <PostCard
                                                authorFirstName={post.authorFirstName}
                                                title={post.title.length > 20 ? post.title.substring(0, 20) : post.title}
                                                description={post.description.length > 40 ? post.description.substring(0, 40) + "..." : post.description}
                                            />
                                        </div>
                                    )
                                })}
                        </div>
                        <div className="userCards">
                            {users.slice(0, users.length).map(      
                                user => {
                                    return (
                                        <div className="postContainer" key={user._id}>
                                            {/* <PostCard
                                                authorFirstName={post.authorFirstName}
                                                title={post.title.length > 20 ? post.title.substring(0, 20) : post.title}
                                                description={post.description.length > 40 ? post.description.substring(0, 40) + "..." : post.description}
                                            /> */}
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
            )}
        </div>
    )
}
                 
