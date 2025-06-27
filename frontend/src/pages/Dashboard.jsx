import { useEffect } from 'react'
import Layout from './Layout'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isLogin } from '../feature/AuthSlice';

function Dashboard() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isError} = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(isLogin());
    
  },[dispatch])
  useEffect(() =>{
    if(isError){
      navigate("/");
    }
  },[isError, navigate])
  return (
    <Layout>
        <h1>Hello</h1>
    </Layout>
  )
}

export default Dashboard