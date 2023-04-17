import { StyleSheet, Text, View, Linking } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

const ThinkSpeakScreen = () => {
  return (
    <View style={styles.Container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL("https://thingspeak.com/channels/2102562")
          }
          style={styles.button}
        >
          <Text style={styles.buttonText}>Open External Browser</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ThinkSpeakScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ECF9FF",
  },
  buttonContainer: {
    width: "80%",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#19A7CE",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "#F6F1F1",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "#F6F1F1",
    fontWeight: "700",
    fontSize: 16,
  },
});
