
import React from "react";
import Update from "./Update";
import Delete from "./Delete";
import { UserType } from "@/state/Users/GetSlice";
import { Card, CardBody, Chip, Typography } from "@material-tailwind/react";
import { CheckBadgeIcon, ClockIcon, GlobeEuropeAfricaIcon, IdentificationIcon, InboxIcon, MapIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { ConsultationType } from "@/state/Consultation/GetSlice";

type ProfileCardProps = {
  data: ConsultationType;
};

const ProfileCard: React.FC<ProfileCardProps> = ({ data }) => {
  return (
    <Card color="gray" variant="gradient" className="flex flex-col gap-1 justify-between sm:min-w-36 py-2">
      <div className="flex justify-end items-center gap-1 px-3">
        {/*//! Actions */}
        <Update info={data} />
        <Delete docId={data.id} />
      </div>

      <div className="p-4 flex flex-col items-center">
        <div className="text-center">
          <h2 className="text-xl font-bold capitalize ">
            Doctor : {data.doctor}
          </h2>
        </div>
        <CardBody className="mt-2">
          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-4">
              <span className="w-6 rounded-full border border-white/20 bg-white/20 p-1">
                <CheckBadgeIcon />
              </span>
              <Typography className="font-normal">{data.doctor}</Typography>
            </li>
            <li className="flex items-center gap-4">
              <span className="w-6 rounded-full border border-white/20 bg-white/20 p-1">
                <CheckBadgeIcon />
              </span>
              <Typography className="font-normal">{data.doctorEmail}</Typography>
            </li>
            <li className="flex items-center gap-4">
              <span className="w-6 rounded-full border border-white/20 bg-white/20 p-1">
                <CheckBadgeIcon />
              </span>
              <Typography className="font-normal">{data.patient}</Typography>
            </li>
            <li className="flex items-center gap-4">
              <span className="w-6 rounded-full border border-white/20 bg-white/20 p-1">
                <CheckBadgeIcon />
              </span>
              <Typography className="font-normal">{data.patientEmail}</Typography>
            </li>
            <li className="flex items-center gap-4">
              <span className="w-6 rounded-full border border-white/20 bg-white/20 p-1">
                <CheckBadgeIcon />
              </span>
              <Typography className="font-normal">{data.reason}</Typography>
            </li>
            <li className="flex items-center gap-4">
              <span className="w-6 rounded-full border border-white/20 bg-white/20 p-1">
                <CheckBadgeIcon />
              </span>
              <Typography className="font-normal">{data.medication}</Typography>
            </li>
            <li className="flex items-center gap-4">
              <span className="w-6 rounded-full border border-white/20 bg-white/20 p-1">
                <CheckBadgeIcon />
              </span>
              <Typography className="font-normal">{data.result}</Typography>
            </li>
            <li className="flex items-center gap-4">
              <span className="w-6 rounded-full border border-white/20 bg-white/20 p-1">
                <CheckBadgeIcon />
              </span>
              <Typography className="font-normal">
                {typeof data.date == "object" ? data.date.toDate().toLocaleDateString() : data.date}
              </Typography>
            </li>
          </ul>
        </CardBody>
      </div>
    </Card>
  );
};

export default ProfileCard;
