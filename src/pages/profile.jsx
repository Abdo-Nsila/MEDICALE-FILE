import { Avatar, Typography, Button } from "@material-tailwind/react";
import {
  MapPinIcon,
  PhoneIcon,
  IdentificationIcon,
  KeyIcon,
  ClockIcon,
  ListBulletIcon,
} from "@heroicons/react/24/solid";
import { Footer } from "@/widgets/layout";
import Cookies from "universal-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/state/auth/PatientAuthSlice";
const cookies = new Cookies(null, { path: '/' });

export function Profile() {
  const user = cookies.get("user");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(user);

  useEffect(() => {
    if (!user) {
      navigate(`/${user.role.toLowerCase()}/login`);
    }
  }, [user]);


  const handleLogout = () => {
    dispatch(logoutUser());
    setTimeout(() => {
      navigate(`/${user.role.toLowerCase()}/login`);
    }, 2000);

  }

  return (
    <>
      <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover bg-center scale-105" />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
      </section>
      <section className="relative bg-white py-16">
        <div className="relative mb-6 -mt-40 flex w-full px-4 min-w-0 flex-col break-words bg-white">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row justify-between">
              <div className="relative flex gap-6 items-start">
                <div className="-mt-20 w-40">
                  {user?.photoURL ? <Avatar
                    src={user?.photoURL}
                    alt="Profile picture"
                    variant="circular"
                    className="h-full w-full"
                  /> :
                    <div className="h-40 w-40 bg-blue-gray-300 rounded-full flex justify-center items-center text-5xl">
                      <h3>
                        {user?.fullName?.split(" ")[0].charAt(0).toUpperCase()}
                        {user?.fullName?.split(" ")[1].charAt(0).toUpperCase()}
                      </h3>
                    </div>
                  }
                </div>
                <div className="flex flex-col mt-2">
                  <Typography variant="h4" color="blue-gray">
                    {user?.fullName}
                  </Typography>
                  <Typography variant="paragraph" color="gray" className="!mt-0 mb-5 font-normal">{user?.email}</Typography>
                  {
                    user?.role === "Doctor" ? (
                      <Button onClick={() => navigate("/doctor")} className="bg-gray-900 w-fit lg:ml-auto flex gap-2 py-4">
                        <ListBulletIcon className="-mt-px h-4 w-4 text-white" />
                        Patient List
                      </Button>

                    ) :
                      user?.role === "Admin" ? (
                        <Button onClick={() => navigate("/admin")} className="bg-gray-900 w-fit lg:ml-auto flex gap-2 py-4">                          <ListBulletIcon className="-mt-px h-4 w-4 text-white" />
                          Global List
                        </Button>
                      ) : null
                  }
                </div>
              </div>

              <div className="mt-10 mb-10 flex lg:flex-col justify-between items-center lg:justify-end lg:mb-0 lg:px-4 flex-wrap lg:-mt-5">
                <Button onClick={() => handleLogout()} className="bg-red-400 w-fit lg:ml-auto">Logout</Button>
              </div>
            </div>
            <div className="mt-10 container space-y-2">
              <div className="flex items-center gap-2">
                <IdentificationIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
                <Typography className="font-medium text-blue-gray-500">
                  {user?.CIN}
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
                <Typography className="font-medium text-blue-gray-500">
                  {user?.address}
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
                <Typography className="font-medium text-blue-gray-500">
                  {user?.phone}
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <KeyIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
                <Typography className="font-medium text-blue-gray-500">
                  {user?.role}
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
                <Typography className="font-medium text-blue-gray-500">
                  {user?.date}
                </Typography>
              </div>

            </div>
            <div className="mb-10 py-6">
              <div className="flex w-full flex-col items-start lg:w-1/2">
                <Typography className="mb-6 font-normal text-blue-gray-500">
                  Hello I' have an {user?.role} account
                </Typography>
                <Button variant="text">Show more</Button>
              </div>
            </div>
          </div>


        </div>
      </section>
      <div className="bg-white">
        <Footer />
      </div>

    </>
  );
}

export default Profile;
