import { http } from "./app.js";

const corsConfig = {
  enabled: true, 
  origin: "http://localhost:3000",
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'PATCH'],
  headers: true, 
  exposeHeaders: [],
  credentials: true,
  maxAge: 90,
};

export default corsConfig;
