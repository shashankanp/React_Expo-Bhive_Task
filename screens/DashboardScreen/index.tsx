import {
  View,
  Text,
  Pressable,
  Button,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Auth from "../../utils/auth";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Dashboard({ navigation }) {
  // const [inputs, setInputs] = useState();
  const inputs = [
    {
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "555-555-5555",
      opportunity: "Sales Lead",
    },
    {
      name: "Jane Smith",
      email: "janesmith@example.com",
      phone: "555-123-4567",
      opportunity: "Customer Referral",
    },
    {
      name: "Bob Johnson",
      email: "bobjohnson@example.com",
      phone: "555-987-6543",
      opportunity: "Partnership",
    },
    {
      name: "Samantha Lee",
      email: "samlee@example.com",
      phone: "555-222-3333",
      opportunity: "Investor",
    },
  ];
  const user = { displayName: "Shash" };

  if (user)
    return (
      <View className="flex-1">
        <Text
          style={{ fontFamily: "Poppins_400Regular" }}
          className="text-3xl mt-10 mb-3 ml-2"
        >
          Welcome to your dashboard {user?.displayName}!
        </Text>
        {/* Details */}
        {/* If data is empty */}
        {!Object.keys(inputs).length && (
          <View>
            <Text
              style={{ fontFamily: "Poppins_400Regular" }}
              className="text-2xl mb-4 ml-2"
            >
              You don't have any data available yet :(
            </Text>
            <TouchableOpacity className="bg-teal-500 rounded-lg py-4 bg-gradient-to-r from-green-500 to-green-700  font-medium text-lg  text-white w-1/2 justify-center align-middle ml-2 ">
              <Text
                style={{ fontFamily: "Poppins_400Regular" }}
                className="text-center text-white font-medium text-xl "
                onPress={() => navigation.navigate("Form")}
              >
                Fill your first form!
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* If data exists */}

        {Object.keys(inputs).length > 0 && (
          <View className="flex-1">
            <TouchableOpacity className="bg-teal-500 rounded-lg py-4 bg-gradient-to-r from-green-500 to-green-700  font-medium text-lg  text-white w-1/2 justify-center align-middle ml-2 ">
              <Text
                style={{ fontFamily: "Poppins_400Regular" }}
                className="text-center text-white font-medium text-xl "
                onPress={() => navigation.navigate("Form")}
              >
                Fill another form!
              </Text>
            </TouchableOpacity>
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
