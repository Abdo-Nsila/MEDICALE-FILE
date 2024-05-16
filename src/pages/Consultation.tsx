
import CreateConsultation from "@/components/Consultation/Create";
import DisplayConsultations from "@/components/Consultation/Display";
import { getDoctorConsultations } from "@/state/Consultation/GetSlice";
import { getPatientsUsers } from "@/state/Users/GetSlice";
import { AppDispatch, RootState } from "@/state/store";
import { ArrowLeftIcon, RectangleStackIcon } from "@heroicons/react/24/outline";
import { Button, Card, Spinner } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies(null, { path: '/' });



const Consultation: React.FC = () => {
    const user = cookies.get("user");
    const consultations = useSelector((state: RootState) => state.getConsultations.consultations)
    const isloading = useSelector((state: RootState) => state.getConsultations.loading);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (!user || user?.role !== "Doctor") {
            navigate("/");
        }
        if (consultations.length === 0) {
            dispatch(getDoctorConsultations(user?.email));
        }
    }, [dispatch]);

    if (user && user?.role == "Doctor") {

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
                            <h3 className="text-4xl font-bold text-primary">Consultations</h3>
                        </div>
                        <div className="h-full w-full flex flex-col gap-2">
                            <div className="w-full flex justify-end px-5">
                                <CreateConsultation />
                            </div>
                        </div>
                    </Card>

                    {/* Table */}
                    {isloading ? (
                        <Spinner className="w-10 h-10 mt-10" />
                    ) : (<>
                        <DisplayConsultations />
                    </>
                    )}
                </div>
            </>
        );
    }

};

export default Consultation;
