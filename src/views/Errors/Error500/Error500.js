import React from "react";
import { ErrorPage } from "../components";

const Error500 = () => {
  return (
    <ErrorPage
      title="Error 500 - Kidztime"
      header="500: Ooops, something went terribly wrong!"
      src="/images/undraw_server_down_s4lk.svg" />
  );
};

export default Error500;