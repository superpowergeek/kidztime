import React from "react";
import { ErrorPage } from "../components";

const Error404 = () => {
  return (
    <ErrorPage
      title="Error 404 - Kidztime"
      header="404: The page you are looking for isn’t here"
      src="/images/undraw_page_not_found_su7k.svg" />
  );
};

export default Error404;