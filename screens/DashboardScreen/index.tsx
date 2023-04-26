import { View, Text, Pressable } from "react-native";
import Auth from "../../utils/auth";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [inputs, setInputs] = useState();
  const user = Auth();
  // useEffect(() => {
  //   if (!loading)
  //     axios
  //       .post("https://next13-bhive-task-v1.vercel.app/api/form/fetch", {
  //         data: user,
  //       })
  //       .then((res: any) => {
  //         setInputs(res.data.data);
  //         console.log("user data: ", res.data.data);
  //       });
  // }, [user]);
  // if (loading) return <Text className="text-3xl">Loading...</Text>;
  // if (!user) route.push("/auth/login");

  if (user)
    return (
      <View>
        <Text className="text-4xl mt-10 mb-8">
          Welcome to your dashboard {user?.displayName}!
        </Text>
        {/* Details */}
        {/* If data is empty */}
        {!Object.keys(inputs).length && (
          <View>
            {" "}
            <Text className="text-3xl my-10">
              You don't have any data available yet.
            </Text>
            <Pressable
              className="bg-teal-500 rounded-lg py-4 bg-gradient-to-r from-green-500 to-green-700 px-6 font-medium text-lg  text-white"
              // href="/form"
            >
              Fill your first form!
            </Pressable>
          </View>
        )}

        {/* If data exists */}

        {Object.keys(inputs).length > 0 && (
          <View>
            <Pressable
              className="bg-teal-500 rounded-lg py-4 bg-gradient-to-r from-green-500 to-green-700 px-6 font-medium text-lg  text-white"
              // href="/form"
            >
              Fill another form!
            </Pressable>
            <Text className="text-3xl mt-10">
              Here is the {inputs.length} form details that you have provided:
            </Text>
            {inputs
              .slice(0)
              .reverse()
              .map((input: any) => (
                <View
                  className="text-2xl shadow-xl rounded-xl mt-4 p-10 flex justify-between max-w-4xl"
                  key={input._id}
                >
                  <View>
                    <Text className="my-2">
                      <span className="font-medium">Name</span>: {input.name}
                    </Text>
                    <Text className="my-2">
                      <span className="font-medium">Email</span>: {input.email}
                    </Text>
                    <Text className="my-2">
                      <span className="font-medium">Phone</span>: {input.phone}
                    </Text>
                    <Text className="my-2">
                      <span className="font-medium">Opportunity</span>:{" "}
                      {input.opportunity}
                    </Text>
                  </View>
                  <View>
                    <button className="bg-gray-500 rounded-lg py-3 px-6 font-medium text-lg text-white mt-14 mr-36 ">
                      Edit
                    </button>{" "}
                  </View>
                </View>
              ))}
          </View>
        )}
      </View>
    );
}
