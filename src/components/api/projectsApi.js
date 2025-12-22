import axios from './axios'; 

const RESOURCE = '/projects';

export async function getProjects() {
  const res = await axios.get(RESOURCE);
  return res.data; 
}

export async function createProject(project) {
  const res = await axios.post(RESOURCE, project);
  return res.data;
}

export async function updateProject(id, project) {
  const res = await axios.put(`${RESOURCE}/${id}`, project);
  return res.data;
}

export async function deleteProject(id) {
  await axios.delete(`${RESOURCE}/${id}`);
  return true;
}