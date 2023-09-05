import React from "react";
import { Outlet, useActionData, useLoaderData } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Header from "./Header";
import api from "../api/server";

export async function loader({ request, params }) {
  const res = await api.get("/");
  console.log(res, res.data);
  return res.data;
}

const Layout = () => {
  const resData = useLoaderData();
  // console.log(resData)

  return (
    <>
      <div className="bg-red-10 w-full ">
        <Toaster />
        <Header />
        <main className="w-full pt-10">
          <Outlet context={{ resData }} />
        </main>
        {/* <div className="mbauto mxauto">
        <Footer />
      </div> */}
      </div>
    </>
  );
};

export default Layout;
