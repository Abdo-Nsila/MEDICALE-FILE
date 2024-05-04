import { Button } from "@material-tailwind/react";
import React from "react";

const NotFound: React.FC = () => {
  return (
    <div className="h-[100vh] w-full flex flex-col justify-center items-center gap-2 text-2xl">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Button className="mt-6" type="submit" onClick={() => window.history.back()}color="blue"
      >
        Go Back
        </Button>
    </div>
  );
};

export default NotFound;
