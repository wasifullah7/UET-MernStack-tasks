import React from 'react'
const MAX_LENGTH = 40
const TodoList = ({todos,handleUpdate,handleDelete,editId,
setEditId,
editValue,
setEditValue,
setError}) => {
  return (
    <div>
       {todos.map((todo) => (
        <li
          key={todo._id}
          className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2"
        >
          {editId === todo._id ? (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="flex-1 px-2 py-1 border rounded mr-2"
            />
          ) : (
            <span className="flex-1">
              {todo.title.length > MAX_LENGTH
                ? todo.title.slice(0, MAX_LENGTH) + "..."
                : todo.title}
            </span>
          )}

          {editId === todo._id ? (
            <>
              <button
                onClick={() => handleUpdate(todo._id)}
                className="bg-green-500 text-white px-2 py-1 rounded mr-2"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditId(null);
                  setEditValue("");
                  setError("");
                }}
                className="bg-gray-400 text-white px-2 py-1 rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setEditId(todo._id);
                setEditValue(todo.title);
                setError("");
              }}
              className="text-blue-500 hover:underline mr-2"
            >
              Edit
            </button>
          )}

          <button
            onClick={() => handleDelete(todo._id)}
            className="text-red-500 hover:underline"
          >
            Delete
          </button>
        </li>
      ))}
    </div>
  )
}

export default TodoList
