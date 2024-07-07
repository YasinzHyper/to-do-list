import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import apiRequest from "./apiRequest.js";

export const homePageLoader = async ({ request, params }) => {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) return null;

  const res1 = await apiRequest.get("/tasks/");
  const res2 = await apiRequest.get("/categories");
  return { tasks: res1.data.reverse(), categories: res2.data };
};

//   export const listPageLoader = async ({ request, params }) => {
//     const query = request.url.split("?")[1];
//     const postPromise = await apiRequest("/posts?" + query);
//     return defer({
//       postResponse: postPromise,
//     });
//   };
