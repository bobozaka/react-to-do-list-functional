import React, { useEffect, useState } from 'react';
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
      const newTodo = {
        id: Date.now(), // Добавляем уникальный идентификатор
        text: inputValue,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const handleDeleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleEditTodo = (id) => {
    const index = todos.findIndex((todo) => todo.id === id);
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

  const handleToggleComplete = (id) => {
    const newTodos = [...todos];
    const index = newTodos.findIndex((todo) => todo.id === id);
    newTodos[index] = {
      ...newTodos[index],
      completed: !newTodos[index].completed,
    };
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
      <h1>Список дел</h1>
      <div className={styles.addTask}>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button onClick={handleAddTodo}>Добавить</button>
      </div>

      <h2>Активные задачи</h2>
      <AnimatePresence>
        <ul className={styles.taskList}>
          {activeTodos.map((todo) => (
            <TaskItem
              key={todo.id}
              task={todo}
              editMode={editIndex === todo.id}
              editValue={editValue}
              onEdit={() => handleEditTodo(todo.id)}
              onUpdate={handleUpdateTodo}
              onDelete={() => handleDeleteTodo(todo.id)}
              onToggleComplete={() => handleToggleComplete(todo.id)}
              onEditInputChange={(e) => setEditValue(e.target.value)}
            />
          ))}
        </ul>
      </AnimatePresence>

      <h2>Завершенные задачи</h2>
      <AnimatePresence>
        <ul className={styles.taskList}>
          {completedTodos.map((todo) => (
            <TaskItem
              key={todo.id}
              task={todo}
              editMode={editIndex === todo.id}
              editValue={editValue}
              onEdit={() => handleEditTodo(todo.id)}
              onUpdate={handleUpdateTodo}
              onDelete={() => handleDeleteTodo(todo.id)}
              onToggleComplete={() => handleToggleComplete(todo.id)}
              onEditInputChange={(e) => setEditValue(e.target.value)}
            />
          ))}
        </ul>
      </AnimatePresence>

      {completedTodos.length > 0 && (
        <button className={styles.clearButton} onClick={handleClearCompleted}>
          Очистить завершенные
        </button>
      )}

      {activeTodos.length > 0 && (
        <button className={styles.completeAllButton} onClick={handleCompleteAll}>
          Завершить все
        </button>
      )}
    </div>
  );
};

export default ToDoList;
