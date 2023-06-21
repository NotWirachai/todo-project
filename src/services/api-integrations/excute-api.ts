import { create } from "apisauce";

const ExcuteApi = async (url, params, method, is_login = false, timeout = 30000) => {
  // console.time('ExcuteApi');
  const baseURL = "https://candidate.neversitup.com/todo";
  const token = await JSON.parse(localStorage.getItem("profileLocal") || "");
  try {
    let headers = {};
    if (token && is_login === false) headers = { Authorization: `${token}` };
    const api = create({ baseURL, headers, timeout });

    let response;
    if (method == "get" || method == "GET") {
      response = await api.get(url, params || { filter: {} });
    } else if (method == "post" || method == "POST") {
      response = await api.post(url, params);
    } else if (method == "put" || method == "PUT") {
      response = await api.put(url, params);
    } else if (method == "patch" || method == "PATCH") {
      response = await api.patch(url, params);
    } else if (method == "delete" || method == "DELETE") {
      response = await api.delete(url, params);
    }
    // console.timeEnd('ExcuteApi');
    return response;
  } catch (error) {
    // console.timeEnd('ExcuteApi');
    return error;
  }
};

export default ExcuteApi;
