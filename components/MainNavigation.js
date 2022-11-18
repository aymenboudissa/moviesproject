import Home from "../screens/Home";
import Detail from "../screens/Detail";
import Search from "../screens/Search";
import NavBar from "./NavBar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
const MainNavigation = () => {
  return (
    <Stack.Navigator headerMode={"screen"}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTransparent: true,
          header: ({ navigation }) => (
            <NavBar navigation={navigation} main={true} />
          ),
        }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          headerTransparent: true,
          header: ({ navigation }) => (
            <NavBar navigation={navigation} main={false} />
          ),
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerTransparent: true,
          header: ({ navigation }) => (
            <NavBar navigation={navigation} main={false} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;
