
import CreateConsultation from "@/components/Doctor/Create";
import DisplayEmployees from "@/components/Doctor/Display";
import { getPatientsUsers } from "@/state/Users/GetSlice";
import { AppDispatch, RootState } from "@/state/store";
import { ArrowLeftIcon, RectangleStackIcon } from "@heroicons/react/24/outline";
import { Button, Card, Spinner } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies(null, { path: '/' });


const Doctor: React.FC = () => {
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
        if (user?.role !== "Doctor") {
            navigate("/profile");
        }
        if (users.length === 0) {
            dispatch(getPatientsUsers());
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
                    <div className="h-full w-full flex flex-col gap-2">
                        <div className="w-full flex justify-end px-5">
                            <Button onClick={() => navigate("consultation")} className="bg-green-700 flex justify-center items-center gap-2 cursor-pointer p-2">
                                <RectangleStackIcon className="w-5" />
                                Consultation
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Table */}
                {isloading ? (
                    <Spinner className="w-10 h-10 mt-10" />
                ) : (<>
                    <DisplayEmployees />
                </>
                )}
            </div>
        </>
    );
};

export default Doctor;
