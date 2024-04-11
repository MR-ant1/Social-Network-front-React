
import "./UserCard.css"

// eslint-disable-next-line react/prop-types
export const UserCard = ({key, firstName, lastName, email,  role, likedPosts}) => {

    return(
        <div className="postCardDesign" key={key}>
            <div>{firstName}</div>
            <div>{lastName}</div>
            <div>{email}</div>
            <div>{role}</div>
            <div>{likedPosts}</div>
        </div>
    )
}