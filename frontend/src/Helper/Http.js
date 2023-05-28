// api.js
import Axios from "axios";

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

console.log(userToken, "=====================================after login");

let urls = {
  test: `http://localhost:4000/`,
  development: "http://localhost:4000/",
};
const Http = Axios.create({
  baseURL: urls[process.env.NODE_ENV],
  headers: {
    Authorization: `Bearer ${userToken}`,
  },
});

export default Http;
