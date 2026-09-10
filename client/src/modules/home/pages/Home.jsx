import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import Button from "../../../components/ui/Button";
import { useAuth } from "../../../context/AuthContext";

export default function Home() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    console.log("hendel logout click");
    
    try {
      await logout();

      toast.success("Logged out successfully");

      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-white">
      <h1 className="text-4xl font-bold text-gray-900">
        Welcome to Home Page 👋
      </h1>

      <Button
        variant="primary"
        size="lg"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
}