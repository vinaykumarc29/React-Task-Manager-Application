import React, { useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router'
import TaskItem from '../components/TaskItem'
import { useTask } from '../hooks/useTask'
import './Tasks.css';
import Loader from '../components/Loader'

function Tasks() {

  const { sortedTaskList, taskLoading } = useTask();
  let [status, setStatus] = useState('');
  let [search, setSearch] = useState('');

  const filterTask = useMemo(() => {
    if (status == '' && search == "") {
      return sortedTaskList;
    } else if (search.trim() != "" && status == "") {
      return sortedTaskList.filter((task) => {
        return task.title.toLowerCase().includes(search.toLowerCase());
      });
    } else if (search.trim() == "" && status != "") {
      return sortedTaskList.filter((task) => {
        return (task.status == status);
      })
    } else {
      return sortedTaskList.filter((task) => {
        return ((task.status == status) && task.title.toLowerCase().includes(search.toLowerCase()));
      });
    }
  }, [status, search, sortedTaskList]);

  const filteredTasks = filterTask;

  return (
    <div>
      <Navbar />

      <div className="container">
        <div className="heading-container">
          <h1>All Tasks</h1>
          <p>manage and organize your tasks.</p>
        </div>

        <div className="filter-conatiner">
          <input 
            type="text" 
            id='search-bar' 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            placeholder='Search your tasks..' 
          />
          
          <select name="task-status" value={status} onChange={(e) => setStatus(e.target.value)} id="task-status">
            <option value="">All tasks</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
          
          <Link to='/addtask'>
            <button>+Add Task</button>
          </Link>
        </div>

        <div className="task-container">
          {taskLoading ? <Loader /> :
            filteredTasks.length > 0 ?
              filteredTasks.map((task) => {
                return <TaskItem task={task} key={task.id} />
              }) : <p>No Tasks Found !!</p>}
        </div>
      </div>
    </div>
  )
}

export default Tasks;