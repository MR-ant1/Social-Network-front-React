

import "./LikeButton..css"
// eslint-disable-next-line react/prop-types
export const Heart = ({className, title, emitFunction }) => {

    return (
        <div className={className} onClick={emitFunction}>
            {title}
        </div>
    )
}