import { types, flow } from "mobx-state-tree";
import { AuthApi } from "../services";

export const AuthStore = types
  .model("AuthStore", {
    token: types.maybeNull(types.string),
    response_error: types.maybeNull(types.string),
  })

  .actions((self) => {
    return {
      requestLogin: flow(function* requestLogin(params) {
        self.token = null;
        self.response_error = null;
        try {
          const response = yield AuthApi.LoginApi(params);
          console.log("requestLogin response :> ", response);
          if (response && response.ok) {
            const { token } = response.data;
            self.token = token;
            localStorage.setItem("profileLocal", JSON.stringify(token));
            return "SUCCESS";
          } else {
            return response.data;
          }
        } catch (error) {
          console.error("Failed to request login store :> ", error);
          self.response_error = "Failed to request login store";
        }
      }),
    };
  });
