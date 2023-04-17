import { useNavigation } from "@react-navigation/core";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { firebase } from "../firebase";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const MenuScreen = () => {
  const navigation = useNavigation();
  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  const editprofile = () => {
    navigation.navigate("EditProfile");
  };

  const ChangePassword = () => {
    navigation.navigate("ChangePassword");
  };

  const contactUs = () => {
    navigation.navigate("ContactUsScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.options}>
        <TouchableOpacity onPress={editprofile}>
          <Text style={styles.text}>
            <MaterialCommunityIcons
              style={styles.icon}
              name="account-edit-outline"
            />{" "}
            Edit Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={ChangePassword}>
          <Text style={styles.text}>
            <MaterialCommunityIcons
              style={styles.icon}
              name="form-textbox-password"
            />{" "}
            Change Password
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={contactUs}>
          <Text style={styles.text}>
            <MaterialCommunityIcons
              style={styles.icon}
              name="help-circle-outline"
            />{" "}
            Contact Us
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignOut}>
          <Text style={styles.text}>
            <Image
              style={styles.pngimg}
              source={require("../assets/back.png")}
            ></Image>
            <Text> Sign out</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ECF9FF",
    flex: 1,
  },
  options: {
    marginTop: 20,
    marginLeft: 20,
  },
  text: {
    marginTop: 5,
    fontWeight: "500",
    fontSize: 20,
    color: "#000",
  },
  icon: {
    fontSize: 23,
  },
  pngimg: {
    width: 25,
    height: 15,
  },
});
