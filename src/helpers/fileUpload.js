const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const cloudinaryUrl = `${import.meta.env.VITE_CLOUDINARY_URL}/upload`;

export const fileUpload = async (file) => {
  if (!file) throw new Error("No file was provided.");
  // if (!file) return null;

  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const resp = await fetch(cloudinaryUrl, { method: "POST", body: formData });

    if (!resp.ok)
      throw new Error("An error occurred while uploading the image.");

    const cloudResp = await resp.json();
    return cloudResp.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
    // return null;
  }
};
