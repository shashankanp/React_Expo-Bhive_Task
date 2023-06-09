import React, { useState, useContext } from "react";
import { TextInput, Text, Button, Pressable, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import AuthContext from "../../providers/authProvider";
import * as Yup from "yup";

// import "yup-phone";

import { Formik } from "formik";

const FormScreen = ({ navigation }) => {
  const [error, setError] = useState();
  const { user } = useContext(AuthContext);

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        phone: "",
        opportunity: "Fractional Real Estate",
      }}
      onSubmit={(values, { resetForm }) => {
        axios
          .post("https://next13-bhive-task-v1.vercel.app/api/form/add", {
            firebase_uid: user.id,
            name: values.name,
            email: values.email,
            phone: values.phone,
            opportunity: values.opportunity,
          })
          .then((response) => {
            console.log("Input Success:", response);
            navigation.navigate("Success");
            resetForm();
            return response.data;
          })
          .catch((err) => {
            setError(err.message);
            console.log("Input Error:", err);
          });
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .min(3, "Name must be atleast 3 characters")
          .max(20, "Name must be lesser than 20 characters")
          .required("Name is required"),
        email: Yup.string()
          .email("Not a valid Email Address")
          .matches(
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Should be of format 'john@gmail.com'"
          )
          .required("Email is required"),
        phone: Yup.string()
          .matches(
            /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/,
            "Should be of valid format"
          )
          .max(10, "Can't be more than 10 numbers")
          .required("A phone number is required"),
      })}
    >
      {({
        values,
        handleChange,
        errors,
        setFieldTouched,
        touched,
        isValid,
        handleSubmit,
      }) => (
        <View className="p-12 pt-5 ">
          <Text className="text-gray-700 text-2xl pb-2 ">
            Please enter your Information
          </Text>
          <Text className="text-lg text-gray-500">
            This information will be used to provide you with our best
            opportunities!
          </Text>

          <View className="mt-6">
            {/* Name Input Field */}
            <View className="pb-2">
              <Text
                className={`block text-sm pb-2  font-medium ${
                  touched.name && errors.name ? "text-red-500" : ""
                }`}
              >
                {errors.name ? errors.name : "Name"}
              </Text>
              <TextInput
                value={values.name}
                className="border-2 border-gray-500 p-2  rounded-md focus:border-teal-500 focus:ring-teal-500"
                onChangeText={handleChange("name")}
                onBlur={() => setFieldTouched("name")}
                placeholder="Enter your name:"
              />
            </View>

            {/* Email Input Field */}
            <View className="pb-2">
              <Text
                className={`block text-sm pb-2  font-medium ${
                  touched.email && errors.email ? "text-red-500" : ""
                }`}
              >
                {errors.email ? errors.email : "Email ID"}
              </Text>
              <TextInput
                value={values.email}
                className="border-2 border-gray-500 p-2 rounded-md focus:border-teal-500 focus:ring-teal-500"
                onChangeText={handleChange("email")}
                onBlur={() => setFieldTouched("email")}
                placeholder="Enter your Email ID:"
              />
            </View>

            {/* Phone Input Field */}
            <View className="pb-2">
              <Text
                className={`block text-sm pb-2  font-medium ${
                  touched.phone && errors.phone ? "text-red-500" : ""
                }`}
              >
                {errors.phone ? errors.phone : "Phone Number"}
              </Text>
              <TextInput
                value={values.phone}
                className="border-2 border-gray-500 p-2 rounded-md focus:border-teal-500 focus:ring-teal-500"
                onChangeText={handleChange("phone")}
                onBlur={() => setFieldTouched("phone")}
                placeholder="Enter your Phone No::"
              />
            </View>

            {/* Opportunity Input Field */}
            <View className="pb-2">
              <Text className="block text-sm font-medium">Opportunities</Text>

              <Picker
                selectedValue={values.opportunity}
                onValueChange={(itemValue, itemIndex) => {
                  handleChange("opportunity")(itemValue);
                }}
                onBlur={() => setFieldTouched("opportunity")}
                className="border-2 border-gray-500 p-2 rounded-md focus:border-teal-500 focus:ring-teal-500"
              >
                <Picker.Item
                  label="Fractional Real Estate"
                  value="Fractional Real Estate"
                />
                <Picker.Item
                  label="Revenue Based Finance"
                  value="Revenue Based Finance"
                />
                <Picker.Item label="Asset Leasing" value="Asset Leasing" />
              </Picker>
            </View>

            {error && (
              <Text className="text-red-700 mb-4 text-center bg-red-300 mx-5">
                Email or Phone already exists
              </Text>
            )}
            <Pressable className="bg-teal-500 rounded-lg py-4 bg-gradient-to-r from-green-500 to-green-700  font-medium text-lg  text-white w-1/2 mx-auto  ">
              <Text
                style={{ fontFamily: "Poppins_400Regular" }}
                className="text-center text-white font-medium text-xl "
                disabled={!isValid}
                onPress={handleSubmit}
              >
                Submit
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </Formik>
  );
};
export default FormScreen;
