import React from 'react';
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import ProfileCard from "./ProfileCard";
import Cookies from 'universal-cookie';
const cookies = new Cookies(null, { path: '/' });

export default function DisplayPatientConsultations() {
  const user = cookies.get("user");
  const data = useSelector((state: RootState) => state.getConsultations.consultations);
  console.log(data)

  return (
    <div className="px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.length !== 0 ? data.map((item: any, index: number) => {
        return (
          <ProfileCard key={index} data={item} />
        )
      }
      ) :
        <div className="w-screen h-full flex justify-center mt-20 items-center text-2xl font-bold">
          <h1>No Consultations</h1>
        </div>}
    </div>
  );
}