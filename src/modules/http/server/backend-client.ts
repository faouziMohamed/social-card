import axios from "axios";
import { env } from "@/lib/env";

const backendClient = axios.create({
  baseURL: env.deploymentURL,
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
});

export default backendClient;
