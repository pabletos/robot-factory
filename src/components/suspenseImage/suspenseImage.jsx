import React, { useState, useEffect } from 'react';
import './suspenseImage.css';

function SuspenseImage(props) {
    const [image, setImage] = useState(null);
    useEffect(() => {
        fetch(props.src)
        .then(response => response.blob())
        .then(response => {
            setImage(URL.createObjectURL(response));
        })
    }, [props.src])
    const placeHolder = props.placeHolder ? props.placeHolder : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="; 
    return (
        <img alt={props.alt} draggable={props.draggable} src={ image ? image : placeHolder }/>
    )
}

export default SuspenseImage;