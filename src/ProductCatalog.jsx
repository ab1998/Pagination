import React from "react"

export default function ProductCatalog({ thumbnail,title }) {

    return (
        <>
            <div className="imagecontent"><img src={thumbnail} /><span>{title}</span></div>
        </>
    )
}