import {useState, useEffect, use} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { RegisterUser, reset } from '../feature/AuthSlice';

function Register() {

    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user, isSuccess, isError, isLoading, message} = useSelector((state) => state.auth)
    useEffect(() => {
        if(user || isSuccess){
            navigate("/");
        }
        return () => {
            dispatch(reset());}
    }, [user, isSuccess, navigate, dispatch]);

    const handleRegister = (event) =>{
        event.preventDefault();
        dispatch(RegisterUser({email, fullName, password, confirmPassword}))};


  return (
    <div className="hero is-fullheight is-fullwidth">
        <div className="hero-body">
            <div className='container'>
                <div className="columns is-centered">
                    <div className="column is-4">
                        
                        <form className="box" onSubmit={handleRegister}>

                            <h1 className='title is-1 has-text-centered'>Register</h1>
                            {isError && <p className='message is-danger'>{message}</p>}
                            <div className="field">
                                <label className="label"htmlFor="email">Email</label>
                                <div className="control">
                                    <input className="input"
                                           type="email"
                                           name="email"
                                           id="email"
                                           value={email}
                                           onChange={(event) => setEmail(event.target.value)}
                                           placeholder="example: @email.com"/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label"htmlFor="fullName">Full Name</label>
                                <div className="control">
                                    <input className="input"
                                           type="text"
                                           name="fullName"
                                           id="fullName"
                                           value={fullName}
                                           onChange={(event) => setFullName(event.target.value)}
                                           placeholder="example: @email.com"/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label"htmlFor="password">Password</label>
                                <div className="control">
                                    <input className="input"
                                           type="password"
                                           name="password"
                                           id="password"
                                           value={password}
                                           onChange={(event) => setPassword(event.target.value)}
                                           
                                           placeholder="******"/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label"htmlFor="confirmPassword">Confirm Password</label>
                                <div className="control">
                                    <input className="input"
                                           type="password"
                                           name="confirmPassword"
                                           id="confirmPassword"
                                           value={confirmPassword}
                                           onChange={(event) => setConfirmPassword(event.target.value)}
                                           
                                           placeholder="******"/>
                                </div>
                            </div>
                            
                            <div className="field mt-5">
                                <button className='button is-link is-fullwidth ' type='submit' >
                                    {isLoading ? "Loading..." : "Register"}
                                </button>
                            </div>
                            <hr/>
                            <div className="field mt-5">
                                <button className='button is-primary is-fullwidth ' onClick={() => navigate("/")}>
                                    Login
                                </button>
                            </div>
                         </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register