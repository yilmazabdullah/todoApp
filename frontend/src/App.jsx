import { useState, useEffect } from 'react';
import { todoService } from './services/api';
import { CheckCircle2, Circle, Trash2, PlusCircle, AlertCircle } from 'lucide-react';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const data = await todoService.getTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Bağlantı kurulamadı. Backend servisinin ayakta olduğuna emin olun.");
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    try {
      const added = await todoService.createTodo({ title: newTitle });
      setTodos([...todos, added]);
      setNewTitle('');
    } catch (err) {
      console.error(err);
    }
  };

  const toggleComplete = async (todo) => {
    try {
      const updated = await todoService.updateTodo(todo.id, {
        title: todo.title,
        completed: !todo.completed
      });
      setTodos(todos.map(t => t.id === todo.id ? updated : t));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await todoService.deleteTodo(id);
      setTodos(todos.filter(t => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-8 border-b border-gray-200/50 bg-white/50">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">Todo Kategorisi</h1>
            <p className="text-gray-500">Bugün neler yapacaksın?</p>
          </div>
          
          <div className="p-6">
            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-center">
                <AlertCircle className="text-red-500 mr-3" />
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleAddTodo} className="mb-8 relative shadow-sm rounded-lg">
              <input
                type="text"
                className="w-full pl-5 pr-14 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all text-lg"
                placeholder="Yeni bir görev ekle..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute right-2 top-2 bottom-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center justify-center p-3"
              >
                <PlusCircle size={24} />
              </button>
            </form>

            <div className="space-y-3">
              {todos.length === 0 && !error ? (
                <div className="text-center py-10">
                  <p className="text-gray-500 text-lg">Hadi bir şeyler ekle, liste bomboş! 🎉</p>
                </div>
              ) : (
                todos.map(todo => (
                  <div 
                    key={todo.id} 
                    className={`todo-item group flex items-center p-4 bg-white border border-gray-100 rounded-xl ${todo.completed ? 'opacity-70 bg-gray-50' : ''}`}
                  >
                    <button 
                      onClick={() => toggleComplete(todo)}
                      className="mr-4 text-gray-400 hover:text-indigo-600 transition-colors focus:outline-none"
                    >
                      {todo.completed ? (
                        <CheckCircle2 className="text-green-500" size={28} />
                      ) : (
                        <Circle size={28} />
                      )}
                    </button>
                    
                    <span className={`text-lg flex-1 transition-all ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700 font-medium'}`}>
                      {todo.title}
                    </span>

                    <button 
                      onClick={() => deleteTodo(todo.id)}
                      className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-all focus:outline-none focus:opacity-100 p-2"
                    >
                      <Trash2 size={22} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
