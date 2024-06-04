
import CreateUser from "@/components/Admin/Create";
import DisplayEmployees from "@/components/Admin/Display";
import { getUsers, UserType } from "@/state/Users/GetSlice";
import { AppDispatch, RootState } from "@/state/store";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button, Card, Spinner } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies(null, { path: '/' });


const Admin: React.FC = () => {
    const user = cookies.get("user");
    const users = useSelector(
        (state: RootState) => state.getUsers.users
    );
    const isloading = useSelector(
        (state: RootState) => state.getUsers.loading
    );
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (user?.role !== "Admin") {
            navigate("/");
        }
        else {
            dispatch(getUsers());
        }
    }, [dispatch]);


    return (
        <>
            <div className="h-full flex flex-col gap-2 items-center py-5">
                {/* Header */}
                <Card className="w-[95%] bg-gray-700 text-white xlg:w-4/5 md:w-11/12 flex justify-between items-start px-4 py-14">
                    <div className="flex flex-col gap-3 items-start mt-4">
                        <Button className="flex gap-2 items-center" onClick={() => navigate("/profile")}>
                            <ArrowLeftIcon className="w-6 h-6" />
                            <span>Go to Profile</span>
                        </Button>
                        <h3 className="text-4xl font-bold text-primary">Users</h3>
                    </div>
                    <div className="h-full w-full flex gap-2">
                        <CreateUser />
                    </div>
                </Card>

                {/* Table */}
                {isloading ? (
                    <Spinner className="w-10 h-10 mt-10" />
                ) : (<>
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
                        <Card className="py-10 px-20">
                            <span className="text-3xl font-bold text-black">Admins</span>
                            <span className="text-xl">{users.filter((user: UserType) => user.role === "Admin").length - 1}{" + You "}</span>
                        </Card>
                        <Card className="py-10 px-20">
                            <span className="text-3xl font-bold text-black">Doctors</span>
                            <span className="text-xl">{users.filter((user: UserType) => user.role === "Doctor").length}{" "}</span>
                        </Card>
                        <Card className="py-10 px-20">
                            <span className="text-3xl font-bold text-black">Patients</span>
                            <span className="text-xl">{users.filter((user: UserType) => user.role === "Patient").length}{" "}</span>
                        </Card>
                    </div>

                    <DisplayEmployees />
                </>
                )}
            </div>
        </>
    );
};

export default Admin;
