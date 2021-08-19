import { instance } from "../config";

export async function getAdmins(filters) {
  try {
    const res = await instance.get(
      `${instance.defaults.baseURL}/api/admin`,
      filters
    );

    if (res && res.data?.data && res.status === 200) {
      return res.data;
    } else return false;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function verifyAdmin(id) {
  try {
    const res = await instance.patch(
      `${instance.defaults.baseURL}/api/admin/verify`,
      null,
      {
        params: {
          id,
        },
      }
    );

    return res && res.status === 204;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function removeAdmin(id) {
  try {
    const res = await instance.patch(
      `${instance.defaults.baseURL}/api/admin/remove`,
      null,
      {
        params: {
          id,
        },
      }
    );

    return res && res.status === 204;
  } catch (err) {
    console.error(err);
    return false;
  }
}
