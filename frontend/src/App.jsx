import { Routes, Route } from "react-router-dom";
import { SignUp, SignIn, RootLayout, Home, ErrorPage } from "./pages";
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
    </section>
  );
}

export default App;
