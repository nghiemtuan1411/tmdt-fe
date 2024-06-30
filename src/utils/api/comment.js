import { request } from "./request";

export const create = async (payload) =>
  await request.post("/api/comment", payload);

export const listComment = async () => await request.get("/api/comment");

export const home = async () => await request.get("/api/comment/home");

export const listMenu = async () => await request.get("/api/comment/menu");

export const getCommentById = async (id) =>
  await request.get("/api/comment/" + id);

export const addProduct = async (id, listId) =>
  await request.put("/api/comment/add-product/" + id, { listId });

export const deleteComment = async (id) =>
  await request.delete("/api/comment/" + id);

export const updateComment = async (id, payload) =>
  await request.patch("/api/comment/" + id, payload);
