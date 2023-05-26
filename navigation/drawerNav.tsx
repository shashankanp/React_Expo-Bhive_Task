import { createDrawerNavigator } from "@react-navigation/drawer";
import SuccessScreen from "../screens/SuccessScreen";
import FormScreen from "../screens/FormScreen";
import DashboardScreen from "../screens/DashboardScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="Form" component={FormScreen} />
      <Drawer.Screen name="Success" component={SuccessScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}
