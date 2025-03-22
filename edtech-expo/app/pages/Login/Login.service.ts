import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../utils/constants";
import { useAxios } from "../../config/axios";
import axios from "axios";
export const handleLogin = async ({
  email,
  password,
  validateToken,
  fn,
}: {
  email: string;
  password: string;
  validateToken: Function;
  fn: Function;
}) => {
  const api = await useAxios();

  console.log(BASE_URL);
  await axios
    .post(`${BASE_URL}/auth/login`, { email, password })
    .then(async (response) => {
      console.log("success", response);

      const { token } = response.data;

      await AsyncStorage.setItem("token", token).then(() => {
        validateToken(true);
      });
    })
    .catch((err) => {
      fn(err.response.data.message);
      console.log(`${err.response.data.message}`);
    });
};
