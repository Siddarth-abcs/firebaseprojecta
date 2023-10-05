import React from 'react';
import { useDispatch } from "react-redux"; 
import { signInUser } from '../../redux/actionCreators/authActionCreator';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Loginform.css'



const LoginForm = () => {

    const [email, setEmail] = React.useState("");
    const [Password, setPassword] = React.useState("");
    const [success, setSuccess] = React.useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSumit = (e) => {
        e.preventDefault();
        if(!email || !Password) {
            alert("please fill all fields")
            return;
        }
    dispatch(signInUser(email,Password, setSuccess ));
    }

    React.useEffect(() =>{
        if(success){
            navigate("/dashboard")
        }
    },[success])


    return (
        <div class="container-loginform">
	<div class="screen">
		<div class="screen__content">
			<form class="login" autoComplete='off' onSubmit={handleSumit}>
				<div class="login__field">
					<i class="login__icon fas fa-user"></i>
					<input type="text" class="login__input" name='email' 
                            placeholder="User name / Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                    />
				</div>
				<div class="login__field">
					<i class="login__icon fas fa-lock"></i>
					<input type="password" class="login__input" placeholder="Password" 
                        name='password'
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
				</div>
				<button class="button login__submit" type='submit'>
					<span class="button__text">Log In Now</span>
					<i class="button__icon fas fa-chevron-right"></i>
				</button>				
			</form>
			<div class="social-login">
				<h3>log in via</h3>
				<div class="social-icons">
					<a href="#" class="social-login__icon fab fa-instagram"></a>
					<a href="#" class="social-login__icon fab fa-facebook"></a>
					<a href="#" class="social-login__icon fab fa-twitter"></a>
				</div>
			</div>
		</div>
		<div class="screen__background">
			<span class="screen__background__shape screen__background__shape4"></span>
			<span class="screen__background__shape screen__background__shape3"></span>		
			<span class="screen__background__shape screen__background__shape2"></span>
			<span class="screen__background__shape screen__background__shape1"></span>
		</div>		
	</div>
</div>
  )
}

export default LoginForm;
