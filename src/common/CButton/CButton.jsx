
// eslint-disable-next-line react/prop-types
export const CButton = ({ className, title, emitFunction }) => {

    return (
        <div className={className} onClick={emitFunction} >
            {title}
        </div>
    )
}