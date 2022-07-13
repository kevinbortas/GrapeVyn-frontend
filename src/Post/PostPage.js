import 'Home/App.css';
import React from 'react';
import { Provider } from 'react-redux';
import { menuSelected } from "redux/actions";
import navBarStore from 'redux/navBarStore';
import Navbar from 'Navbar/Navbar';
import Footer from 'footer/Footer';
import PostPageContainer from './PostPageContainer';

function PostPage() {
    let className = ["nav-links", "nav-links", "nav-links"];
    navBarStore.dispatch(menuSelected(className, 4, ""));

    return (
      <div>
          <Provider store={navBarStore}>
            <Navbar/>
          </Provider>
          <div className="App">
              <PostPageContainer/>
          </div>
          <Footer/>
        </div>
      );
}

export default PostPage;