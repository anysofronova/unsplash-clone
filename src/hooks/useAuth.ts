import { useAppSelector } from "./redux";

export const useAuth = () => {
  const { email, token, id } = useAppSelector((state) => state.authSlice);
  return { isAuth: !!(id && email && token), email, token, id };
};
