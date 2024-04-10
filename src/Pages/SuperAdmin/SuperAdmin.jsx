
import "./SuperAdmin.css"
import { useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import { PostCard } from "../../common/PostCard/PostCard"
import { GetPosts, usersCall } from "../../services/apiCalls"
import { userData } from "../../app/slices/userSlice"
import { useNavigate } from 'react-router-dom'
import { UserCard } from "../../common/UserCard/UserCard"

export const SuperAdmin = () => {

    const reduxUser = useSelector(userData)

    const navigate = useNavigate()

    const [posts, setPosts] = useState([])

    // eslint-disable-next-line no-unused-vars
    const [msgError, setMsgError] = useState("")

    const [users, setUsers] = useState([])

    const [loadedData, setLoadedData] = useState(false)

    // const [deleteMsgError, setDeleteMsgError] = useState("")

    useEffect(() => {
        if (reduxUser?.tokenData?.user?.role !== "super_admin") {
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

                setUsers(fetched.data)

                setLoadedData(true)

            } catch (error) {
                console.log(error)
            }
        }
        if (loadedData===false) {
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
                <div className="postNUserCards">
                    <div className="cardsDesign">
                    <div>POSTS</div>
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
                            })}
                    </div>
                    {loadedData===true ? (
                    <div className="userCards">
                        <div>USERS</div>
                        {users.slice(0, users.length).map(
                            user => {
                                return ( 
                                    <div className="userContainer" key={user._id}>
                                        <UserCard
                                            firstName={user.firstName}
                                            lastName={user.lastName}
                                            email={user.email}
                                            role={user.role}
                                            likedPosts={user.likedPosts}
                                        />
                                    </div>
                                )
                            })}
                    </div>
                    ) : (
                        <div className="loadingUsers">LOADING</div>
                    )}
                </div>
            )}
        </div>
    )
}

