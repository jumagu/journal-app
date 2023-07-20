/* eslint-disable no-undef */

import { fileUpload } from "../../src/helpers/fileUpload";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.VITE_CLOUDINARY_API_KEY,
  api_secret: import.meta.env.VITE_CLOUDINARY_API_SECRET,
  secure: true,
});

describe("Pruebas en fileUpload()", () => {
  test("Debe subir el archivo correctamente a cloudinary", async () => {
    const imgUrl =
      "https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg";

    const resp = await fetch(imgUrl);
    const blob = await resp.blob();
    const file = new File([blob], "landscape.jpg");

    const url = await fileUpload(file);

    expect(typeof url).toBe("string");

    // ImageDelete
    const segments = url.split("/");
    const imgId = segments[segments.length - 1].replace(".jpg", "");

    const cloudResp = await cloudinary.api.delete_resources(["journal-app/" + imgId], {
      resource_type: "image",
    });

    console.log(cloudResp);
  });

  test("Debe retornar null si hay un error", async () => {
    const file = new File([], "landscape.jpg");

    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
