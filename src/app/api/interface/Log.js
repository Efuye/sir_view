import { instance } from "../config";

export async function getLogs(filters) {
  try {
    const res = await instance.get(
      `${instance.defaults.baseURL}/api/log`,
      filters
    );

    if (res && res.data?.data && res.status === 200) {
      return { data: res.data.data };
    } else return false;
  } catch (err) {
    console.error(err);
    return false;
  }
}
