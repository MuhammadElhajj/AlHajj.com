import { useState, useEffect } from 'react';
import Todo from '../../Components/Todo';
import { v4 as uuidv4 } from 'uuid';
import './NoteEditor.css';

function NoteEditor() {
  // Initialize state with localStorage data
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem('notes');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading notes:', error);
      return [];
    }
  });
  
  const [input, setInput] = useState('');

  // Save to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    setTodos(prev => [
      ...prev,
      {
        id: uuidv4(),
        text: trimmedInput,
        starred: false,
        completed: false,
        createdAt: new Date().toISOString()
      }
    ]);
    setInput('');
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const toggleStar = (id) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, starred: !todo.starred } : todo
    ));
  };

  return (
    <div className="note-editor">
      <h1>My Notes</h1>
      <form onSubmit={addTodo} className="note-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add new note..."
          aria-label="Add new note"
          maxLength={200}
        />
        <button 
          type="submit" 
          className="add-button"
          disabled={!input.trim()}
        >
          Add Note
        </button>
      </form>

      <div className="notes-container">
        {todos.map(todo => (
          <Todo
            key={todo.id}
            todo={todo}
            onDelete={deleteTodo}
            onToggleStar={toggleStar}
          />
        ))}
      </div>
    </div>
  );
}

export default NoteEditor;