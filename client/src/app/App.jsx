import { RouterProvider } from "react-router-dom";

import router from "../routes/app.routes";
import { AuthProvider } from "../context/AuthContext";
import { Toaster } from "sonner";

const App = () => {
  return (
    <AuthProvider>
      <Toaster position="top-right" richColors />
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
