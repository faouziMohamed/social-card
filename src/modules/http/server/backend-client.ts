import {env} from '@/lib/env';
import axios from 'axios';

const backendClient = axios.create({
  baseURL: env.deploymentURL,
  timeout: 10_000,
  headers: {'Content-Type': 'application/json'},
});

export default backendClient;
