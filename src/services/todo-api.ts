import ExcuteApi from "./api-integrations/excute-api";
class TodoApi {
  CreateTodoApi = async (params: any = {}) => {
    const response = await ExcuteApi("todos", params, "post");
    return response;
  };
  UpdateTodoApi = async (params: any = {}) => {
    const { _id } = params;
    delete params._id;
    const response = await ExcuteApi(`todos/${_id}`, params, "put");
    return response;
  };
  GetAllTodosApi = async (params: any = {}) => {
    const response = await ExcuteApi("todos", params, "get");
    return response;
  };
  GetTodoByIdApi = async (params: any = {}) => {
    const { _id } = params;
    const response = await ExcuteApi(`todos/${_id}`, {}, "get");
    return response;
  };
  DeleteTodoByIdApi = async (params: any = {}) => {
    const { _id } = params;
    const response = await ExcuteApi(`todos/${_id}`, {}, "delete");
    return response;
  };
}
export default new TodoApi();
