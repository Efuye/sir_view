import { instance } from "../config";

export async function signup(args) {
  const { email, password, username } = args;
  try {
    const res = await instance.post(`${instance.defaults.baseURL}/signup`, {
      email,
      password,
      username,
    });

    if (res && res.data?.data && res.status === 201) {
      instance.defaults.headers.common["Authorization"] = res.data.data.token;
      return res.data.data.profile;
    } else return false;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function signin(args) {
  const { identifier, password } = args;
  try {
    const res = await instance.post(`${instance.defaults.baseURL}/signin`, {
      identifier,
      password,
    });

    if (res.data.data && res.status === 201) {
      instance.defaults.headers.common["Authorization"] = res.data.data.token;
      return res.data.data.profile;
    } else return false;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function changePassword(args) {
  const { password, newPassword } = args;
  try {
    const res = await instance.put(`${instance.defaults.baseURL}/api/pass`, {
      password,
      newPassword,
    });

    if (res.status === 204) return true;
    else return false;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function signout() {
  try {
    const res = await instance.delete(
      `${instance.defaults.baseURL}/api/signout`
    );

    if (res.status === 204) {
      instance.defaults.headers.common["Authorization"] = "";
      return true;
    } else return false;
  } catch (err) {
    console.error(err);
    return false;
  }
}
