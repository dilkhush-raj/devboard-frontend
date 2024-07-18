import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

/**
 * @typedef {Object} User
 * @property {string|null} id
 * @property {string} username
 * @property {string} fullname
 * @property {string} email
 * @property {string} avatar
 * @property {string} bio
 * @property {string[]} interests
 * @property {string[]} permissions
 * @property {string[]} roles
 * @property {number} credit
 * @property {boolean} verified
 * @property {string|null} joinedOn
 */

/**
 * @typedef {Object} UserState
 * @property {User} user
 * @property {(newUser: User) => void} setUser
 * @property {() => void} resetUser
 * @property {(property: string, value: any) => void} setUserProperty
 */

const initialState = {
  isAuth: false,
  user: {
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
  },
};

/**
 * Creates a Zustand store for user state management.
 * @type {import('zustand').UseStore<UserState>}
 */
const useUserStore = create(
  persist(
    (set) => ({
      auth: {...initialState},
      setUser: (newUser) => set({user: newUser, isAuth: true}),
      resetUser: () => set({user: {...initialState}}),
      setUserProperty: (property, value) =>
        set((state) => ({
          user: {...state.user, [property]: value},
        })),
    }),
    {
      name: "auth", // name of the item in storage
      storage: createJSONStorage(() => localStorage), // function to get the storage mechanism
    }
  )
);

/**
 * Custom hook to get username.
 * @returns {string} The username.
 */
const useUsername = () => useUserStore((state) => state.user.username);

/**
 * Custom hook to set user.
 * @returns {(newUser: User) => void} The setUser function.
 */
const useSetUser = () => useUserStore((state) => state.setUser);

/**
 * Custom hook to set user property.
 * @returns {(property: string, value: any) => void} The setUserProperty function.
 */
const useSetUserProperty = () => useUserStore((state) => state.setUserProperty);

/**
 * Custom hook to reset user.
 * @returns {() => void} The resetUser function.
 */
const useResetUser = () => useUserStore((state) => state.resetUser);

export {
  useUserStore,
  useUsername,
  useSetUser,
  useSetUserProperty,
  useResetUser,
};
export default useUserStore;
