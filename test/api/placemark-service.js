import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const placemarkService = {
  placemarkUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.placemarkUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.placemarkUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.placemarkUrl}/api/users`);
    return res.data;
  },

  async createTrail(trail) {
    const res = await axios.post(`${this.placemarkUrl}/api/trails`, trail);
    return res.data;
  },

  async deleteAllTrails() {
    const response = await axios.delete(`${this.placemarkUrl}/api/trails`);
    return response.data;
  },

  async deleteTrail(id) {
    const response = await axios.delete(`${this.placemarkUrl}/api/trails/${id}`);
    return response;
  },

  async getAllTrails() {
    const res = await axios.get(`${this.placemarkUrl}/api/trails`);
    return res.data;
  },

  async getTrail(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/trails/${id}`);
    return res.data;
  },

  async updateTrail(id, trail) {
  const res = await axios.put(`${this.placemarkUrl}/api/trails/${id}`, trail);
  return res.data;
  },
}