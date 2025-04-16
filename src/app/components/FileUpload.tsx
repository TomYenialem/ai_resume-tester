"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { supabase } from "@/lib/supabaseClient";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      console.log("File dropped:", file);

      const { data, error } = await supabase.storage
        .from("resumetester") // bucket name from superbase
        .upload(`public/${file.name}`, file, {
          cacheControl: "3600", //catch the files for one hour
          upsert: false, // don’t overwrite the file if it already exists.
        });

      if (error) {
        console.error("Upload error:", error);
      } else {
        console.log("File uploaded successfully:", data);
      }
    }
  }, []);

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
        {isDragActive
          ? "Drop your file here..."
          : "Drag & drop your resume here, or click to upload"}
      </p>

      {selectedFile && (
        <p className="mt-2 text-green-600 font-medium">
          ✅ {selectedFile.name}
        </p>
      )}
    </div>
  );
};

export default FileUpload;
