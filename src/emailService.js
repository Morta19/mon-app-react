import emailjs from '@emailjs/browser';

export const sendEmail = async (formData) => {
try {
await emailjs.send(
'service_gtix1yd'
,
'template_j0izl5l'
,

formData,
'Z6IUcPuN7KMKnhCV7'
);
return { success: true };
} catch (error) {
return { success: false };
}
};