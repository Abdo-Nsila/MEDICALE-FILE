import { Home, Profile } from "@/pages";
import Admin from "./pages/Admin";
import Doctor from "./pages/Doctor";

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
    path: "/doctor",
    element: <Doctor />,
    id: "doctor",
  },
  {
    name: "Admin",
    path: "/admin",
    element: <Admin />,
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
