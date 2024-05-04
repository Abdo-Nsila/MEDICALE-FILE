"use client";
import React, { useState } from "react";
import { AppDispatch } from "@/state/store";
import { useDispatch } from "react-redux";
import { Button, Card, CardBody, Dialog, Input, Option, Select } from "@material-tailwind/react";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { createUser } from "@/state/Users/CreateSlice";
import { getUsers } from "@/state/Users/GetSlice";




const CreateUser = () => {
  const [sex, setSex] = useState<string>();
  const [role, setRole] = useState<string>();
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);


  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries((formData as any).entries());
    dispatch(createUser({ ...formValues, sex: sex, role: role }));
    handleOpen();
    setTimeout(() => {
      dispatch(getUsers())
    }, 2500);
  };


  // dispatch(updateUser({ email: info.email, updatedData: values }));
  return (
    <>
      <div className="w-full flex justify-end px-5">

        <Button onClick={handleOpen} className="bg-green-700 flex justify-center items-center gap-2 cursor-pointer p-2">
          <UserPlusIcon className="w-5" />
          Create User
        </Button>
      </div>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-2">
            <form
              className="mt-4 mb-1 mx-auto w-80 max-w-screen-lg lg:w-1/2"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className="mb-1 flex flex-col gap-6">
                <Input
                  crossOrigin={"true"}
                  size="lg"
                  placeholder="Email"
                  required={true}
                  name="email"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Input
                  crossOrigin={"true"}
                  size="lg"
                  placeholder="Password"
                  required={true}
                  name="password"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Input
                  crossOrigin={"true"}
                  size="lg"
                  placeholder="Full Name"
                  required={true}
                  name="fullName"
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
                  label="Select Role"
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

export default CreateUser;
