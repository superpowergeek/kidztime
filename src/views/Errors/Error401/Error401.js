import React from "react";
import { ErrorPage } from "../components";

const Error401 = () => {
  return (
    <ErrorPage
      title="Error 401 - Kidztime"
      header="401: We are sorry but we are not able to authenticate you."
      src="/images/undraw_authentication_fsn5.svg" />
  );
};

export default Error401;