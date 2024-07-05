import apiRequest from "./apiRequest.js";

export const homePageLoader = async ({ request, params }) => {
    const res = await apiRequest("/tasks/");
    return res.data;
  };
  
//   export const listPageLoader = async ({ request, params }) => {
//     const query = request.url.split("?")[1];
//     const postPromise = await apiRequest("/posts?" + query);
//     return defer({
//       postResponse: postPromise,
//     });
//   };