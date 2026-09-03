import { createContext, useContext, useMemo, useState } from 'react';

import { MY_TASKS } from '@/constants/mock-tasks';

const TasksContext = createContext(null);

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState(MY_TASKS);

  const value = useMemo(
    () => ({
      tasks,
      toggleTask(id) {
        setTasks((current) =>
          current.map((task) => (task.id === id ? { ...task, done: !task.done } : task)),
        );
      },
      addTask(task) {
        setTasks((current) => [
          {
            id: `t-${Date.now()}`,
            done: false,
            ...task,
          },
          ...current,
        ]);
      },
    }),
    [tasks],
  );

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks precisa estar dentro de TasksProvider');
  }
  return context;
}
