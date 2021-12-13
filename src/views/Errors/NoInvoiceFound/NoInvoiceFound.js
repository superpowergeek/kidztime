import React from "react";
import { ErrorPage } from "../components";

const NoInvoiceFound = () => {
  return (
    <ErrorPage
      title="No Invoice Generated - Kidztime"
      header="No Invoice Generated"
      subtitle="Sorry, we cannot generate an invoice for this order. Please check if this order exists, or sign out and sign in again to renew your session"
      src="/images/no-invoice.svg"
      redirect="/orders"
      btnTitle="Back to Order Management"
    />
  );
};

export default NoInvoiceFound;