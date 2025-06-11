import { createContext, useContext, useState } from "react";

const AuthContext = createContext<any>(null);
function AuthContextProvider({ children }: any) {
  const [selectedNav, setSelectedNav] = useState<String>("");
  return (
    <AuthContext.Provider value={{ selectedNav, setSelectedNav }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
export const useAuthContext = () => {
  const Auth = useContext(AuthContext);

  if (!Auth) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return useContext(AuthContext);
};
