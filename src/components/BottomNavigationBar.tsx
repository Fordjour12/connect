import Cart from "@/screens/cart/Cart";
import Categories from "@/screens/category/Categories";
import Homepage from "@/screens/home/Homepage";
import Orders from "@/screens/order/Orders";
import ProductDetail from "@/screens/product/ProductDetail";
import Products from "@/screens/product/Products";
import EditProfile from "@/screens/settings/EditProfile";
import Profile from "@/screens/settings/Profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Svg, { Circle, G, Path } from "react-native-svg";

export default function BottomNavigationBar() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Homepage}
        options={{
          tabBarIcon: () => {
            return (
              <Svg width={20} height={20} fill="none" viewBox="0 0 24 24">
                <Path
                  stroke="#1C274C"
                  strokeLinecap="round"
                  strokeWidth={1.5}
                  d="M2 12h7.5M22 12h-7.5M20 15.684C20 19 17.735 22 16 22c-1.257 0-2.328-.97-3.032-3M4.144 8.316C4.144 5 6.41 2 8.144 2c2.269 0 3.928 3.158 3.928 10 0 1.093.043 2.093.123 3"
                />
              </Svg>
            );
          },
        }}
      />

      <Tab.Screen
        name="Category"
        component={Categories}
        options={{
          tabBarIcon: () => {
            return (
              <Svg width={20} height={20} fill="none" viewBox="0 0 24 24">
                <Path
                  stroke="#1C274C"
                  strokeLinecap="round"
                  strokeWidth={1.5}
                  d="M5.5 15.5c0-.943 0-1.414.293-1.707.293-.293.764-.293 1.707-.293h1c.943 0 1.414 0 1.707.293.293.293.293.764.293 1.707v1c0 .943 0 1.414-.293 1.707-.293.293-.764.293-1.707.293-1.414 0-2.121 0-2.56-.44"
                />
                <Path
                  stroke="#1C274C"
                  strokeWidth={1.5}
                  d="M5.5 8.5c0-1.414 0-2.121.44-2.56.439-.44 1.146-.44 2.56-.44.943 0 1.414 0 1.707.293.293.293.293.764.293 1.707v1c0 .943 0 1.414-.293 1.707-.293.293-.764.293-1.707.293h-1c-.943 0-1.414 0-1.707-.293C5.5 9.914 5.5 9.443 5.5 8.5ZM13.5 15.5c0-.943 0-1.414.293-1.707.293-.293.764-.293 1.707-.293h1c.943 0 1.414 0 1.707.293.293.293.293.764.293 1.707 0 1.414 0 2.121-.44 2.56-.439.44-1.146.44-2.56.44-.943 0-1.414 0-1.707-.293-.293-.293-.293-.764-.293-1.707v-1Z"
                />
                <Path
                  stroke="#1C274C"
                  strokeLinecap="round"
                  strokeWidth={1.5}
                  d="M18.5 8.5c0 .943 0 1.414-.293 1.707-.293.293-.764.293-1.707.293h-1c-.943 0-1.414 0-1.707-.293-.293-.293-.293-.764-.293-1.707v-1c0-.943 0-1.414.293-1.707.293-.293.764-.293 1.707-.293 1.414 0 2.121 0 2.56.44M22 14v1m-8 7c3.771 0 5.657 0 6.828-1.172.654-.653.943-1.528 1.07-2.828M10 22c-3.771 0-5.657 0-6.828-1.172C2 19.657 2 17.771 2 14M10 2C6.229 2 4.343 2 3.172 3.172 2.518 3.825 2.229 4.7 2.102 6M2 10V9"
                />
                <Path
                  stroke="#1C274C"
                  strokeLinecap="round"
                  strokeWidth={1.5}
                  d="M14 2c3.771 0 5.657 0 6.828 1.172C22 4.343 22 6.229 22 10"
                />
              </Svg>
            );
          },
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: () => {
            return (
              <Svg fill="none" width={20} height={20} viewBox="0 0 24 24">
                <Circle cx={15} cy={9} r={1} fill="#1C274C" />
                <Circle cx={9} cy={9} r={1} fill="#1C274C" />
                <Path
                  stroke="#1C274C"
                  strokeLinecap="round"
                  strokeWidth={1.5}
                  d="M9 6V5a3 3 0 1 1 6 0v1M20.224 12.526c-.586-3.121-.878-4.682-1.99-5.604C17.125 6 15.537 6 12.36 6h-.72c-3.176 0-4.764 0-5.875.922-1.11.922-1.403 2.483-1.989 5.604-.823 4.389-1.234 6.583-.034 8.029C4.942 22 7.174 22 11.639 22h.722c4.465 0 6.698 0 7.897-1.445.696-.84.85-1.93.696-3.555"
                />
              </Svg>
            );
          },
        }}
      />
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{
          tabBarIcon: () => {
            return (
              <Svg fill="none" width={20} height={20} viewBox="0 0 24 24">
                <G stroke="#1C274C" strokeLinecap="round" strokeWidth={1.5}>
                  <Path
                    strokeLinejoin="round"
                    d="m9.5 14.4 1.429 1.6 3.571-4"
                  />
                  <Path d="M2 12c0-4.714 0-7.071 1.464-8.536 1.241-1.24 3.123-1.43 6.536-1.46M22 12c0-4.714 0-7.071-1.465-8.536-1.24-1.24-3.122-1.43-6.535-1.46" />
                  <Path d="M10 22c-2.8 0-4.2 0-5.27-.545a5 5 0 0 1-2.185-2.185C2 18.2 2 16.8 2 14c0-2.8 0-4.2.545-5.27A5 5 0 0 1 4.73 6.545C5.8 6 7.2 6 10 6h4c2.8 0 4.2 0 5.27.545a5 5 0 0 1 2.185 2.185C22 9.8 22 11.2 22 14c0 2.8 0 4.2-.545 5.27a5 5 0 0 1-2.185 2.185C18.2 22 16.8 22 14 22" />
                </G>
              </Svg>
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: () => {
            return (
              <Svg width={20} height={20} fill="none" viewBox="0 0 24 24">
                <Circle
                  cx={12}
                  cy={6}
                  r={4}
                  stroke="#1C274C"
                  strokeWidth={1.5}
                />
                <Path
                  stroke="#1C274C"
                  strokeLinecap="round"
                  strokeWidth={1.5}
                  d="M15 20.615c-.91.247-1.926.385-3 .385-3.866 0-7-1.79-7-4s3.134-4 7-4 7 1.79 7 4c0 .345-.077.68-.22 1"
                />
              </Svg>
            );
          },
        }}
      />
      <Tab.Screen
        name="Edit Profile"
        component={EditProfile}
        options={{
          tabBarItemStyle: {
            display: "none",
          },
        }}
      />
      <Tab.Screen
        name="Product Detail"
        component={ProductDetail}
        options={{
          tabBarItemStyle: {
            display: "none",
          },
        }}
      />
      <Tab.Screen
        name="Products"
        component={Products}
        options={{
          tabBarItemStyle: {
            display: "none",
          },
        }}
      />
    </Tab.Navigator>
  );
}
