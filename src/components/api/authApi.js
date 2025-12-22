import axiosClient from './axios';
// Auth très simple pour atelier (NE PAS faire en prod tel quel)
export async function loginWithJson(email, password) {
// On filtre par email + password dans le JSON
const res = await axiosClient.get('/users', {
params: { email, password },
});
const users = res.data;
if (!users || users.length === 0) {
throw new Error('Email ou mot de passe invalide');
}
const user = users[0];
// On simule un "token" simple (ici juste l'id + timestamp)
const fakeToken =
`
user-${user.id}-${Date.now()}`
;

return {
token: fakeToken,
user: {
id: user.id,
name: user.name,
email: user.email,
role: user.role,
},
};
}