

import "./RedirectButton.css"

// eslint-disable-next-line react/prop-types 
export const redirectButton = ({ className, title, emitFunction }) => {

    return (
        <div className={className} onClick={emitFunction} >
            {title}
        </div>
    )
}
