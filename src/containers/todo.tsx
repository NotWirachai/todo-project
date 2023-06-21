import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import MyModal from "../components/todo-modal";
import { useMst } from "../stores/root-stores";
import CancelButton from "../components/cancle-button";
import moment from "moment";
import { FaTrashAlt } from "react-icons/fa";
interface TodoListProps {}
interface Todo {
  _id: number | string;
  title: string;
  description: string;
  user_id?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

const TodoList: React.FC<TodoListProps> = observer(() => {
  const { todoStore } = useMst();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  const [editTodo, setEditTodo] = useState({ _id: null, title: "", description: "" });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTodoById, setDeleteTodoById] = useState<Todo | null>();

  useEffect(() => {
    todoStore.getAllTodos();
  }, []);

  useEffect(() => {
    const todos = JSON.parse(JSON.stringify(todoStore.todos));
    if (todos?.length) {
      setTodos(todos);
    }
  }, [JSON.stringify(todoStore.todos)]);

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const openEditModal = (todo) => {
    todoStore.getTodoById({ _id: todo?._id }).then((res) => {
      if (res?._id) setEditTodo(res);
    });

    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setEditTodo({ _id: null, title: "", description: "" });
    setIsEditModalOpen(false);
  };

  const openDeleteModal = (data: Todo) => {
    setDeleteTodoById(data);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setDeleteTodoById(null);
    setIsDeleteModalOpen(false);
  };

  const handleNewTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo({ ...newTodo, [e.target.name]: e.target.value });
  };

  const handleEditTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTodo({ ...editTodo, [e.target.name]: e.target.value });
  };

  const handleNewTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTodo.title === "" || newTodo.description === "") return;
    else
      todoStore.createTodo(newTodo).then((res) => {
        if (res === "SUCCESS") todoStore.getAllTodos();
      });
    // success or fail ปิด modal ทุกกรณี
    setNewTodo({ title: "", description: "" });
    closeCreateModal();
  };

  const handleEditTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editTodo.title === "" || editTodo.description === "") return;
    else
      todoStore.updateTodo(editTodo).then((res) => {
        if (res === "SUCCESS") todoStore.getAllTodos();
      });
    // success or fail ปิด modal ทุกกรณี
    closeEditModal();
  };

  const handleDeleteTodo = () => {
    if (deleteTodoById === null) return;
    else
      todoStore.deleteTodoById(deleteTodoById).then((res) => {
        if (res === "SUCCESS") todoStore.getAllTodos();
      });
    // success or fail ปิด modal ทุกกรณี
    closeDeleteModal();
  };

  return (
    <div className="flex items-center justify-center h-screen w-full bg-gray-100">
      <form className="max-w-[480px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg shadow-lg shadow-gray-950" style={{ height: "90vh" }}>
        <div style={{ height: "80vh", display: "flex", flexDirection: "column" }}>
          <h2 className="text-4xl dark: text-gray-400 font-bold text-center" style={{ marginBottom: "1.5rem" }}>
            Todo List
          </h2>
          <ul className="text-gray-400 flex-grow overflow-auto">
            {todos?.length > 0 &&
              todos.map((todo) => (
                <li
                  key={todo._id}
                  className="grid grid-cols-1 max-w-[480px] w-full mx-auto bg-gray-200 rounded-lg shadow-lg shadow-gray-950"
                  style={{ marginBottom: 12, padding: "12px 18px" }}
                >
                  <div className="flex justify-between">
                    <div
                      style={{
                        cursor: "pointer",
                        width: "calc(100% - 80px)",
                        overflowWrap: "break-word",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                      onClick={() => openEditModal(todo)}
                    >
                      <p className="font-bold">{todo.title}</p>
                      <p>{todo.description}</p>
                    </div>
                    <button type="button" onClick={() => openDeleteModal(todo)}>
                      <FaTrashAlt style={{ color: "red" }} />
                    </button>
                  </div>
                  <p style={{ alignSelf: "end", fontSize: "0.75rem", textAlign: "right" }}>{todo.updatedAt}</p>
                </li>
              ))}
          </ul>
          <button
            type="button"
            onClick={openCreateModal}
            className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create
          </button>
        </div>
      </form>

      <MyModal isOpen={isCreateModalOpen} title="New Todo">
        <form className="w-full" onSubmit={handleNewTodo}>
          <div className="flex flex-col text-gray-400 py-2">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newTodo.title}
              onChange={handleNewTodoChange}
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={newTodo.description}
              onChange={handleNewTodoChange}
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
            />
            <div style={{ display: "flex", flexDirection: "row" }}>
              <CancelButton onRequestClose={closeCreateModal}></CancelButton>
              <button
                type="submit"
                className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </MyModal>

      <MyModal isOpen={isEditModalOpen} title={`Edit ${editTodo?.title}`}>
        <form className="w-full" onSubmit={handleEditTodo}>
          <div className="flex flex-col text-gray-400 py-2">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={editTodo.title}
              onChange={handleEditTodoChange}
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={editTodo.description}
              onChange={handleEditTodoChange}
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
            />
            <div style={{ display: "flex", flexDirection: "row" }}>
              <CancelButton onRequestClose={closeEditModal}></CancelButton>
              <button
                type="submit"
                className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Edit
              </button>
            </div>
          </div>
        </form>
      </MyModal>
      <MyModal isOpen={isDeleteModalOpen} title={`Delete ${deleteTodoById?.title}`}>
        <form className="w-full" onSubmit={handleDeleteTodo}>
          <div className="flex flex-col text-gray-100 py-2">
            <p>{`Are you sure you want to delete ${deleteTodoById?.title}?`}</p>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <CancelButton onRequestClose={closeDeleteModal}></CancelButton>
              <button
                type="submit"
                className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Confirm
              </button>
            </div>
          </div>
        </form>
      </MyModal>
    </div>
  );
});

export default TodoList;
