"use client";

import {useForm} from "react-hook-form";
import {useState, useEffect, useCallback} from "react";
import axios from "axios";
import {IoCalendar, IoEye, IoEyeOff} from "react-icons/io5";
import {FiEdit, FiCheck, FiX} from "react-icons/fi";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import useUserStore from "@/stores/useUserStore";
import Avatar from "../ui/Avatar";

// Custom debounce function
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export default function UpdateUserForm() {
  const userStore = useUserStore((state) => state);
  const [data, setData] = useState({
    fullname: userStore?.user?.fullname,
    username: userStore?.user?.username,
    bio: userStore?.user?.bio,
  });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: {errors},
  } = useForm();
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [editingFields, setEditingFields] = useState({});

  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      toast.loading("Updating...");
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER_BASE_URL}/api/v1/users/update`,
        data
      );
      toast.success("Successfully Updated");
      userStore.updateUser(response.data.user);
      setEditingFields({});
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("There was an error!", error);
    }
  };

  const checkUsernameAvailability = async (username) => {
    setCheckingUsername(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER_BASE_URL}/api/v1/users/checkUsernameAvailability?username=${username}`
      );
      if (response.status === 200) {
        setUsernameAvailable(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setUsernameAvailable(false);
      }
    } finally {
      setCheckingUsername(false);
    }
  };

  const debouncedCheckUsernameAvailability = useCallback(
    debounce((username) => {
      checkUsernameAvailability(username);
    }, 500),
    []
  );

  const username = watch("username");

  useEffect(() => {
    if (username) {
      debouncedCheckUsernameAvailability(username);
    } else {
      setUsernameAvailable(null);
    }
  }, [username, debouncedCheckUsernameAvailability]);

  const toggleEdit = (field) => {
    setEditingFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
    if (!editingFields[field]) {
      setValue(field, userStore.user[field]);
    }
  };

  const handleSave = (field) => {
    const value = watch(field);
    if (value !== userStore.user[field]) {
      onSubmit({[field]: value});
    } else {
      setEditingFields((prev) => ({...prev, [field]: false}));
    }
  };

  const renderEditableField = (field, label) => (
    <div className="mt-2 flex items-center">
      <div className={`${field === "bio" ? "w-full" : ""}`}>
        {editingFields[field] ? (
          field === "bio" ? (
            <>
              <label>{label}</label>
              <textarea
                {...register(field)}
                defaultValue={userStore.user[field]}
                className="w-full rounded border p-1"
              />
            </>
          ) : (
            <>
              <label>{label}</label>
              <input
                {...register(field)}
                defaultValue={userStore.user[field]}
                className="rounded border p-1"
              />
            </>
          )
        ) : (
          <span>
            {label}: {userStore.user[field]}
          </span>
        )}
      </div>
      {editingFields[field] ? (
        <>
          <button onClick={() => handleSave(field)} className="ml-2">
            <FiCheck />
          </button>
          <button onClick={() => toggleEdit(field)} className="ml-2">
            <FiX />
          </button>
        </>
      ) : (
        <button onClick={() => toggleEdit(field)} className="ml-2">
          <FiEdit />
        </button>
      )}
    </div>
  );

  return (
    <main className="relative flex min-h-52 w-full grid-cols-[200px_1fr] rounded-lg border border-border-100 p-4 dark:border-darkColor-400 dark:bg-dark-800">
      <div className="flex flex-shrink-0 items-center">
        <Avatar src={userStore?.user?.avatar} size={150} isBordered={true} />
      </div>
      <div className="flex w-full flex-col justify-end px-6 py-10 pr-0">
        {renderEditableField("fullname", "Name")}
        {renderEditableField("username", "Username")}
        {renderEditableField("bio", "Bio")}

        <div>
          <div>
            <label>Name:</label>
            <div className="flex">
              <div>{data.fullname}</div>{" "}
              <button className="ml-2">
                <FiX />
              </button>
            </div>
            <input
              defaultValue={data.fullname}
              className="rounded border p-1"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
