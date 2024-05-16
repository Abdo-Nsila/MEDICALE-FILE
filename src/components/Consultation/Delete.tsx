"use client";
import React from "react";
import { AppDispatch } from "@/state/store";
import { useDispatch } from "react-redux";
import {
  deleteUser,
} from "@/state/Users/DeleteSlice";
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { deleteConsultation } from "@/state/Consultation/DeleteSlice";
import Cookies from "universal-cookie";
const cookies = new Cookies(null, { path: '/' });

interface DeleteProps {
  docId: string;
}

function Delete({ docId }: DeleteProps) {
  const user = cookies.get("user");
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  const deleteAction = () => {
    dispatch(deleteConsultation(docId, user.email));
  };


  return (
    <>
      <span onClick={handleOpen} className="w-7 cursor-pointer rounded-full text-red-500 p-1">
        <TrashIcon />
      </span>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Its a simple dialog.</DialogHeader>
        <DialogBody>
          Are you sure you want to delete this User?
        </DialogBody>
        <DialogFooter
        >
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="red" onClick={() => deleteAction()}>
            <span>Delete</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default Delete;
