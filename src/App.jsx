import { Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import routes from "@/routes";
import { Home, Profile } from "./pages";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import Doctor from "./pages/Doctor";
import SignUpPatient from "./components/Auth/PatientAuth/sign-up";
import SignInPatient from "./components/Auth/PatientAuth/sign-in";
// import SignUpDoctor from "./components/Auth/DoctorAuth/sign-up";
import SignInDoctor from "./components/Auth/DoctorAuth/sign-in";
// import SignUpAdmin from "./components/Auth/AdminAuth/sign-up";
import SignInAdmin from "./components/Auth/AdminAuth/sign-in";
import Consultation from "./pages/Consultation";


function App() {
    const { pathname } = useLocation();

    return (
        <>
            {!(pathname == '/signin' || pathname == '/login') && (
                <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
                    <Navbar routes={routes} />
                </div>
            )
            }
            <Routes>
                {routes.map(
                    ({ path, element }, key) =>
                        element && <Route key={key} exact path={path} element={element} />
                )}
                {/* Home Path  */}
                <Route index path="/" element={<Home />} />
                {/* Path Profile for All Role */}
                <Route path="/profile" element={<Profile />} />
                {/* Path for Doctor Role */}
                <Route path="/doctor" element={<Doctor />} />
                {/* Path for Admin Role */}
                <Route path="/admin" element={<Admin />} />
                {/* ------------------------------------------------- */}
                {/* Patient Auth Paths */}
                <Route path="/patient/signin" element={<SignUpPatient />} />
                <Route path="/patient/login" element={<SignInPatient />} />
                {/* Doctor Auth Paths */}
                {/* <Route path="/doctor/signin" element={<SignUpDoctor />} /> */}
                <Route path="/doctor/login" element={<SignInDoctor />} />
                <Route path="/doctor/consultation" element={<Consultation />} />
                {/* Admin Auth Paths */}
                {/* <Route path="/admin/signin" element={<SignUpAdmin />} /> */}
                <Route path="/admin/login" element={<SignInAdmin />} />
                {/* Not Found Paths */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
