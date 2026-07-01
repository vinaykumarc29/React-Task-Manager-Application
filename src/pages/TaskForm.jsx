import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import { useTask } from '../hooks/useTask';
import { useNavigate } from 'react-router';
import './TaskForm.css';

function TaskForm() {

  const {sortedTaskList , addTask , removeTask} = useTask();
  const navigate = useNavigate();


  let [title ,setTitle] = useState('');
  let [priority , setPriority] = useState('');
  let [status , setStatus] = useState('');

  let [errorMsg,setErrorMsg] = useState('');


  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(`form submitted`);

    if(title.trim() == `` || title.trim().length <3){
      setErrorMsg(`Title should have atleast 3 characters !!`);
      return;
    }

    if(!status  || !priority){
      setErrorMsg(`All fields must be filled !!`);
      return;
    }

    let taskExists = sortedTaskList.find((task)=>task.title == title);

    if(taskExists){
      setErrorMsg(`Task already exists !!`);
      return;
    }


    let task = {
      id: Math.floor(Math.random()*6000),
      title:title.trim(),
      priority:priority,
      status:status
    }

    addTask(task);

    setTitle(``);
    setPriority(``);
    setStatus(``);
    setErrorMsg(``);

    navigate('/tasks');
  }

  return (
    <>

    <Navbar/>    
    
   <div className="add-task-container">

    <div className="page-heading">
        <h1>Add New Task</h1>
        <p>Fill in the details to create a new task.</p>
    </div>

    {errorMsg && <p id='error-msg'>{errorMsg}</p>}    

    <form className="task-form" onSubmit={handleSubmit}>

        <div className="form-group">
            <label>Task Title</label>
            <input
                type="text"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                placeholder="Enter task title"
                maxLength={100}
            />
        </div>

        <div className="form-row">

            <div className="form-group">
                <label>Priority</label>
                <select value={priority} onChange={(e)=>setPriority(e.target.value)}>
                    <option value="">Select priority</option>
                    <option value="high" >High</option>
                    <option value="medium" >Medium</option>
                    <option value="low">Low</option>
                </select>
            </div>

            <div className="form-group">
                <label>Status</label>
                <select value={status} onChange={(e)=>setStatus(e.target.value)}>
                  <option value="">Select status</option>
                    <option value='pending'>Pending</option>
                    <option value='completed' >Completed</option>
                </select>
            </div>

        </div>

        {/* <div className="form-group">
            <label>Description (Optional)</label>
            <textarea
                rows="5"
                placeholder="Enter task description..."
                maxLength={200}
            ></textarea>
        </div> */}

        {/* <div className="form-group date-group">
            <label>Due Date (Optional)</label>
            <input type="date" />
        </div> */}

        <div className="button-group">
            <button type="button" className="cancel-btn">
                Cancel
            </button>

            <button type="submit" className="add-btn">
                Add Task
            </button>
        </div>

    </form>

</div>
    </>

  )
}

export default TaskForm ;
