import axios from "axios";

const httpRRIM = axios.create({
  baseURL: "http://185.209.179.253:8400",
  headers: {
    Accept: "application/json",
    Content: "application/json",
  },
});

export { httpRRIM };
