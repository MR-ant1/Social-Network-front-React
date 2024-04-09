
import "./Home.css"
import { useSelector } from 'react-redux'
import { useState } from "react"
import { PostCard } from "../../common/PostCard/PostCard"
import { GetPosts } from "../../services/apiCalls"
import { userData } from "../../app/slices/userSlice"
import { RedirectButton } from "../../common/RedirectButton/RedirectButton"
import { useNavigate } from 'react-router-dom'


export const Home = () => {

    // const navigate = useNavigate()
    const reduxUser = useSelector(userData)
   
    const navigate = useNavigate()

    const [posts, setPosts] = useState([])
    if (reduxUser.tokenData.token) {

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
                        <div className="cardsDesign">
                            {posts.slice(0, posts.length).map(      //Giving a limit to ensure that only brings one time each existing post
                                post => {
                                    return (
                                        <div key={post._id}>
                                            <PostCard
                                                authorFirstName={post.authorFirstName}
                                                title={post.title.length > 20 ? post.title.substring(0, 20) : post.title}
                                                description={post.description.length > 40 ? post.description.substring(0, 40) + "..." : post.description}

                                            // clickFunction={() => !tokenData?.token  //Depending if user owns a token or not, function sends to login or createAppointment
                                            //     ? navigate("/login")
                                            //     : navigate("/createAppointment")
                                            // }
                                            />
                                        </div>
                                    )
                                })}
                                </div>
                        </>
                        
                    ) : (                   //While data is being loaded from db, this message shows on the screen
                        <div className="homeDesign">LOADING</div>
                    ))}
            
        </div>
    )
}