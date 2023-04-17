import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { firebase } from "../firebase";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ChangePassword = () => {
  const [newpw, setNewPW] = useState("");
  const [renewpw, setReNewPW] = useState("");
  const [user, setUser] = useState("{}");

  const navigation = useNavigation();

  // useEffect(() => {
  //   let uid = firebase.auth().currentUser?.uid;
  //   const unsubscribe = firebase
  //     .firestore()
  //     .collection("user")
  //     .doc(uid)
  //     .onSnapshot((documentSnapshot) => {
  //       setUser(documentSnapshot.data());
  //     });
  //   return unsubscribe;
  // }, []);

  const handleUpdate = () => {
    if (newpw.length === 0 || renewpw.length === 0) {
      alert("Please fill all fields");
      return;
    }
    if (newpw != renewpw) {
      alert("Passwords do not match");
      return;
    } else {
      const user = firebase.auth().currentUser;
      user
        .updatePassword(newpw)
        .then(() => {
          alert("Updated password");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <Text style={styles.heading}>
          <MaterialCommunityIcons
            style={styles.icon}
            name="form-textbox-password"
          />{" "}
          Change Password
        </Text>
        <TextInput
          placeholder="New Password"
          onChangeText={(text) => setNewPW(text)}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="New Re-Password"
          onChangeText={(text) => setReNewPW(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleUpdate} style={styles.button}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ECF9FF",
  },
  heading: {
    color: "#19A7CE",
    paddingVertical: 15,
    fontWeight: "700",
    fontSize: 25,
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#19A7CE",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#F6F1F1",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#F6F1F1",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonbottom: {
    paddingVertical: 10,
    flexDirection: "row",
  },
  buttonbottomleft: {
    paddingRight: 180,
  },
  icon: {
    fontSize: 23,
  },
});
