import React, { useState } from "react";
import { TextInput, Text, Button, Pressable, View } from "react-native";

import * as Yup from "yup";

// import "yup-phone";

import { Formik } from "formik";

const FormScreen = () => {
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        // phone: "",
        opportunity: "Revenue Based Finance",
      }}
      onSubmit={(values) => Alert.alert(JSON.stringify(values))}
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
        // phone: Yup.string().phone("IN").required("A phone number is required"),
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
        <View className="p-12 ">
          <Text className="text-gray-700 text-2xl pb-2">
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

            {/* <View className="pb-2">
                <Text className="block text-sm pb-2 font-medium">
                  Opportunities
                </Text>
                <select
                  name="opportunity"
                  // defaultValue="rbf"
                  value={values.opportunity}
                  onChangeText={handleChange("opportunity")}
                  onBlur={() => setFieldTouched("opportunity")}
                  className="outline outline-2 outline-gray-500 p-2 rounded-md w-2/3 focus:border-teal-500 focus:ring-teal-500"
                >
                  <option value="Fractional Real Estate">
                    <Text>Fractional Real Estate</Text>
                  </option>
                  <option value="Revenue Based Finance">
                    <Text>Revenue Based Finance</Text>
                  </option>
                  <option value="Asset Leasing">
                    <Text>Asset Leasing</Text>
                  </option>
                </select>
              </View> */}

            <Button
              className="bg-teal-500 font-medium text-sm text-white py-3 mt-6 rounded-lg w-full"
              title="Submit"
              // disabled={!isValid}
              onPress={handleSubmit}
            />
          </View>
        </View>
      )}
    </Formik>
  );
};
export default FormScreen;
