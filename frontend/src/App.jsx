import { Routes, Route } from "react-router-dom";
import { SignUp, SignIn, RootLayout, Home, ErrorPage } from "./pages";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <section>
      <Routes>
        {/* public routes */}
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Toaster />
    </section>
  );
}

export default App;
