import axiosClient from './axios'; 

const RESOURCE = '/projects';

export async function getProjects() {
  const res = await axiosClient.get(RESOURCE);
  return res.data; 
}

export async function createProject(project) {
  const res = await axiosClient.post(RESOURCE, project);
  return res.data;
}

export async function updateProject(id, project) {
  const res = await axiosClient.put(`${RESOURCE}/${id}`, project);
  return res.data;
}

export async function deleteProject(id) {
  await axiosClient.delete(`${RESOURCE}/${id}`);
  return true;
}