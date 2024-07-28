"use client";

import React, {useCallback, useState} from "react";
import {useDropzone} from "react-dropzone";
import axios from "axios";
import {toast} from "react-hot-toast";
import Image from "next/image";

const AvatarUploader = () => {
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  }, []);

  const {getRootProps, getInputProps, isDragActive, acceptedFiles} =
    useDropzone({
      onDrop,
      accept: {
        "image/*": [".jpeg", ".jpg", ".png", ".gif"],
      },
      multiple: false,
    });

  const removeImage = () => {
    setPreviewImage(null);
    acceptedFiles.pop();
  };

  const handleUpload = async () => {
    if (acceptedFiles.length === 0) {
      toast.error("Please select an image first");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("avatar", acceptedFiles[0]);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER_BASE_URL}/api/v1/users/uploadavatar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("Avatar updated successfully!");
        // You might want to update the user's avatar in your global state here
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update avatar");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mx-auto mt-8 max-w-md">
      {previewImage ? (
        <div className="mb-4 text-center">
          <Image
            src={previewImage}
            alt="Preview"
            width={200}
            height={200}
            className="mx-auto rounded-full"
          />
          <button
            onClick={removeImage}
            className="mt-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Remove
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center ${isDragActive ? "border-primary-500 bg-primary-100" : "border-gray-300"} ${uploading ? "cursor-not-allowed opacity-50" : ""} `}
        >
          <input {...getInputProps()} disabled={uploading} />
          {isDragActive ? (
            <p>Drop the image here ...</p>
          ) : (
            <p>Drag 'n' drop an image here, or click to select a file</p>
          )}
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading || !previewImage}
        className={`mt-4 w-full rounded bg-blue-500 px-4 py-2 text-white ${uploading || !previewImage ? "cursor-not-allowed opacity-50" : "hover:bg-blue-600"} `}
      >
        {uploading ? "Uploading..." : "Upload Avatar"}
      </button>
    </div>
  );
};

export default AvatarUploader;
