import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

interface User {
  id: string | null;
  username: string;
  fullname: string;
  email: string;
  avatar: string;
  bio: string;
  interests: string[];
  permissions: string[];
  roles: string[];
  credit: number;
  verified: boolean;
  joinedOn: string | null;
}

interface UserStore {
  isAuth: boolean;
  user: User;
  setUser: (newUser: User) => void;
  resetUser: () => void;
  setUserProperty: (property: keyof User, value: any) => void;
}

const initialState: User = {
  id: null,
  username: "",
  fullname: "",
  email: "",
  avatar: "",
  bio: "",
  interests: [],
  permissions: [],
  roles: [],
  credit: 0,
  verified: false,
  joinedOn: null,
};

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      isAuth: false,
      user: {...initialState},
      setUser: (newUser) => set({isAuth: true, user: newUser}),
      resetUser: () => set({isAuth: false, user: {...initialState}}),
      setUserProperty: (property, value) =>
        set((state) => ({
          user: {...state.user, [property]: value},
        })),
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

const useUsername = () => useUserStore((state) => state.user.username);

const useSetUser = () => useUserStore((state) => state.setUser);

const useSetUserProperty = () => useUserStore((state) => state.setUserProperty);

const useResetUser = () => useUserStore((state) => state.resetUser);

export {
  useUserStore,
  useUsername,
  useSetUser,
  useSetUserProperty,
  useResetUser,
};
export default useUserStore;
