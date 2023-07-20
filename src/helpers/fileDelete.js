import { generateSHA1 } from "./generateSha1";

export const fileDelete = async (publicId) => {
  const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
  const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;

  const timestamp = new Date().getTime();
  const signature = generateSHA1(generateSignature(publicId, apiSecret));

  const url = `${import.meta.env.VITE_CLOUDINARY_URL}/image/destroy`;

  try {
    await fetch(url, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        public_id: publicId,
        signature: signature,
        api_key: apiKey,
        timestamp: timestamp,
      }),
    });
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

const generateSignature = (publicId, apiSecret) => {
  const timestamp = new Date().getTime();
  return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};
