import 'About/AboutComponent.css';
import React from 'react';
import TERMS_AND_CONDITIONS from 'docs/GrapeVyn_Terms_and_Conditions.pdf'

function AboutComponent() {
    return (
        <div className="AboutComponent">
            <h2>This is GrapeVyn!</h2>
            <h3>GrapeVyn is a social media platform built on the Ethereum Blockchain that gives users ownership to their words and stories.</h3>
            <h3>Users can turn their text into NFTs (Non-Fungible Tokens) which can be viewed on the GrapeVyn by everyone on the webpage.</h3>
            <h3>Once you have posted, you claim ownership of that post and its contents, which cannot be changed or deleted, so be careful what you post ;)</h3>
            <h2>How Does it Work?</h2>
            <h3>1. Connect a wallet using Metamask.<br/>
                2. Write something in the post section.<br/>
                3. Once you are happy with your post, click the Post button.<br/>
                4. Immutable X will be prompted. You must sign to proceed.<br/>
                5. Your post has been added to the GrapeVyn. Refresh the page to view it!
            </h3>
            <h3>In order to use GrapeVyn, you must agree to the terms and conditions below.</h3>
            <a href={TERMS_AND_CONDITIONS} target="_blank">Terms and conditions</a>
        </div>
      );
}

export default AboutComponent;