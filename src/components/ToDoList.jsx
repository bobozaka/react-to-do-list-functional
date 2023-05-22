import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TaskItem from './TaskItem';
import styles from '../../styles/main.module.scss';

const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleEditTodo = (index) => {
    setEditIndex(index);
    setEditValue(todos[index].text);
  };

  const handleUpdateTodo = () => {
    if (editValue.trim() !== '') {
      const newTodos = [...todos];
      newTodos[editIndex].text = editValue;
      setTodos(newTodos);
      setEditIndex(-1);
      setEditValue('');
    }
  };

  const handleToggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleClearCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  const handleCompleteAll = () => {
    const newTodos = todos.map((todo) => ({
      ...todo,
      completed: true,
    }));
    setTodos(newTodos);
  };

  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className={styles.container}>
      <h1>To-Do List</h1>
      <div className={styles.addTask}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Введите задачу..."
        />
        <button onClick={handleAddTodo}>Добавить</button>
      </div>

      <h2>Активные задачи</h2>
      <AnimatePresence>
        <ul className={styles.taskList}>
          {activeTodos.map((todo, index) => (
            <TaskItem
              key={index}
              task={todo}
              onEdit={() => handleEditTodo(index)}
              onDelete={() => handleDeleteTodo(index)}
              onToggleComplete={() => handleToggleComplete(index)}
            />
          ))}
        </ul>
      </AnimatePresence>

      <h2>Выполненные задачи</h2>
      <AnimatePresence>
        <ul className={styles.taskList}>
          {completedTodos.map((todo, index) => (
            <TaskItem
              key={index}
              task={todo}
              onEdit={() => handleEditTodo(index)}
              onDelete={() => handleDeleteTodo(index)}
              onToggleComplete={() => handleToggleComplete(index)}
            />
          ))}
        </ul>
      </AnimatePresence>

      <div className={styles.taskActions}>
        {activeTodos.length > 0 && <button onClick={handleCompleteAll}>Завершить все</button>}
        {completedTodos.length > 0 && (
          <button onClick={handleClearCompleted}>Очистка завершена</button>
        )}
      </div>
    </div>
  );
};

export default ToDoList;
