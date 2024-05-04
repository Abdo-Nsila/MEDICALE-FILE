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


type infoProps = {
  fullName: string;
  CIN: string;
  date: string;
  address: string;
  phone: string;
  email: string;
  role: string;
  sex: string;
  password: string;
};

type UpdateProps = {
  info: infoProps;
};



const Update = ({ info }: UpdateProps) => {
  const [sex, setSex] = useState<string>(info.sex);
  const [role, setRole] = useState<string>(info.role);
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);


  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries((formData as any).entries());
    dispatch(updateUser({ email: info.email, updatedData: { ...formValues, sex: sex, role: role } }));
    setTimeout(() => {
      dispatch(getPatientsUsers());
      handleOpen();
    }, 2000);
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
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <form
              className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className="mb-1 flex flex-col gap-6">
                <Input
                  crossOrigin={"true"}
                  size="lg"
                  placeholder="Full Name"
                  required={true}
                  name="fullName"
                  defaultValue={info.fullName}
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
                  defaultValue={info.date}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Select
                  label="Select Sexe"
                  name="sexe"
                  value={sex}
                  onChange={(value) => setSex(value)}
                >
                  <Option value="Femme">Femme</Option>
                  <Option value="Homme">Homme</Option>
                </Select>

                <Select
                  label="Select Sexe"
                  name="role"
                  value={role}
                  onChange={(value) => setRole(value)}
                >
                  <Option value="Patient">Patient</Option>
                  <Option value="Doctor">Doctor</Option>
                  <Option value="Admin">Admin</Option>
                </Select>

                <Input
                  crossOrigin={"true"}
                  size="lg"
                  placeholder="address"
                  required={true}
                  name="address"
                  defaultValue={info.address}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Input
                  crossOrigin={"true"}
                  size="lg"
                  placeholder="Your phone number"
                  required={true}
                  name="phone"
                  defaultValue={info.phone}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />

                <Input
                  crossOrigin={"true"}
                  size="lg"
                  placeholder="CIN"
                  required={true}
                  name="CIN"
                  defaultValue={info.CIN}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
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
      </Dialog>
    </>
  );
};

export default Update;
