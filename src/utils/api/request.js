import axios from "axios";
let baseURL;

if (process.env.NODE_ENV === "production") {
  baseURL = "https://ill-jade-antelope-tux.cyclic.app";
} else {
  baseURL = "http://localhost:8000";
}

export const request = axios.create({
  baseURL,
});
