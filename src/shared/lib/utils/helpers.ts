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

    console.log(reader.result);

    reader.readAsDataURL(img);
  });
};
