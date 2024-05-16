"use client";
import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, CardBody, Dialog, Input, Option, Select } from "@material-tailwind/react";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { createUser } from "@/state/Users/CreateSlice";
import { getUsers, UserType } from "@/state/Users/GetSlice";
import { Timestamp } from "firebase/firestore";
import { getDoctorConsultations, getPatientsUsers } from "@/state/Consultation/GetSlice";
import Cookies from "universal-cookie";
import { createConsultationAction } from "@/state/Consultation/CreateSlice";
const cookies = new Cookies(null, { path: '/' });

type ConsultationType = {
  id: string;
  doctor: string;
  doctorEmail: string;
  patient: string;
  patientEmail: string;
  reason: string;
  result: string;
  medication: string;
  date: Timestamp;
};


const CreateConsultation = () => {
  const user = cookies.get("user");
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [patientEmail, setPatientEmail] = useState<string>("");
  const patients = useSelector((state: RootState) => state.getConsultations.patients);


  useEffect(() => {
    dispatch(getPatientsUsers());
  }, [dispatch]);


  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries((formData as any).entries());
    const data = {
      id: crypto.randomUUID(),
      doctorEmail: user.email,
      doctor: user.fullName,
      patientEmail: patientEmail,
      ...formValues,
      date: Timestamp.fromDate(new Date(formValues.date))
    }
    dispatch(createConsultationAction(data));
    handleOpen();
    setTimeout(() => {
      dispatch(getDoctorConsultations(user.email))
    }, 2500);
  };


  // dispatch(updateUser({ email: info.email, updatedData: values }));
  return (
    <>
      <div className="w-full flex justify-end px-5">
        <Button onClick={handleOpen} className="bg-green-700 flex justify-center items-center gap-2 cursor-pointer p-2">
          <UserPlusIcon className="w-5" />
          Create Consultation
        </Button>
      </div>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="">
          <CardBody className="flex flex-col gap-2">
            <form
              className="mt-4 mb-1 mx-auto w-80 max-w-screen-lg lg:w-1/2"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className="mb-1 flex flex-col gap-6">
                <div className="w-72">
                  <Select
                    name="patientEmail"
                    value={patientEmail}
                    onChange={(value) => setPatientEmail(value)}
                    label="Select a Patient">
                    {
                      patients.map((patient: UserType) => (
                        <Option value={patient.email}>{patient.email}</Option>
                      ))
                    }
                  </Select>
                </div>
                <Input
                  crossOrigin={"true"}
                  size="lg"
                  placeholder="patient full Name"
                  required={true}
                  name="patient"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Input
                  crossOrigin={"true"}
                  size="lg"
                  type="date"
                  placeholder="Enter date (YYYY-MM-DD)"
                  required={true}
                  name="date"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Input
                  crossOrigin={"true"}
                  size="lg"
                  placeholder="Reason"
                  required={true}
                  name="reason"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Input
                  crossOrigin={"true"}
                  size="lg"
                  placeholder="Result"
                  required={true}
                  name="result"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Input
                  crossOrigin={"true"}
                  size="lg"
                  placeholder="Medication"
                  required={true}
                  name="medication"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
              <Button className="mt-6" fullWidth type="submit">
                Create
              </Button>
            </form>

          </CardBody>
          {/* <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleOpen} fullWidth>
              Cancel
            </Button>
            <Typography variant="small" className="mt-4 flex justify-center">
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
                onClick={handleOpen}
              >
                Update
              </Typography>
            </Typography>
          </CardFooter> */}
        </Card>
      </Dialog>
    </>
  );
};

export default CreateConsultation;
