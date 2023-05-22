import React, { useState } from 'react';
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
  const [inputValue, setInputValue] = useState(task.text);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onUpdate();
    }
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
        <button onClick={onToggleComplete}>
          {task.completed ? 'Отметить как незавершенное' : 'Отметить как завершенное'}
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
