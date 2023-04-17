import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Linking,
} from "react-native";

const ContactUsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Address</Text>
      <Text style={styles.content}>Myleripalayam Village,</Text>
      <Text style={styles.content}>Othakkal Mandapam Post,</Text>
      <Text style={styles.content}>Coimbatore - 641032, Tamilnadu, India</Text>
      <Text style={styles.title}>Phone</Text>
      <Text
        onPress={() => Linking.openURL("tel:${+911234567890}")}
        style={styles.content}
      >
        +91 1234567890
      </Text>
      <Text style={styles.title}>E-Mail</Text>
      <Text
        onPress={() =>
          Linking.openURL("mailto:teamprojectdevelopment@gmail.com")
        }
        style={styles.content}
      >
        teamprojectdevelopment@gmail.com
      </Text>
    </View>
  );
};

export default ContactUsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ECF9FF",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#19A7CE",
    fontWeight: "700",
    fontSize: 25,
    marginTop: 10,
  },
  content: {
    fontSize: 15,
    paddingHorizontal: 30,
  },
});
