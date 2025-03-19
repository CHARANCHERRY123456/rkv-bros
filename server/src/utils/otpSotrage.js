const otpStorage = new Map();

export const storeOTP = (email, otp) => otpStorage.set(email, otp);
export const getOTP = (email) => otpStorage.get(email);
export const deleteOTP = (email) => otpStorage.delete(email);
