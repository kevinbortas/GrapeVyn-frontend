import 'Home/App.css';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { useParams } from 'react-router-dom';
import { menuSelected } from "redux/actions";
import navBarStore from 'redux/navBarStore';
import Navbar from 'Navbar/Navbar';
import Footer from 'footer/Footer';
import { getTokenById } from 'APIController/APIHandler';
import Post from './PostComponent';

function PostPage() {
    let className = ["nav-links", "nav-links", "nav-links"];
    navBarStore.dispatch(menuSelected(className, 4, ""));

    const { id } = useParams()
    const [postParams, setPostParams] = useState([]);

    getTokenById(id)
    .then((response) => {
        setPostParams(response);
    })

    return (
      <div>
          <Provider store={navBarStore}>
            <Navbar/>
          </Provider>
          <div className="App">
            {postParams.map((item, index) => <Post text={item.message} blockId={item.blockId} timestamp={item.timestamp} owner={item.owner} key={index} selectable={true} expandable={false}/>)}
          </div>
          <Footer/>
        </div>
      );
}

export default PostPage;