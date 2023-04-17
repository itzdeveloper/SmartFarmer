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

const EditProfile = () => {
  const [name, setName] = useState("");
  const [phno, setPhno] = useState("");
  const [loc, setLoc] = useState("");
  const [user, setUser] = useState("{}");

  const navigation = useNavigation();

  useEffect(() => {
    let uid = firebase.auth().currentUser?.uid;
    const unsubscribe = firebase
      .firestore()
      .collection("user")
      .doc(uid)
      .onSnapshot((documentSnapshot) => {
        setUser(documentSnapshot.data());
        setName(documentSnapshot.data().name);
        setPhno(documentSnapshot.data().phno);
        setLoc(documentSnapshot.data().loc);
      });
    return unsubscribe;
  }, []);

  const handleUpdate = () => {
    if (phno.length === 0 || name.length === 0 || loc.length === 0) {
      alert("Please fill all fields");
      return;
    } else {
      const usersRef = firebase.firestore().collection("user");
      usersRef
        .doc(user.id)
        .update({
          name: name,
          loc: loc,
          phno: phno,
        })
        .then(() => {
          alert("User updated!");
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
            name="account-edit-outline"
          />{" "}
          Edit Profile
        </Text>
        <TextInput
          defaultValue={user.name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        />
        <TextInput
          defaultValue={user.phno}
          keyboardType="numeric"
          onChangeText={(text) => setPhno(text)}
          style={styles.input}
        />
        <TextInput
          defaultValue={user.loc}
          onChangeText={(text) => setLoc(text)}
          style={styles.input}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleUpdate} style={styles.button}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default EditProfile;

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
