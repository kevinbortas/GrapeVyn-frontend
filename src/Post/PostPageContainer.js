import 'Post/PostPageContainer.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTokenById } from 'APIController/APIHandler';
import Post from 'Post/PostComponent';
import PostMetadata from 'Post/PostMetadata'

function PostPageContainer() {
    const { id } = useParams()
    const [postParams, setPostParams] = useState([]);

    useEffect(() => {
        getTokenById(id)
        .then((response) => {
            setPostParams(response);
        })
    }, [])

    return (
        <div className="PostPageContainer">
            <div className="row">
                <div className="column left">
                    {postParams.map((item, index) => <Post text={item.message} blockId={item.blockId} timestamp={item.timestamp} owner={item.owner} key={index} selectable={true} expandable={false}/>)}
                    <h2 style={{ paddingTop: "20px" }}>Coming soon...</h2>
                </div>
                <div className="column right">
                    <PostMetadata id={id}/>
                </div>
            </div>
        </div>
      );
}

export default PostPageContainer;