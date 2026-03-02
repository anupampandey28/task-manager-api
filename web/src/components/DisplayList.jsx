import { useEffect, useState } from "react";
import dayjs from "dayjs";
import TodoCard from "./TodoCard";

const DisplayList = () => {

  const [todos, setTodos] = useState([]);
  const [currentTime, setCurrentTime] = useState(dayjs());
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const fetchTodos = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/todos`);
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsCreateOpen(false);
      setIsClosing(false);
    }, 200);
  };





  const deleteTask = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/todos/${id}`, {
        method: "DELETE",
      });
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const renameTask = async (todo) => {
    const newName = prompt("Enter new task name", todo.name);
    if (!newName) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/todos/${todo.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newName }),
        }
      );

      const updated = await res.json();
      setTodos((prev) =>
        prev.map((t) => (t.id === updated.id ? updated : t))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const toggleComplete = async (todo) => {
    if (todo.completed) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/todos/${todo.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ completed: true }),
        }
      );

      const updated = await res.json();
      setTodos((prev) =>
        prev.map((t) => (t.id === updated.id ? updated : t))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const remainingCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen w-screen from-gray-50 via-white to-gray-100 py-16 px-8 flex justify-center">

      <div className="w-full max-w-6xl bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-200 shadow-[0_40px_100px_rgba(0,0,0,0.08)] overflow-hidden">

        {/* Header */}
        <div className="px-12 py-8 flex justify-between items-center border-b border-gray-100">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900">
              Scheduled Tasks
            </h2>
            <p className="text-sm text-gray-500 mt-1 font-bold">
              {dayjs().format("DD MMMM YYYY - dddd - hh:mm A")} 
            </p>
          </div>
          <div className="text-2xl">
            
          </div>

          <div className="flex items-center gap-6">
            
            <div className="px-4 py-2 rounded-full bg-gray-100 text-xs text-gray-700">
              {remainingCount} Remaining • {completedCount} Completed
            </div>
             <button
             
              className="text-xs px-5 py-2.5 rounded-xl bg-purple-100 text-purple-700 font-medium hover:bg-purple-200 transition"
            >
              ✨ Generate with AI
            </button>
            

            <button
              onClick={() => setIsCreateOpen(true)}
              className="px-6 py-3 text-xs rounded-xl bg-orange-500 text-white font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              + Add Task
            </button>
             
          </div>
        </div>

        {/* Empty State */}
        {todos.length === 0 && (
          <div className="py-24 text-center text-gray-400">
            <div className="text-lg font-medium">No tasks scheduled</div>
            <p className="text-sm mt-2">Start by adding your first task.</p>
          </div>
        )}

        {/* Table */}
        {todos.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                <tr>
                  <th className="px-12 py-4 text-center w-16">Done</th>
                  <th className="px-12 py-4 text-left">Task</th>
                  <th className="px-12 py-4 text-left">Priority</th>
                  <th className="px-12 py-4 text-center">Remaining</th>
                  <th className="px-12 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {todos.map((todo) => {
                  const [sh, sm] = todo.start_time.split(":");
                  const [eh, em] = todo.end_time.split(":");

                  const start = dayjs().hour(+sh).minute(+sm).second(0);
                  const end = dayjs().hour(+eh).minute(+em).second(0);

                  let remainingSeconds = 0;
                  let isActive = false;
                  let isTimeOver = false;

                  if (currentTime.isAfter(end)) {
                    isTimeOver = true;
                  } else if (
                    currentTime.isAfter(start) &&
                    currentTime.isBefore(end)
                  ) {
                    isActive = true;
                    remainingSeconds = end.diff(currentTime, "second");
                  }

                  const hours = Math.floor(remainingSeconds / 3600);
                  const minutes = Math.floor((remainingSeconds % 3600) / 60);
                  const seconds = remainingSeconds % 60;
                  const pad = (n) => String(n).padStart(2, "0");

                  const priorityStyle =
                    todo.priority === "high"
                      ? "bg-red-50 text-red-600"
                      : todo.priority === "medium"
                      ? "bg-yellow-50 text-yellow-600"
                      : "bg-green-50 text-green-600";

                  return (
                    <tr
                      key={todo.id}
                      className={`border-b border-gray-100 transition-all duration-200 ${
                        isActive
                          ? "bg-green-50/50"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <td className="px-12 py-5 text-center">
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          disabled={todo.completed}
                          onChange={() => toggleComplete(todo)}
                          className="w-4 h-4 accent-green-500"
                        />
                      </td>

                      <td
                        className={`px-12 py-5 font-medium ${
                          todo.completed
                            ? "line-through text-gray-400"
                            : "text-gray-800"
                        }`}
                      >
                        {todo.name}
                      </td>

                      <td className="px-12 py-5">
                        <span
                          className={`px-3 py-1.5 rounded-full text-xs font-medium ${priorityStyle}`}
                        >
                          {todo.priority.toUpperCase()}
                        </span>
                      </td>

                      <td className="px-12 py-5 text-center">
                        {todo.completed ? (
                          <span className="text-gray-400">Completed</span>
                        ) : isTimeOver ? (
                          <span className="text-gray-400">Time Over</span>
                        ) : isActive ? (
                          <span className="font-semibold text-green-600 tabular-nums">
                            {pad(hours)}:{pad(minutes)}:{pad(seconds)}
                          </span>
                        ) : (
                          <span className="text-blue-500">Upcoming</span>
                        )}
                      </td>

                      <td className="px-12 py-5 text-center space-x-4">
                        <button
                          onClick={() => renameTask(todo)}
                          className="text-gray-500 hover:text-blue-600 transition"
                        >
                          ✏️
                        </button>

                        <button
                          onClick={() => deleteTask(todo.id)}
                          className="text-gray-500 hover:text-red-600 transition"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isCreateOpen && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`transition-all duration-200 ${
              isClosing
                ? "scale-95 opacity-0"
                : "scale-100 opacity-100"
            }`}
          >
            <TodoCard
              onSuccess={() => {
                closeModal();
                fetchTodos();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayList;