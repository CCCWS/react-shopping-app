import axios from "axios";

const productionCheck =
  process.env.NODE_ENV === "production" ? "/ec2server" : "";

const newAxios = axios.create({ baseURL: productionCheck });

export default newAxios;
