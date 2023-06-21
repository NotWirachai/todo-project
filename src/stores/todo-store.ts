import { types, flow } from "mobx-state-tree";
import { TodoApi } from "../services";

export const TodoStore = types
  .model("TodoStore", {
    response_error: types.maybeNull(types.string),
    todos: types.maybeNull(
      types.array(
        types.model({
          _id: types.maybeNull(types.string),
          title: types.maybeNull(types.string),
          description: types.maybeNull(types.string),
          user_id: types.maybeNull(types.string),
          createdAt: types.maybeNull(types.string),
          updatedAt: types.maybeNull(types.string),
        })
      )
    ),
  })

  .actions((self) => {
    return {
      createTodo: flow(function* createTodo(params) {
        self.response_error = null;
        try {
          const response = yield TodoApi.CreateTodoApi(params);
          console.log("createTodo response :> ", response);
          if (response && response.ok) {
            return "SUCCESS";
          } else {
            return response.data;
          }
        } catch (error) {
          console.error("Failed to create todo store :> ", error);
          self.response_error = "Failed to create todo store";
        }
      }),

      updateTodo: flow(function* updateTodo(params) {
        self.response_error = null;
        try {
          const response = yield TodoApi.UpdateTodoApi(params);
          console.log("updateTodo response :> ", response);
          if (response && response.ok) {
            return "SUCCESS";
          } else {
            return response.data;
          }
        } catch (error) {
          console.error("Failed to update todo store :> ", error);
          self.response_error = "Failed to update todo store";
        }
      }),

      getAllTodos: flow(function* getAllTodos() {
        self.response_error = null;
        self.todos = null;
        try {
          const response = yield TodoApi.GetAllTodosApi();
          console.log("getAllTodos response :> ", response);
          if (response && response.ok) {
            self.todos = response.data;
          } else {
            return response.data;
          }
        } catch (error) {
          console.error("Failed to get all todo store :> ", error);
          self.response_error = "Failed to get all todo store";
        }
      }),

      getTodoById: flow(function* getTodoById(params) {
        self.response_error = null;
        try {
          const response = yield TodoApi.GetTodoByIdApi(params);
          console.log("getTodoById response :> ", response);
          if (response && response.ok) {
            return response.data;
          } else {
            return response.data;
          }
        } catch (error) {
          console.error("Failed to get all todo store :> ", error);
          self.response_error = "Failed to get all todo store";
        }
      }),

      deleteTodoById: flow(function* deleteTodoById(params) {
        self.response_error = null;
        try {
          const response = yield TodoApi.DeleteTodoByIdApi(params);
          console.log("deleteTodoById response :> ", response);
          if (response && response.ok) {
            return "SUCCESS";
          } else {
            return response.data;
          }
        } catch (error) {
          console.error("Failed to delete todo by id store :> ", error);
          self.response_error = "Failed to delete todo by id store";
        }
      }),
    };
  });
