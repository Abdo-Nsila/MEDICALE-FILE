
import CreateUser from "@/components/Admin/Create";
import DisplayEmployees from "@/components/Admin/Display";
import DisplayPatientConsultations from "@/components/Patient/Display";
import { getPatientConsultations } from "@/state/Consultation/GetSlice";
import { getUsers } from "@/state/Users/GetSlice";
import { AppDispatch, RootState } from "@/state/store";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button, Card, Spinner } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies(null, { path: '/' });


const Patient: React.FC = () => {
    const user = cookies.get("user");
    const users = useSelector(
        (state: RootState) => state.getConsultations.consultations
    );
    const isloading = useSelector(
        (state: RootState) => state.getConsultations.loading
    );
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (user?.role !== "Patient") {
            navigate("/");
        }
        else {
            dispatch(getPatientConsultations(user?.email));
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
                        <h3 className="text-4xl font-bold text-primary">Consultation</h3>
                    </div>
                    <div className="h-full w-full flex gap-2">
                    </div>
                </Card>

                {/* Table */}
                {isloading ? (
                    <Spinner className="w-10 h-10 mt-10" />
                ) : (<>
                    <DisplayPatientConsultations />
                </>
                )}
            </div>
        </>
    );
};

export default Patient;
