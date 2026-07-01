import { useState } from "react";
import "./TaskItem.css";
import { useTask } from "../hooks/useTask";

function TaskItem(props) {
  const [showMenu, setShowMenu] = useState(false);
  const {removeTask ,updateTask} = useTask();

  const { id, title, priority , status} = props.task ;
  // console.log(props);

  return (
    <div className="task-card" onClick={()=>setShowMenu(!showMenu)}>
      <div className="task-info">
        <div>
          <h3>{title}</h3>

          <div className="task-meta">
            <span className={`priority ${priority}`}>{priority}</span>
            <span className={`status ${status}`}>{status}</span>
          </div>

        </div>

        <div className="menu-container">
          <button
            className="menu-btn"
            onClick={() => setShowMenu(!showMenu)}
          >
            ⋮
          </button>

          {showMenu && (
            <div className="dropdown-menu">
              <button disabled={status == `completed`} onClick={()=>{updateTask(id ,`completed`,priority)}}>Mark as Completed</button>
              <button disabled={status == `pending`} onClick={()=>{updateTask(id ,`pending`,priority)}} >Mark as Pending</button>

              <hr />

              <button disabled={priority == `high`} onClick={()=>{updateTask(id ,status,`high`)}}>High Priority</button>
              <button disabled={priority == `medium`} onClick={()=>{updateTask(id ,status,`medium`)}}>Medium Priority</button>
              <button disabled={priority == `low`} onClick={()=>{updateTask(id ,status,`low`)}}>Low Priority</button>

              <hr />

              <button className="delete" onClick={()=>{removeTask(id)}}>Delete Task</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskItem;