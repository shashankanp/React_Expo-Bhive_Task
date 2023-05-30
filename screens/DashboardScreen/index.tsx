import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import AuthContext from "../../providers/authProvider";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Dashboard({ navigation }) {
  const { user, setUser } = useContext(AuthContext);
  const [inputs, setInputs] = useState([]);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const storedData = await AsyncStorage.getItem("@storage_Key");
      if (storedData !== null) {
        const user = JSON.parse(storedData);
        setUser(user);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserData = () => {
    if (user) {
      axios
        .post(
          "https://next13-bhive-task-v1.vercel.app/api/dashboard/fetchExpo",
          {
            data: user,
          }
        )
        .then((res) => {
          setInputs(res.data.data);
          setLoading(false);
          console.log("User data:", res.data.data);
        })
        .catch((error) => {
          console.log("Error fetching user data:", error);
        });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (isFocused && user) {
      fetchUserData();
    }
  }, [isFocused, user]);

  return (
    <View className="flex-1">
      <Text
        style={{ fontFamily: "Poppins_400Regular" }}
        className="text-3xl mt-5 mb-3 ml-2"
      >
        Welcome to your dashboard {user?.name}!
      </Text>
      {/* Details */}
      {/* If data is empty */}

      {loading && <ActivityIndicator size="large" color="#00ff00" />}

      {!loading && !Object.keys(inputs).length && (
        <View>
          <Text
            style={{ fontFamily: "Poppins_400Regular" }}
            className="text-2xl mb-4 ml-2"
          >
            You don't have any data available yet :(
          </Text>
          <Pressable className="bg-teal-500 rounded-lg py-4 bg-gradient-to-r from-green-500 to-green-700  font-medium text-lg  text-white w-1/2 justify-center align-middle ml-2 ">
            <Text
              style={{ fontFamily: "Poppins_400Regular" }}
              className="text-center text-white font-medium text-xl "
              onPress={() => navigation.navigate("Form")}
            >
              Fill your first form!
            </Text>
          </Pressable>
        </View>
      )}

      {/* If data exists */}

      {Object.keys(inputs).length > 0 && (
        <View className="flex-1">
          <Pressable className="bg-teal-500 rounded-lg py-4 bg-gradient-to-r from-green-500 to-green-700  font-medium text-lg  text-white w-1/2 justify-center align-middle ml-2 ">
            <Text
              style={{ fontFamily: "Poppins_400Regular" }}
              className="text-center text-white font-medium text-xl "
              onPress={() => navigation.navigate("Form")}
            >
              Fill another form!
            </Text>
          </Pressable>
          <Text
            style={{ fontFamily: "Poppins_400Regular" }}
            className="text-2xl mt-4 ml-2"
          >
            Here is the {inputs.length} form details that you have provided:
          </Text>

          <ScrollView>
            <View>
              {inputs
                .slice(0)
                .reverse()
                .map((input: any) => {
                  return (
                    <View
                      className="text-2xl shadow-xl rounded-xl mt-4 p-10 flex justify-between max-w-4xl"
                      key={input.email}
                    >
                      <View>
                        <Text className="my-2">
                          <Text
                            style={{ fontFamily: "Poppins_400Regular" }}
                            className="font-medium"
                          >
                            Name
                          </Text>
                          : {input.name}
                        </Text>
                        <Text className="my-2">
                          <Text
                            style={{ fontFamily: "Poppins_400Regular" }}
                            className="font-medium"
                          >
                            Email
                          </Text>
                          : {input.email}
                        </Text>
                        <Text className="my-2">
                          <Text
                            style={{ fontFamily: "Poppins_400Regular" }}
                            className="font-medium"
                          >
                            Phone
                          </Text>
                          : {input.phone}
                        </Text>
                        <Text className="my-2">
                          <Text
                            style={{ fontFamily: "Poppins_400Regular" }}
                            className="font-medium"
                          >
                            Opportunity
                          </Text>
                          : {input.opportunity}
                        </Text>
                      </View>
                    </View>
                  );
                })}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
}
