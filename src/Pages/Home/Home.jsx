
import "./Home.css"
import { useSelector } from 'react-redux'
import { useState } from "react"
import { PostCard } from "../../common/PostCard/PostCard"
import { GetPosts } from "../../services/apiCalls"
import { userData } from "../../app/slices/userSlice"

export const Home = () => {
    
    // const navigate = useNavigate()
    const reduxUser = useSelector(userData)
    // eslint-disable-next-line no-unused-vars
   

    //const services is an empty array to allow map introduce a card for each value returned by the backend in getServices function
    const [posts, setPosts] = useState([])
    
        if (posts.length === 0) {        //If there is no posts, postFeed runs.
            const postFeed = async () => {
                try {
                    const fetched = await GetPosts(reduxUser?.tokenData?.token)

                    setPosts(fetched.data)   
                    //data obtained from backend is saved into services array.

                } catch (error) {
                    console.log(error)
                }
            }
            postFeed()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps


    return (
            <>
            {reduxUser?.tokenData?.token === undefined ? (
                <>
                <div className="welcomeMsg">Bienvenido a Posstinger.</div>
                </>
            ) : (
                posts.length > 0 ? (
                <div className="postCardDesign">
                    {posts.slice(0, posts.length).map(      //Giving a limit to ensure that only brings one time each existing post
                        post => {
                            return (
                                <div key={post._id}>
                                    <PostCard      
                                        authorFirstName={post.authorFirstName}                          
                                        title={post.title}
                                        description={post.description}
                                        
                                        // clickFunction={() => !tokenData?.token  //Depending if user owns a token or not, function sends to login or createAppointment
                                        //     ? navigate("/login")
                                        //     : navigate("/createAppointment")
                                        // }
                                    />
                                </div>
                            )
                        })}
                </div>
            ) : (                   //While data is being loaded from db, this message shows on the screen
                <div>LOADING</div>
            )) }
        </>
    )
}