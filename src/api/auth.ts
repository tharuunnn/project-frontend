import api from "./client";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  email: string;
  password: string;
  name: string;
}

export const loginRequest = (payload: LoginPayload) =>
  api.post("/auth/login", payload);

export const signupRequest = (payload: SignupPayload) =>
  api.post("/auth/signup", payload);

export const getProfileRequest = () =>
  api.get("/profile/me");

export const updateProfileRequest = (payload: any) =>
  api.put("/profile/me", payload);


//this file is to group all auth related calls in one place and reduces url clutter