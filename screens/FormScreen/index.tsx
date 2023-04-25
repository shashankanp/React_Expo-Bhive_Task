import { Formik } from "formik";
import * as Yup from "yup";
import "yup-phone-lite";
import axios from "axios";
import { useState } from "react";
import { Image } from "expo-image";
import { View, Text, Keyboard, TextInput } from "react-native";

const formImage = "../../assets/stonks.jpg";

export default function Home() {
  const [error, setError] = useState();
  // const [imageUpload, setImageUpload] = useState(null);
  // Formik Logic
  const formik = Formik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      opportunity: "Revenue Based Finance",
      terms: "",
      // photo: "",
    },

    // Form Validation
    validationSchema: Yup.object({
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
      phone: Yup.string().phone("IN").required("A phone number is required"),
      terms: Yup.array().required("Terms of Sevice must be checked"),
    }),

    // Submit Form
    onSubmit: async (values) => {
      // console.log(values);
      axios
        .post("/api/form/add", {
          // firebase_uid: user?.uid,
          name: values.name,
          email: values.email,
          phone: values.phone,
          opportunity: values.opportunity,
          // photo: values.photo,
        })
        .then((response) => {
          console.log("Input Success:", response);
          // router.push("/success");
          return response.data;
        })
        .catch((err) => {
          setError(err.message);
          console.log("Input Error:", err);
        });
    },
  });

  // if (loading) return <Text className="text-3xl">Loading...</Text>;
  // if (!user) router.push("/auth/login");
  // if (user)
  return (
    <View className="h-screen flex items-center justify-center md:mt-20">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white flex rounded-lg w-3/4"
      >
        <View className="flex-1 text-gray-700 p-10">
          <Text className="text-2xl pb-2">Please enter your Information</Text>
          <View className="text-lg text-gray-500">
            This information will be used to provide you with our best
            opportunities!
          </View>

          <View className="mt-6">
            {/* Name Input Field */}
            <TextInput
              value={formik.values.name}
              style={inputStyle}
              onChangeText={handleChange("name")}
              onBlur={() => setFieldTouched("name")}
              placeholder="Name"
            />
            {touched.name && errors.name && (
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                {errors.name}
              </Text>
            )}

            <View className="pb-4">
              <label
                className={`block text-sm pb-2 font-medium ${
                  formik.touched.name && formik.errors.name
                    ? "text-red-500"
                    : ""
                }`}
                htmlFor="name"
              >
                {formik.errors.name ? formik.errors.name : "Name"}
              </label>
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your name:"
                className="outline outline-2 outline-gray-500 p-2 rounded-md w-2/3 focus:border-teal-500 focus:ring-teal-500"
              />
            </View>

            {/* Email Input Field */}
            <View className="pb-4">
              <label
                className={`block text-sm pb-2 font-medium ${
                  formik.touched.email && formik.errors.email
                    ? "text-red-500"
                    : ""
                }`}
                htmlFor="email"
              >
                {formik.errors.email ? formik.errors.email : "Email Id"}
              </label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your mail Id:"
                className="outline outline-2 outline-gray-500 p-2 rounded-md w-2/3 focus:border-teal-500 focus:ring-teal-500"
              />
            </View>

            {/* Phone Number Input Field */}
            <View className="pb-4">
              <label
                className={`block text-sm pb-2 font-medium ${
                  formik.touched.phone && formik.errors.phone
                    ? "text-red-500"
                    : ""
                }`}
                htmlFor="phone"
              >
                {formik.errors.phone ? formik.errors.phone : "Phone Number"}
              </label>
              <input
                type="tel"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your Phone No:"
                className="outline outline-2 outline-gray-500 p-2 rounded-md w-2/3 focus:border-teal-500 focus:ring-teal-500"
              />
            </View>

            {/* Opportunity Input Field */}
            <View className="pb-4">
              <label
                className="block text-sm pb-2 font-medium"
                htmlFor="opportunity"
              >
                Opportunities
              </label>
              <select
                name="opportunity"
                // defaultValue="rbf"
                value={formik.values.opportunity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="outline outline-2 outline-gray-500 p-2 rounded-md w-2/3 focus:border-teal-500 focus:ring-teal-500"
              >
                <option value="Fractional Real Estate">
                  Fractional Real Estate
                </option>
                <option value="Revenue Based Finance">
                  Revenue Based Finance
                </option>
                <option value="Asset Leasing">Asset Leasing</option>
              </select>
            </View>

            {/* Image submission */}
            {/* <View className="pb-4">
                <label
                  className={`block text-sm pb-2 font-medium ${
                    formik.touched.photo && formik.errors.photo
                      ? "text-red-500"
                      : ""
                  }`}
                  htmlFor="file"
                >
                  {formik.errors.photo ? formik.errors.photo : "Upload Photo"}
                </label>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) =>{ setImageUpload(e.target.files?[0]);
                  }}
                />
              </View> */}

            {/* Terms of Service */}
            <View className="pb-4">
              <label
                className={`block text-sm pb-2 font-medium ${
                  formik.touched.terms && formik.errors.terms
                    ? "text-red-500"
                    : ""
                }`}
                htmlFor="terms"
              >
                {formik.errors.terms ? formik.errors.terms : "Terms of Service"}
              </label>
              <View className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="terms"
                  value="checked"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="h-5 w-5 text-teal-500 border-2  focus:border-teal-500 focus:ring-teal-500"
                />
                <p className="text-sm font-medium text-gray-500">
                  I agree to the Terms and Service that this data will be used
                  for further communication.
                </p>
              </View>
            </View>

            {error && (
              <p className="text-red-700 -mb-4 text-center bg-red-300 mx-5">
                Email or Phone already exists
              </p>
            )}
            <button
              type="submit"
              className="bg-teal-500 font-medium text-sm text-white py-3 mt-6 rounded-lg w-full"
            >
              Submit
            </button>
          </View>
        </View>
        <View className="relative flex-1">
          <Image
            source={require(formImage)}
            className="object-cover rounded-lg invisible md:visible"
          />
        </View>
      </form>
    </View>
  );
}
