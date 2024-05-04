
import React from "react";
import Update from "./Update";
import Delete from "./Delete";
import { UserType } from "@/state/Users/GetSlice";
import { Card, CardBody, Chip, Typography } from "@material-tailwind/react";
import { ClockIcon, GlobeEuropeAfricaIcon, IdentificationIcon, InboxIcon, MapIcon, PhoneIcon } from "@heroicons/react/24/outline";

type ProfileCardProps = {
  data: UserType;
};

const ProfileCard: React.FC<ProfileCardProps> = ({ data }) => {
  return (
    <Card color="gray" variant="gradient" className="flex flex-col gap-1 justify-between sm:min-w-36 py-2">
      <div className="flex justify-end items-center gap-1 px-3">
        {/*//! Actions */}
        <Update info={data} />
        <Delete docId={data.email} />
      </div>

      <div className="p-4 flex flex-col items-center">
        <div className="h-32 w-32 bg-blue-gray-300 rounded-full flex justify-center items-center text-5xl">
          <h3>
            {data?.fullName?.split(" ")[0].charAt(0).toUpperCase()}
            {data?.fullName?.split(" ")[1].charAt(0).toUpperCase()}
          </h3>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold capitalize ">
            {data.fullName}
          </h2>
          <Chip className="text-xs" color={data.role == "Patient" ? "teal" : data.role == "Doctor" ? "amber" : "red"} value={data.role} />
        </div>
        <CardBody className="mt-2">
          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-4">
              <span className="w-6 rounded-full border border-white/20 bg-white/20 p-1">
                <IdentificationIcon />
              </span>
              <Typography className="font-normal">{data.CIN}</Typography>
            </li>
            <li className="flex items-center gap-4">
              <span className="w-6 rounded-full border border-white/20 bg-white/20 p-1">
                <InboxIcon />
              </span>
              <Typography className="font-normal">{data.email}</Typography>
            </li>
            <li className="flex items-center gap-4">
              <span className="w-6 rounded-full border border-white/20 bg-white/20 p-1">
                <MapIcon />
              </span>
              <Typography className="font-normal">{data.address}</Typography>
            </li>
            <li className="flex items-center gap-4">
              <span className="w-6 rounded-full border border-white/20 bg-white/20 p-1">
                <PhoneIcon />
              </span>
              <Typography className="font-normal">{data.phone}</Typography>
            </li>
            <li className="flex items-center gap-4">
              <span className="w-6 rounded-full border border-white/20 bg-white/20 p-1">
                <GlobeEuropeAfricaIcon />
              </span>
              <Typography className="font-normal">{data.sex}</Typography>
            </li>
            <li className="flex items-center gap-4">
              <span className="w-6 rounded-full border border-white/20 bg-white/20 p-1">
                <ClockIcon />
              </span>
              <Typography className="font-normal">
                {data.date}
              </Typography>
            </li>
          </ul>
        </CardBody>
      </div>
    </Card>
  );
};

export default ProfileCard;
