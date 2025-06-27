import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isLogin } from '../feature/AuthSlice';
import AddEdditTask from '../components/AddEdditTask'
import Layout from './Layout'

function Addtaskpage() {
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
        <AddEdditTask/>
    </Layout>
  )
}

export default Addtaskpage