import { Routes, Route } from "react-router-dom";
import {
  SignUp,
  SignIn,
  RootLayout,
  Home,
  ErrorPage,
  Jobs,
  JobPage,
  Profile,
  SavedJobs,
  AppliedJobs,
  PostJob,
  ApplyJob,
  MyJobs,
} from "./pages";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <section>
      <Routes>
        {/* public routes */}
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobPage />} />
          {/* Private routes */}
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/saved" element={<SavedJobs />} />
          <Route path="/applied" element={<AppliedJobs />} />
          <Route path="/apply/:id" element={<ApplyJob />} />
          <Route path="/jobs/me" element={<MyJobs />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Toaster />
    </section>
  );
}

export default App;
