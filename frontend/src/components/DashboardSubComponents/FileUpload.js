import React from "react";

const FileUpload = ({ setFile, setIsEnabledEditor, isEnabledUpload }) => {
  return (
    <div className="md:mx-40 mx-1 bg-[#F3F5F7]">
      <div
        className={`p-4 text-center ${
          !isEnabledUpload && "cursor-not-allowed"
        }`}
      >
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files[0]) setIsEnabledEditor(false);
            setFile(e.target.files[0]);
          }}
          disabled={!isEnabledUpload}
          className={`${!isEnabledUpload && "cursor-not-allowed"}`}
        />
        <button
          onClick={() => {
            setFile(null);
            setIsEnabledEditor(true);
          }}
          className={`${!isEnabledUpload && "cursor-not-allowed"}`}
        >
          Remove File
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
