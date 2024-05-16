import React from 'react';
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import ProfileCard from "./ProfileCard";
import Cookies from 'universal-cookie';
const cookies = new Cookies(null, { path: '/' });

export default function DisplayConsultations() {
  const user = cookies.get("user");
  const data = useSelector((state: RootState) => state.getConsultations.consultations);


  return (
    <div className="px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.map((item: any, index: number) => {
        if (item.doctorEmail == user.email) {
          return (
            <ProfileCard key={index} data={item} />
          )
        }
      }
      )}
    </div>
  );
}