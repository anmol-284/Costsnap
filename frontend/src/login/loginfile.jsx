 import React, { useState } from "react";
 import * as Components from './Components';
 import axios from 'axios';

 function App() {
     const [signIn, toggle] = React.useState(true);

     const [signUpData, setData] = useState({
        firstname:"",
        lastname:"",
        username:"",
        email:"",
        password:"",
     });

     let submit = async(e) => {
        e.preventDefault()

        try {
            const response = await axios.post ("http://localhost:8000/api/v1/usersignup", {signUpData});
            console.log(response.data);
        }
        
        catch(error) {
            console.log("Error in submitting Form:", error);

            if (error.response) {
                console.error('Response Data:', error.response.data);
                console.error('Response Status:', error.response.status);
              } else if (error.request) {
                // The request was made, but no response was received
                console.error('No response received. Request:', error.request);
              } else {
                // Something happened in setting up the request that triggered an error
                console.error('Error during request setup:', error.message);
              }
        }
     }

      return(
          <Components.Container>
              <Components.SignUpContainer signinIn={signIn}>
                  <Components.Form onSubmit={submit}>
                      <Components.Title>Create Account</Components.Title>
                      <Components.Input type='text' placeholder='First name' onChange={(e) => setData({ ...signUpData, field1: e.target.value })}/>
                      <Components.Input type='text' placeholder='Last name' onChange={(e) => setData({ ...signUpData, field2: e.target.value })}/>
                      <Components.Input type='text' placeholder='User name' onChange={(e) => setData({ ...signUpData, field3: e.target.value })}/>
                      <Components.Input type='email' placeholder='Email' onChange={(e) => setData({ ...signUpData, field4: e.target.value })}/>
                      <Components.Input type='password' placeholder='Password' onChange={(e) => setData({ ...signUpData, field5: e.target.value })}/>
                      <Components.Button type="submit" onClick={submit} value="Submit" >Sign Up</Components.Button>
                  </Components.Form>
              </Components.SignUpContainer>

              <Components.SignInContainer signinIn={signIn}>
                   <Components.Form>
                       <Components.Title>Sign in</Components.Title>
                       <Components.Input type='email' placeholder='Email' />
                       <Components.Input type='password' placeholder='Password' />
                       <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
                       <Components.Button>Sign In</Components.Button>
                   </Components.Form>
              </Components.SignInContainer>

              <Components.OverlayContainer signinIn={signIn}>
                  <Components.Overlay signinIn={signIn}>

                  <Components.LeftOverlayPanel signinIn={signIn}>
                      <Components.Title>Welcome Back!</Components.Title>
                      <Components.Paragraph>
                          To keep connected with us please login with your personal info
                      </Components.Paragraph>
                      <Components.GhostButton onClick={() => toggle(true)}>
                          Sign In
                      </Components.GhostButton>
                      </Components.LeftOverlayPanel>

                      <Components.RightOverlayPanel signinIn={signIn}>
                        <Components.Title>Hello, Friend!</Components.Title>
                        <Components.Paragraph>
                            Enter Your personal details and start tracking your expenses with us.
                        </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(false)}>
                                Sign Up
                            </Components.GhostButton> 
                      </Components.RightOverlayPanel>
  
                  </Components.Overlay>
              </Components.OverlayContainer>

          </Components.Container>
      )
 }

 export default App;