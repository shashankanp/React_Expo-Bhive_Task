import { View } from "react-native";
import { auth } from "../../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const route = useRouter();

  const [inputs, setInputs] = useState([]);

  useEffect(() => {
    if (!loading)
      axios
        .post("/api/dashboard/fetch", {
          data: user,
        })
        .then((res: any) => {
          setInputs(res.data.data);
          console.log("user data: ", res.data.data);
        });
  }, [user]);
  if (loading) return <h1 className="text-3xl">Loading...</h1>;
  if (!user) route.push("/auth/login");

  if (user)
    return (
      <View>
        <h1 className="text-4xl mt-10 mb-8">
          Welcome to your dashboard {user?.displayName}!
        </h1>
        {/* Details */}
        {/* If data is empty */}
        {!Object.keys(inputs).length && (
          <View>
            {" "}
            <h2 className="text-3xl my-10">
              You don't have any data available yet.
            </h2>
            <Link
              className="bg-teal-500 rounded-lg py-4 bg-gradient-to-r from-green-500 to-green-700 px-6 font-medium text-lg  text-white"
              href="/form"
            >
              Fill your first form!
            </Link>
          </View>
        )}

        {/* If data exists */}

        {Object.keys(inputs).length > 0 && (
          <View>
            <Link
              className="bg-teal-500 rounded-lg py-4 bg-gradient-to-r from-green-500 to-green-700 px-6 font-medium text-lg  text-white"
              href="/form"
            >
              Fill another form!
            </Link>
            <h2 className="text-3xl mt-10">
              Here is the {inputs.length} form details that you have provided:
            </h2>
            {inputs
              .slice(0)
              .reverse()
              .map((input: any) => (
                <View
                  className="text-2xl shadow-xl rounded-xl mt-4 p-10 flex justify-between max-w-4xl"
                  key={input._id}
                >
                  <View>
                    <p className="my-2">
                      <span className="font-medium">Name</span>: {input.name}
                    </p>
                    <p className="my-2">
                      <span className="font-medium">Email</span>: {input.email}
                    </p>
                    <p className="my-2">
                      <span className="font-medium">Phone</span>: {input.phone}
                    </p>
                    <p className="my-2">
                      <span className="font-medium">Opportunity</span>:{" "}
                      {input.opportunity}
                    </p>
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
