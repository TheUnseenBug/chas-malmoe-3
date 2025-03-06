import {
    FacebookLoginButton,
    GoogleLoginButton,
    AppleLoginButton,
  } from "react-social-login-buttons";
  
  export default function SocialIcons() {
    function handleClick() {
      alert("Thank you for using React Social Login Buttons!");
    }
  
    return (
      <div>
        <FacebookLoginButton onClick={handleClick} />
        <GoogleLoginButton onClick={handleClick} />
        <AppleLoginButton onClick={handleClick} />
      </div>
    );
  }