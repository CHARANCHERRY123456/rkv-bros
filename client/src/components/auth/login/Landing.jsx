import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from '../../contexts/AuthContext.jsx'
import HeroSection from "./HeroSection.jsx";
import LoginForm from "./LoginForm.jsx";
import CarouselSection from "./CarouselSection.jsx";
import FeaturesSection from "./FeaturesSection.jsx";
import FuturePreview from "./FuturePreview.jsx";
import Footer from "./Footer.jsx";

export default function LoginPage() {
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        login(token);
        const redirectPath = location.state?.from?.pathname || "/content";
        navigate(redirectPath);
      } catch {
        toast.error("Login failed");
        localStorage.removeItem("token");
      }
    }
  }, [login]);

  return (
    <div className="font-sans text-gray-800">
      <section className="bg-gradient-to-r flex justify-center items-center w-screen h-screen from-gray-800 via-gray-700 to-gray-900 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row justify-between items-center gap-12">
          <HeroSection />
          <LoginForm />
        </div>
      </section>
      <CarouselSection />
      <FeaturesSection />
      <FuturePreview />
      <Footer />
    </div>
  );
}
