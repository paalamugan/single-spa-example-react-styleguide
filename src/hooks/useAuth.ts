import { useContext } from "react";
import { AuthContext } from "@app/providers/AuthProvider";

export function useAuth() {
  return useContext(AuthContext);
}
