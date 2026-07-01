import React, { createContext, useEffect, useMemo, useState } from 'react';
import { TaskContext } from './TaskContext';
import { useNavigate } from 'react-router';
function TaskProvider(props) {

  const { children } = props;
  let [taskList, setTaskList] = useState(JSON.parse(localStorage.getItem("taskList")) || []);

  const saveTasks = () => {
    localStorage.setItem('taskList', JSON.stringify(taskList));
  }

  const addTask = (task) => {
    setTaskList([...taskList, task]);
    console.log(`${task} added !!`);

  }

  const removeTask = (id) => {
    let updatedList = taskList.filter((task) => task.id != id);
    setTaskList(updatedList);
    console.log(`task removed !!`);
  }

  const updateTask = (id , status , priority)=>{
    let updatedList = taskList.map((task)=>{
      if(task.id == id){
        task.status = status;
        task.priority = priority;
      }
      return task
    });

    setTaskList(updatedList);
  }

  useEffect(() => {
    saveTasks();
    console.log(`local storage updated !!`);
  }, [taskList]);


  const statusOrder = {
      pending: 0,
      completed: 1,
    };
  
    const priorityOrder = {
      high: 3,
      medium: 2,
      low: 1,
    };
  
    const sortedTaskList = useMemo(()=>{

    return [...taskList].sort((a, b) => {
      if (statusOrder[a.status] != statusOrder[b.status]) {
        return statusOrder[a.status] - statusOrder[b.status];
      }
      return priorityOrder[b.priority] - priorityOrder[a.priority];
  
    });  

    },[taskList]);



  return (
    <div>
      <TaskContext.Provider value={{ sortedTaskList: sortedTaskList, addTask: addTask, removeTask: removeTask , updateTask:updateTask }} >
        {children}
      </TaskContext.Provider>

    </div>
  )
}

export default TaskProvider
