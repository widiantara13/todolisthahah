import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { LoginUser, reset} from '../feature/AuthSlice.js';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user, isSuccess, isError, isLoading, message} = useSelector((state) => state.auth)

    useEffect(() => {
        if(user || isSuccess){
            navigate("/dashboard");
        }
        return () => {
            dispatch(reset());}
    }, [user, isSuccess, navigate, dispatch]);

    const handleLogin = (event) =>{
        event.preventDefault();
        dispatch(LoginUser({email, password}))
    };
  return (
    <div className="hero is-fullheight is-fullwidth">
        <div className="hero-body">
            <div className='container'>
                <div className="columns is-centered">
                    <div className="column is-4">
                        
                        <form className="box" onSubmit={handleLogin}>

                            <h1 className='title is-1 has-text-centered'>Login</h1>
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
                                           placeholder="example: @email.com"
                                           required/>
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
                                           
                                           placeholder="******"
                                           required/>
                                </div>
                            </div>
                            <div className="field mt-5">
                                <button className='button is-primary is-fullwidth ' type="submit"  >
                                    {isLoading ? "Loading..." : "Login"}
                                </button>
                            </div>
                            <hr/>
                            <div className="field mt-5">
                                <button className='button is-link is-fullwidth ' onClick={() => navigate("/register")}>
                                    Register
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

export default Login