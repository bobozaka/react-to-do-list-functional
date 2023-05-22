import React from 'react';
import { motion } from 'framer-motion';
import styles from '../../styles/main.module.scss';

const TaskItem = ({
  task,
  editMode,
  editValue,
  onEdit,
  onUpdate,
  onDelete,
  onToggleComplete,
  onEditInputChange,
}) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onUpdate();
    }
  };

  const handleToggleComplete = () => {
    onToggleComplete();
  };

  return (
    <li className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}>
      {editMode ? (
        <input
          type="text"
          value={editValue}
          onChange={onEditInputChange}
          onKeyDown={handleKeyPress}
          autoFocus
        />
      ) : (
        <div className={styles.taskText}>{task.text}</div>
      )}

      <div className={styles.taskActions}>
        {!editMode && (
          <>
            <button onClick={onEdit}>Редактировать</button>
            <button onClick={onDelete}>Удалить</button>
          </>
        )}
        <button onClick={handleToggleComplete}>
          {task.completed ? 'Отметить как незавершенное' : 'Отметить как завершенное'}
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
