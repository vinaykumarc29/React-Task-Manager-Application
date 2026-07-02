import React, { createContext, useEffect, useMemo, useState } from 'react';
import { TaskContext } from './TaskContext';
import { useNavigate } from 'react-router';
import { supabase } from '../service/supabase';
import { useAuth } from '../hooks/useAuth';
function TaskProvider(props) {

  const { children } = props;
  const { user } = useAuth();
  let [taskList, setTaskList] = useState([]);
  let [taskLoading , setTaskLoading] = useState(true);


  const fetchTasks = async () => {
    setTaskLoading(true);
      const { data, error } = await supabase.from('tasks').select('*').eq('user_id', user.id);
      if (error) {
        console.log(error)
      }
      console.log(data);
      setTaskList(data);
      setTaskLoading(false);
    }

  useEffect(() => {

    if (!user) {
      console.log(`user is null`);
      return;
    }
    fetchTasks();
  }, [user]);



  const addTask = async (task) => {
    
    // console.log(task);
    const { error } = await supabase.from('tasks').insert(task);
    if (error) throw error;
    await fetchTasks();
    console.log(`task added !!`);

  }

  const removeTask = async(id) => {
    const {error} = await supabase.from('tasks').delete().eq('id',id);
    if(error) console.log(error);
    await fetchTasks(); 
    console.log(`task removed !!`);
  }

  const updateTask = async(id, status, priority) => {
    setTaskLoading(true);
    const {error} = await supabase.from('tasks').update({status:status,priority:priority}).eq('id',id);
    if(error) console.log(error);
    await fetchTasks();
    console.log(`Task updated !!`);
  }

  const statusOrder = {
    pending: 0,
    completed: 1,
  };

  const priorityOrder = {
    high: 3,
    medium: 2,
    low: 1,
  };

  const sortedTaskList = useMemo(() => {

    return [...taskList].sort((a, b) => {
      if (statusOrder[a.status] != statusOrder[b.status]) {
        return statusOrder[a.status] - statusOrder[b.status];
      }
      return priorityOrder[b.priority] - priorityOrder[a.priority];

    });

  }, [taskList]);



  return (
    <div>
      <TaskContext.Provider value={{ sortedTaskList: sortedTaskList, taskLoading:taskLoading, addTask: addTask, removeTask: removeTask, updateTask: updateTask }} >
        {children}
      </TaskContext.Provider>

    </div>
  )
}

export default TaskProvider
