/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { FaUpload } from "react-icons/fa6";
import { uploadResume } from "../utils/uploadResumeFile";
const UploadResume = ({ resumeUrl, setResumeUrl }) => {
  const [resumeImg, setResumeImg] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const handleUploadResume = (e) => {
    if (e.target.files[0]) {
      setResumeImg(e.target.files[0]);
    }
  };
  useEffect(() => {
    if (resumeImg) {
      uploadResume(resumeImg, setResumeUrl, setUploadProgress);
      console.log(resumeUrl, uploadProgress);
    }
  }, [resumeImg]);
  return (
    <div className="flex flex-col gap-3">
      <p className="text-lg font-semibold">Your Resume</p>
      <div
        className={
          "input border-l-2  rounded-md py-4 border-2 border-green   px-3 text-lg"
        }
      >
        {resumeUrl && (
          <img
            src={resumeUrl}
            alt="resume"
            className="w-full mx-auto my-6 md:w-[90%] h-[600px] md:h-[900px] object-cover rounded-lg"
          />
        )}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <p className="text-sm text-center my-2 text-yellow-500 font-semibold">
            Uploading Resume {uploadProgress}%
          </p>
        )}
        <label
          htmlFor="resume"
          className={`main-btn upload-btn ${
            uploadProgress > 0 &&
            uploadProgress < 100 &&
            "load-btn  pointer-events-none"
          }`}
        >
          <FaUpload size={20} />
          <span>Upload Resume</span>
        </label>
        <p className="text-xs font-semibold mt-2 text-gray-600 text-center">
          ( jpg, png, jpeg )only max size 5 MB
        </p>
        <input
          type="file"
          name="resume"
          id="resume"
          onChange={handleUploadResume}
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  );
};

export default UploadResume;
