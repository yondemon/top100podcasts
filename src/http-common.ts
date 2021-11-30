import axios from "axios";

export default axios.create({
  baseURL: "https://itunes.apple.com",
  headers: {
    "Content-type": "application/json"
  }
});