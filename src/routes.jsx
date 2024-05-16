import { Home, Profile } from "@/pages";
import Admin from "./pages/Admin";
import Doctor from "./pages/Doctor";
import SignInDoctor from "./components/Auth/DoctorAuth/sign-in";
import SignInAdmin from "./components/Auth/AdminAuth/sign-in";
import Consultation from "./pages/Consultation";

export const routes = [
  {
    name: "home",
    path: "/home",
    element: <Home />,
    id: "home",
  },
  {
    name: "Who we are ?",
    path: "/profile",
    element: <Profile />,
    id: "about",
  },
  {
    name: "Doctor",
    path: "/doctor/login",
    element: <SignInDoctor />,
    id: "doctor",
  },
  {
    name: "Consultation",
    path: "/doctor/consultation",
    element: <Consultation />,
    id: "doctor",
  },
  {
    name: "Admin",
    path: "/admin/login",
    element: <SignInAdmin />,
    id: "admin",
  },
  {
    name: "Contact us",
    // path: "/profile",
    // element: <Profile />,
    id: "contact",
  },

];

export default routes;
