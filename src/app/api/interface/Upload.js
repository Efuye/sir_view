import { instance } from "../config";

export async function upload(file, sizes) {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("sizes", JSON.stringify(sizes));

    const res = await instance.post(
      `${instance.defaults.baseURL}/api/upload`,
      formData,
      { headers: { "content-type": "multipart/form-data" } }
    );

    if (res.data) return { data: res.data };
    else return false;
  } catch (err) {
    console.error(err);
    return false;
  }
}
