import 'Home/App.css';
import 'contact-us/Form.css';
import React, {useState} from 'react';
import grapeLogo from 'icons/GrapeLogo_Color_Alpha45.png';
import { Provider } from 'react-redux';
import { menuSelected } from 'redux/actions.js';
import Navbar from 'Navbar/Navbar';
import navBarStore from 'redux/navBarStore';
import { Button } from '@material-ui/core';
import { send } from 'emailjs-com';
import check from 'icons/check.png';
import Footer from 'footer/Footer';

function Contact() {
  let className = ["nav-links", "nav-links", "nav-links-clicked",];
  navBarStore.dispatch(menuSelected(className, 2, ""));

  const [inputs, setInputs] = useState({});
  const [emailSent, setEmailSent] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    send(
      'service_d5xtrws',
      'template_10cf09p',
      inputs,
      'SXeYLYAMTuW-_3WJq'
    )
      .then((response) => {
        setInputs({});
        setEmailSent(true);
      })
      .catch((err) => {
        console.log('FAILED...', err);
      });
  }


  return (
    <div>
        <Provider store={navBarStore}>
              <Navbar/>
        </Provider>
      <div className='App'>
        <div className='FormContainer'>
          <div className='Form'>
                <div className="Title">
                  <img src={grapeLogo} className="TitleLogo"/>
                  <h1 className="TitleName">
                      GrapeVyn
                  </h1>
                </div>
                {emailSent
                  ? <div className='EmailSent'>
                      <img src={check} className="confirmed"/>
                      <h2>Your email has been submitted</h2>
                  </div>
                  : 
                  <form className='FormBody' onSubmit={handleSubmit}>

                      <label type="text" className='NameLabel' required="required">Name</label>
                      <input placeholder='Enter name' className='NameInput' name="from_name"  value={inputs.from_name || ""} onChange={handleChange} required />

                      <label type="text" className='EmailLabel'>Email</label>
                      <input placeholder='example@gmail.com' className='EmailInput' name="reply_to"  value={inputs.reply_to || ""} onChange={handleChange} required/>

                      <label type="text" className='SubjectLabel'>Subject</label>
                      <input placeholder='Enter subject' className='SubjectInput' name="from_subject"  value={inputs.from_subject || ""} onChange={handleChange} required/>

                      <label type="text" className='MessageLabel'>Message</label>
                      <textarea type="text" className='MessageInput' name="message"  value={inputs.message || ""} onChange={handleChange} required/>
                      <Button type="submit" className='SubmitButton'>Submit</Button>
                  </form>
                  }
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Contact;
