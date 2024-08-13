import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  Dispatch,
} from "react";
// 状态
interface AuthState {
  isAuthenticated: boolean;
  username: string;
}
// 操作类型
interface AuthAction {
  type: "LOGIN" | "LOGOUT";
  payload?: { username: string };
}

// 初始状态
const initialState: AuthState = {
  isAuthenticated: false,
  username: "",
};

// 上下文对象(?) 使用了初始状态和初始操作(null)
const AuthContext = createContext<{
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

//Reducer函数
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        username: action.payload?.username || "",
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        username: "",
      };
    default:
      return state;
  }
}

// 处理cookie
export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
