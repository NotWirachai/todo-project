import ExcuteApi from "./api-integrations/excute-api";
class AuthApi {
  LoginApi = async (params: any) => {
    const response = await ExcuteApi("users/auth", params, "post", true);
    return response;
  };
}
export default new AuthApi();
