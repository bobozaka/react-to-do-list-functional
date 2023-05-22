import React from 'react';
import { motion } from 'framer-motion';

const TaskItem = ({ task, onEdit, onDelete, onToggleComplete }) => {
  return (
    <motion.li
      className={`todo-item ${task.completed ? 'completed' : ''}`}
      layout
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}>
      <span>{task.text}</span>
      <div>
        <button onClick={onEdit}>Редактировать</button>
        <button onClick={onDelete}>Удалить</button>
        <button onClick={onToggleComplete}>{task.completed ? 'Восстановить' : 'Выполнено'}</button>
      </div>
    </motion.li>
  );
};

export default TaskItem;
