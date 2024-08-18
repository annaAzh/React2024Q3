import { REG_EXP } from 'shared/types/validation';

export const imageToBase64 = async (img: File | Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result) {
        resolve(reader.result.toString());
      } else {
        reject(new Error('Failed to convert image to base64'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read image file'));
    };
    reader.readAsDataURL(img);
  });
};

export const getPasswordStrength = (password: string | undefined): number => {
  if (!password) return 0;
  let strength = 0;

  if (new RegExp(REG_EXP.special_character).test(password)) strength++;
  if (new RegExp(REG_EXP.uppercase).test(password)) strength++;
  if (new RegExp(REG_EXP.lowercase).test(password)) strength++;
  if (new RegExp(REG_EXP.numbers).test(password)) strength++;

  return strength;
};
