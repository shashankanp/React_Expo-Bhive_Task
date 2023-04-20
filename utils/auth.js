import { useState, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

export default function Auth() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "process.env.GOOGLE_WEB_ID",
    iosClientId: "process.env.GOOGLE_IOS_ID",
    webClientId: "process.env.GOOGLE_ANDROID_ID",
  });

  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication.accessToken);
      getUserInfo();
    }
  }, [response, token]);

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
      console.log("The user is: ", user);
      // if (loading) return <Text className="text-3xl">Loading...</Text>;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      axios
        .post("/api/user/add", {
          firebase_name: user?.displayName,
          firebase_mail: user?.email,
          firebase_uid: user?.uid,
        })
        .then((response) => {
          console.log("Firebase User Success:", response);
          return response.data;
        })
        .catch((err) => console.log("Firebase User Error:", err));
      // route.push("/dashboard");
    } else {
      // console.log("Login");
    }
  }, [user]);
  console.log(user?.displayName, user?.email, user?.uid);
  return (user,request,promptAsync());
}
// const route = useRouter();
