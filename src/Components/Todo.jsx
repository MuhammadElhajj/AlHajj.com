// Todo.js (no changes needed)
function Todo({ todo, onDelete, onToggleStar }) {
    return (
      <div className={`todo ${todo.starred ? 'starred' : ''}`}>
        <span>{todo.text}</span>
        <div className="actions">
          <button 
            onClick={() => onToggleStar(todo.id)}
            className={todo.starred ? 'starred' : ''}
          >
            ⭐
          </button>
          <button onClick={() => onDelete(todo.id)}>🗑️</button>
        </div>
      </div>
    );
  }
  
  export default Todo;