
import "./PostCard.css"

// eslint-disable-next-line react/prop-types
export const PostCard = ({key, title, description, authorFirstName,  clickFunction}) => {

    return(
        <div className="postCardDesign" onClick={clickFunction} key={key}>
            <div>{authorFirstName}</div>
            <div className="titleDesign">{title}</div>
            <div>{description}</div>
        </div>
    )
}