import React from "react";
import { Button, IconButton } from '@material-ui/core';
import TwitterIcon from '@mui/icons-material/Twitter';
import '../css/Footer.css';
import { Link } from "react-router-dom";

function Footer() {
    return(
        <div className='FooterContainer'>
          <footer className="Footer">
            <div className='Socials'>
                <IconButton href="https://twitter.com/Kevin_Bortas" className="TwitterButton">
                    <TwitterIcon style={{ color: '#1DA1F2', fontSize: 40 }}/>
                </IconButton>
            </div>
            <div className="Links">
                <Link to={"/"} style={{ textDecoration: 'none' }}>
                    <div className="Link">
                        <h4>Home &nbsp;&middot; &nbsp;</h4>
                    </div>
                </Link>
                <Link to={"/profile"} style={{ textDecoration: 'none' }}>
                    <div className="Link">
                        <h4>Profile &nbsp;&middot; &nbsp;</h4>
                    </div>
                </Link>
                <Link to={"/about"} style={{ textDecoration: 'none' }}>
                    <div className="Link">
                        <h4>About &nbsp;&middot; &nbsp;</h4>
                    </div>
                </Link>
                <Link to={"/contact"} style={{ textDecoration: 'none' }}>
                    <div className="Link">
                        <h4>Contact Us</h4>
                    </div>
                </Link>
            </div>
            <div className="Copyright">
                <p>&copy; 2022 GrapeVyn</p>
            </div>
          </footer>
        </div>
    );
}

export default Footer