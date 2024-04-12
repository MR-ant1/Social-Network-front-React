
import "./PostCard.css"

// eslint-disable-next-line react/prop-types
export const PostCard = ({key, id, title, description, authorFirstName, authorLastName, clickFunction}) => {

    return(
        <div className="postCardDesign" onClick={clickFunction} key={key}>
            <div>{id}</div>
            <div>{authorFirstName} {authorLastName}</div>
            <div className="titleDesign">{title}</div>
            <div>{description}</div>
        </div>
    )
}