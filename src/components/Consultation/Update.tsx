"use client";
import React, { useState } from "react";
import { AppDispatch } from "@/state/store";
import { useDispatch } from "react-redux";
import {
  updateUser,
} from "@/state/Users/UpdateSlice";
import { Button, Card, CardBody, Dialog, Input, Option, Select } from "@material-tailwind/react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { getPatientsUsers } from "@/state/Users/GetSlice";
import { Timestamp } from "firebase/firestore";
import { getDoctorConsultations } from "@/state/Consultation/GetSlice";
import Cookies from "universal-cookie";
import { updateConsultation } from "@/state/Consultation/UpdateSlice";
const cookies = new Cookies(null, { path: '/' });


type infoProps = {
  id: string;
  doctor: string;
  doctorEmail: string;
  patient: string;
  patientEmail: string;
  reason: string;
  result: string;
  medication: string;
  date: Timestamp | string;
};

type UpdateProps = {
  info: infoProps;
};



const Update = ({ info }: UpdateProps) => {
  const user = cookies.get("user");
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);


  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries((formData as any).entries());
    console.log(formValues);
    const data = {
      id: info.id,
      doctorEmail: info.doctorEmail,
      doctor: info.doctor,
      patientEmail: info.patientEmail,
      ...formValues,
      date: Timestamp.fromDate(new Date(formValues.date))
    }
    dispatch(updateConsultation({ updatedData: data }));
    setTimeout(() => {
      dispatch(getDoctorConsultations(user.email));
      handleOpen();
    }, 2500);
  };


  // dispatch(updateUser({ email: info.email, updatedData: values }));
  return (
    <>
      <span onClick={handleOpen} className="w-7 cursor-pointer rounded-full text-yellow-500 p-1">
        <PencilSquareIcon />
      </span>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className=" w-full">
          <CardBody className="flex flex-col gap-5">
            <form
              className="mt-8 mb-2 mx-auto max-w-screen-lg lg:w-1/2 flex flex-col gap-4"
              onSubmit={(e) => handleSubmit(e)}
            >
              <Input
                disabled
                crossOrigin={"true"}
                size="lg"
                placeholder="patient full Name"
                required={true}
                name="doctor"
                defaultValue={info.doctor}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Input
                disabled
                crossOrigin={"true"}
                size="lg"
                placeholder="patient Email"
                required={true}
                name="patientEmail"
                defaultValue={info.patientEmail}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
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
              <small>
                <b>
                  Date: {typeof info.date == "string" ? info.date : info.date.toDate().toLocaleDateString()}
                </b>
              </small>
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
                defaultValue={info.reason}
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
                defaultValue={info.result}
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
                defaultValue={info.medication}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Button className="mt-6" fullWidth type="submit">
                Update
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
      </Dialog >
    </>
  );
};

export default Update;
