import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase/firebase";
import toast from "react-hot-toast";

export const uploadResume = (resumeImg, setResumeUrl, setUploadProgress) => {
  const storage = getStorage(app);
  const fileName = new Date().getTime() + resumeImg.name;
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef, resumeImg);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setUploadProgress(progress.toFixed(0));
    },
    (error) => {
      console.log(error);
      toast.error("Could not upload image (File must be less than 5 MB)");
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setResumeUrl(downloadURL);
        toast.success("Resume Uploaded Successfully");
      });
    }
  );
};
