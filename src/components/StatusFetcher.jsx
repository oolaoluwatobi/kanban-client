import React from "react";
import { Form, useFetcher, useLocation, useNavigation, useSubmit } from "react-router-dom";
// import api from "../api/users";

// export async function action({ request, params: { id } }) {
//   const p = new URL(request.url).searchParams.get("p") || "";
//   const q = new URL(request.url).searchParams.get("q") || "";
//   const formData = await request.formData();

//   console.log(request, id, formData);

//   const newUser = {
//     favorite: formData.get("favorite"),
//   };

//   try {
//     const res = await api.put(`subscribers/${id}`, newUser);
//     console.log(res.data, "favorite");
//     const resData = res?.data;
//     return { resData, newUser }, redirect(`../?q=${q}&p=${p}`);
//   } catch (error) {
//     return error;
//   }
// }

// export async function action({ request, params }) {
//   const p = new URL(request.url).searchParams.get("p") || '';
//   const q = new URL(request.url).searchParams.get("q") || '';
// try {
//   const res = await api.delete(`subscribers/${params?.id}/?q=${q}&p=${p}`, {
//     id: `${params.id}`,
//   });

//   console.log(res, res?.data, "15: Subs...");
//   return redirect(`/subscribers/?q=${q}&p=${p}`)
// } catch (error) {
//   console.log(error.message);
//   return error, redirect('/subscribers')
// }
// }


const StatusFetcher = ({ resData }) => {
  const  status   = resData;
  const fetcher = useFetcher()
  const submit = useSubmit()
  // yes, this is a `let` for later
  const location = useLocation();
  const navigation = useNavigation();
  // if (fetcher.formData) {
  //   status = fetcher.formData.get("status") ;
  // }

  
  const onStatusChanged = (e) => setTaskStatus(e.target.value);
  // const statusOptions = users.map((user) => (
  //   <option key={user.id} value={user.id}>
  //     {user.name}
  //   </option>
  // ));

  const search = location.state?.search || location.search || null;
  console.log(status, search);

  return (
    <fetcher.Form method="post" className="hidde ml-2  text-yellow-500">
    <input
      id="status"
      name="status"
      value={status}
      // defaultValue={status}
      className="border block text-sm mb-2 h-2 rounded-md px-2"
      onChange={(event) => {
        console.log(event.currentTarget.form)
        submit(event.currentTarget.form)
      }}
    />
    </fetcher.Form>
  );
};

export default StatusFetcher;
