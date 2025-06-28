import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getTasks, reset} from '../feature/TaskSlice.js';
function Showtask() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {tasks, isSuccess, isError, isLoading, message} = useSelector((state) => state.task)
    useEffect(() => {
        dispatch(getTasks());
        return () => {
            dispatch(reset());}
    }, []);

  return (
    <div>
        <table className='table is-fullwidth is-striped is-hoverable'>
            <thead>
                <tr>
                    <th>Title</th>
                   
                    <th>Do Date</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task) =>(
                    <tr key={task.id}>
                        <td>{task.title}</td>
                        <td>{task.do_date}</td>
                        <td>{task.id_done?"Finished":"Unfinish"}</td>

                    </tr>
                ))}
            </tbody>

        </table>
        
    </div>
  )
}

export default Showtask