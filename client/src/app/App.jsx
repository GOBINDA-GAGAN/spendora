import { RouterProvider } from "react-router-dom";

import router from "../routes/app.routes";
import { AuthProvider } from "../context/AuthContext";
import { Toaster } from "sonner";
import { TransactionProvider } from "../context/TransactionContext";

const App = () => {
  return (
    <AuthProvider>
      <TransactionProvider>
        <Toaster position="top-right" richColors />
        <RouterProvider router={router} />
      </TransactionProvider>
    </AuthProvider>
  );
};

export default App;
