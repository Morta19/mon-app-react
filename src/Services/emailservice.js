import emailjs from '@emailjs/browser';

export const sendEmail = async (formData) => {
  try {
    await emailjs.send(
      'service_625ht2o',
      'template_ptfopr1',
      formData,
      'OLUuBuw92fRDp7An9'
    );
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};