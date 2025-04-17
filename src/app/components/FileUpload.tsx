"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { supabase } from "@/lib/supabaseClient";
import { FaFolder } from "react-icons/fa";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false); // 🟡 New loading state

  const { mutate } = useMutation({
    mutationFn: async ({
      file_key,
      file_name,
    }: {
      file_key: string;
      file_name: string;
    }) => {
      const response = await axios.post("/api/chat", { file_key, file_name });
      return response.data;
    },
    onSuccess:(data)=>{
      toast.success(data.message)
    },
    onError:(error)=>{
      toast.error(error.message)
    },
    onSettled: () => {
      setIsLoading(false); 
    },
  });

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setIsLoading(true); 
        const file = acceptedFiles[0];
        setSelectedFile(file);
        console.log("File dropped:", file);

        const { data, error } = await supabase.storage
          .from("resumetester")
          .upload(`public/${file.name}`, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (error) {
          console.error("Upload error:", error);
          setIsLoading(false);
        } else {
          console.log("File uploaded successfully:", data);
          if (data) {
            const { path: file_key } = data;
            const file_name = file.name; 
            mutate({ file_key, file_name });
          }
        }
      }
    },
    [mutate]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps({
        className:
          "px-6 py-4 border-2 border-dashed rounded-xl m-4 text-center cursor-pointer " +
          (isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-white"),
      })}
    >
      <input {...getInputProps()} />
      <p className="text-gray-600">
        <FaFolder
          size={40}
          color="#4B92D3"
          className="flex items-center mx-auto"
        />
        {isDragActive
          ? "Drop your file here..."
          : "Drag & drop your resume here, or click to upload"}
      </p>

      {selectedFile && (
        <p className="mt-2 text-green-600 font-medium">
          ✅ {selectedFile.name}
        </p>
      )}

      {isLoading && (
        <p className="mt-2 text-blue-500 font-semibold animate-pulse">
          ⏳ Uploading and processing...
        </p>
      )}
    </div>
  );
};

export default FileUpload;
