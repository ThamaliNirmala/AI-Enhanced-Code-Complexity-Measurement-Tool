import React from "react";

const FileUpload = ({ setFile, setIsEnabledEditor, isEnabledUpload }) => {
  return (
    <div className="md:mx-40 mx-1 bg-[#dce9f5]">
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
          className={`text-[#FF0000] hover:text-white border border-[#FF0000] hover:bg-[#FF0000] font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${!isEnabledUpload && "cursor-not-allowed"}`}
          style={{ fontFamily: "'Inter', sans-serif"}}
        >
          Remove File
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
