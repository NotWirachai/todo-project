import { useContext, createContext } from "react";
import { types, Instance, onSnapshot } from "mobx-state-tree";

import { AuthStore } from "./auth-store";
import { TodoStore } from "./todo-store";

const CpacRootModel = types.model({
  authStore: AuthStore,
  todoStore: TodoStore,
});

let initialState = CpacRootModel.create({
  authStore: {
    token: null,
  },
  todoStore: {},
});

if (typeof window !== "undefined") {
  console.log("we are running on the client");
  const data = localStorage.getItem("rootState");
  if (data) {
    const json = JSON.parse(data);
    if (CpacRootModel.is(json)) {
      initialState = CpacRootModel.create(json);
    }
  }
} else {
  console.log("we are running on the server");
}

export const rootStore = initialState;

onSnapshot(rootStore, (snapshot) => {
  localStorage.setItem("rootState", JSON.stringify(snapshot));
});

export type RootInstance = Instance<typeof CpacRootModel>;
const RootStoreContext = createContext<null | RootInstance>(null);

export const Provider = RootStoreContext.Provider;
export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}
