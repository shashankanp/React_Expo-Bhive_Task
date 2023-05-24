import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AuthContext from "../providers/authProvider";

WebBrowser.maybeCompleteAuthSession();

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);
  const [token, setToken] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "498611362161-pbiq8ni17i9donl64m9q5cl295j86d6e.apps.googleusercontent.com",
    iosClientId:
      "498611362161-qp4ok94q1iov73mpthrv0hgqs7so11in.apps.googleusercontent.com",
    expoClientId:
      "498611362161-tsh8o9q4kp23cg8adgbn6n2g9k6rrg7u.apps.googleusercontent.com",
    webClientId:
      "498611362161-tsh8o9q4kp23cg8adgbn6n2g9k6rrg7u.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication.accessToken);
    }
  }, [response]);

  useEffect(() => {
    if (token) {
      const getUserInfo = async () => {
        try {
          const response = await fetch(
            "https://www.googleapis.com/userinfo/v2/me",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const user = await response.json();
          setUser(user);

          axios
            .post("https://next13-bhive-task-v1.vercel.app/api/user/add", {
              firebase_name: user?.name,
              firebase_mail: user?.email,
              firebase_uid: user?.id,
            })
            .then((response) => {
              console.log("Firebase User Success:", response);
              return response.data;
            })
            .catch((err) => console.log("Firebase User Error:", err));
          console.log("The user is: ", user);
        } catch (error) {
          console.log(error);
        }
      };
      getUserInfo();
    }
  }, [token]);

  // useEffect(() => {
  //   if (user) {
  //     setUser(user);
  //     axios
  //       .post("https://next13-bhive-task-v1.vercel.app/api/user/add", {
  //         firebase_name: user?.name,
  //         firebase_mail: user?.email,
  //         firebase_uid: user?.id,
  //       })
  //       .then((response) => {
  //         console.log("Firebase User Success:", response);
  //         return response.data;
  //       })
  //       .catch((err) => console.log("Firebase User Error:", err));
  //   }
  // }, [user]);

  return { request, promptAsync };
};

export default useAuth;
