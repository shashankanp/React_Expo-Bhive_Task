import React from "react";
import { View, Text } from "react-native";
import { Image } from "expo-image";
import { useState, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

const Logo = "../../assets/bhive_logo.png";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
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

  // const route = useRouter();
  console.log(user?.displayName, user?.email, user?.uid);

export default function Nav() {
  return (
    <View>
      {/* {!user && ( */}

      {/* <View className="flex justify-between items-center py-0">
        <Link href="/">
        <Image
          className="w-10 h-12"
          source="https://picsum.photos/seed/696/3000/2000"
          placeholder={blurhash}
          contentFit="cover"
          transition={1000}
        />
        </Link>
        <Text
          className="bg-teal-500 rounded-lg py-2 px-4 font-medium text-lg ml-8 text-white"
          href="/auth/login"
        >
          Join Now!
        </Text>
      </View>  */}
      {/* )} */}
      {/* {user && ( */}
      <View className="flex justify-between items-center py-0">
          {/* <Link href="/dashboard"> */}
          <Image
          className="w-10 h-12"
          source={Logo}
          contentFit="cover"
        />
          {/* </Link> */}
          <View>
            <View className="dropdown inline-block relative">
              {/* <Link href={"/dashboard"}> */}
                <img
                  src={`${user.photoURL}`}
                  alt="avatar"
                  referrerPolicy="no-referrer"
                  className="rounded-full w-12 mx-auto"
                />
              {/* </Link> */}
              <h2>{user.displayName}</h2>
              <ul className="dropdown-menu absolute hidden text-gray-700 pt-1">
                <li>
                  {/* <Link */}
                    className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                    href="/form"
                  >
                    Form
                  {/* </Link> */}
                </li>
                <li>
                  <button
                    onClick={() => auth.signOut()}
                    className="rounded-b bg-gray-200 hover:bg-gray-400  py-2 px-4 block text-black font-medium whitespace-no-wrap"
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            </View>
          </View>
        </View>
      {/* )} */}
    </View>
  );
}
