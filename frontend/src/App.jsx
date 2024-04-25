import { Routes, Route, Navigate } from "react-router-dom";
import {
  SignUp,
  SignIn,
  RootLayout,
  Home,
  ErrorPage,
  Jobs,
  JobPage,
  SavedJobs,
  AppliedJobs,
  PostJob,
  ApplyJob,
  MyJobs,
  UpdateJob,
} from "./pages";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

function App() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <section>
      <Routes>
        {/* public routes */}
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/job/:id" element={<JobPage />} />

          {/* Private routes */}
          <Route
            path="/post-job"
            element={
              currentUser && currentUser.role === "Employer" ? (
                <PostJob />
              ) : (
                <Navigate to={"/sign-in"} />
              )
            }
          />
          <Route
            path="/update-job/:id"
            element={
              currentUser && currentUser.role === "Employer" ? (
                <UpdateJob />
              ) : (
                <Navigate to={"/sign-in"} />
              )
            }
          />
          <Route
            path="/saved"
            element={
              currentUser && currentUser.role === "Job Seeker" ? (
                <SavedJobs />
              ) : (
                <Navigate to={"/sign-in"} />
              )
            }
          />
          <Route
            path="/applied"
            element={
              currentUser && currentUser.role === "Job Seeker" ? (
                <AppliedJobs />
              ) : (
                <Navigate to={"/sign-in"} />
              )
            }
          />
          <Route
            path="/apply/:id"
            element={
              currentUser && currentUser.role === "Job Seeker" ? (
                <ApplyJob />
              ) : (
                <Navigate to={"/sign-in"} />
              )
            }
          />
          <Route
            path="/my-jobs"
            element={
              currentUser && currentUser.role === "Employer" ? (
                <MyJobs />
              ) : (
                <Navigate to={"/sign-in"} />
              )
            }
          />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Toaster />
    </section>
  );
}

export default App;
