import * as Location from "expo-location";
const UserLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    console.log("Permission to access location was denied");
    return;
  }

  let location = await Location.getCurrentPositionAsync({});
  const lat = location.coords.latitude;
  const long = location.coords.longitude;
  //   console.log(lat, long);
  return { lat, long };
};

export default UserLocation;
