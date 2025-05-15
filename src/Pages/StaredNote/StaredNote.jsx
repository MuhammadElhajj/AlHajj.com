import { useState, useEffect } from 'react';
import Todo from '../../Components/Todo';

function StarredNotes() {
  const [starredTodos, setStarredTodos] = useState([]);
  const [allTodos, setAllTodos] = useState([]);

  // Load todos from localStorage and filter starred
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('notes')) || [];
    setAllTodos(savedTodos);
    setStarredTodos(savedTodos.filter(todo => todo.starred));
  }, []);

  // Listen for storage changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'notes') {
        const updatedTodos = JSON.parse(e.newValue);
        setAllTodos(updatedTodos);
        setStarredTodos(updatedTodos.filter(todo => todo.starred));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleToggleStar = (id) => {
    const updatedTodos = allTodos.map(todo => 
      todo.id === id ? { ...todo, starred: !todo.starred } : todo
    );
    
    // Update both local state and localStorage
    localStorage.setItem('notes', JSON.stringify(updatedTodos));
    setAllTodos(updatedTodos);
    setStarredTodos(updatedTodos.filter(todo => todo.starred));
  };

  const handleDelete = (id) => {
    const updatedTodos = allTodos.filter(todo => todo.id !== id);
    
    // Update both local state and localStorage
    localStorage.setItem('notes', JSON.stringify(updatedTodos));
    setAllTodos(updatedTodos);
    setStarredTodos(updatedTodos.filter(todo => todo.starred));
  };

  return (
    <div className="starred-todos">
      <h1>Starred Notes</h1>
      <div className="todos">
        {starredTodos.map(todo => (
          <Todo
            key={todo.id}
            todo={todo}
            onDelete={() => handleDelete(todo.id)}
            onToggleStar={() => handleToggleStar(todo.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default StarredNotes;