import React, { useEffect, useState } from "react";
import { Option, Select, Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUser } from "@/state/auth/PatientAuthSlice";
import Cookies from "universal-cookie";
const cookies = new Cookies(null, { path: '/' });

export function SignUp() {
  const user = cookies.get("user");
  const [sex, setSex] = useState("Femme");
  const [role, setRole] = useState("Patient");
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());
    dispatch(createUser({ ...formValues, sex, role }));
  };

  return (
    <section className="m-8 flex">
      <div className="w-2/6 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
          alt="pattern"
        />
      </div>
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Join Us Today
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            Enter your email and password to register.
          </Typography>
        </div>
        <form
          className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Input
              size="lg"
              type="email"
              placeholder="name@mail.com"
              required={true}
              name="email"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Input
              size="lg"
              type="password"
              placeholder="Password"
              required={true}
              name="password"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Input
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
              value={"Femme"}
              onChange={(value) => setSex(value)}
            >
              <Option value="Femme">Femme</Option>
              <Option value="Homme">Homme</Option>
            </Select>

            <Select
              label="Select Sexe"
              name="role"
              value={"Patient"}
              onChange={(value) => setRole(value)}
            >
              <Option value="Patient">Patient</Option>
              <Option value="Doctor">Doctor</Option>
              <Option value="Admin">Admin</Option>
            </Select>

            <Input
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

          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                I agree the&nbsp;
                <a
                  href="#"
                  className="font-normal text-black transition-colors hover:text-gray-900 underline"
                >
                  Terms and Conditions
                </a>
              </Typography>

            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button className="mt-6" fullWidth type="submit">
            Register Now
          </Button>
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Already have an account?
            <Link to="/login" className="text-gray-900 ml-1">Sign in</Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
