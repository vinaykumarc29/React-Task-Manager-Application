import React, { useMemo } from 'react';
import Navbar from '../components/Navbar';
import TaskItem from '../components/TaskItem';
import './Dashboard.css';
import { Link } from 'react-router';
import { useTask } from '../hooks/useTask';
import { useAuth } from '../hooks/useAuth';
import Loader from '../components/Loader';


function Dashboard() {

  const { sortedTaskList ,taskLoading } = useTask();
  const { user } = useAuth();

  const getTaskCount = (status) => {
    if (status == 'all') return sortedTaskList.length;
    if (status == 'complete') {
      return sortedTaskList.filter((task) => task.status == status).length;
    } else {
      return sortedTaskList.filter((task) => task.status == status).length;
    }
  }


  return (
    <div>
      <Navbar />

      <div className="dashboard-container">
        <h1>Welcome, {user.user_metadata.display_name}👋 </h1>
        <p className="dashboard-subtitle">
          Here is the detailed information of your tasks.
        </p>


        <Link to='/tasks'>
          <div className="task-stats-container">
            <div className="stats-card" id="total-task">
              <p>Total Tasks</p>
              <h2>{getTaskCount("all")}</h2>
            </div>

            <div className="stats-card" id="completed-task">
              <p>Completed Tasks</p>
              <h2>{getTaskCount("completed")}</h2>
            </div>

            <div className="stats-card" id="pending-task">
              <p>Pending Tasks</p>
              <h2>{getTaskCount("pending")}</h2>
            </div>
          </div>
        </Link>


        <div className="recent-tasks-container">

          {taskLoading ? <Loader /> :
            sortedTaskList.length > 0 ?
              <>
                <h2>Recent Tasks</h2>
                {sortedTaskList.slice(0, 3).map((task) => {
                  return <TaskItem task={task} key={task.id} />
                })}      
                <hr />
                <Link to="/tasks" className="view-all-btn">
                  View all tasks →
                </Link>
              </> :
              <h1>No Tasks Found !!</h1>
          }




        </div>
      </div>
    </div>
  )
}

export default Dashboard
