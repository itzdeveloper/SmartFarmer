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

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [repassword, setRePassword] = useState("");
  const [phno, setPhno] = useState("");
  const [loc, setLoc] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("TabScreen");
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    if (password != repassword) {
      alert("Passwords do not match");
      return;
    } else if (
      password.length === 0 ||
      email.length === 0 ||
      phno.length === 0 ||
      name.length === 0 ||
      loc.length === 0
    ) {
      alert("Please fill all fields");
      return;
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          const uid = response.user.uid;
          const data = {
            id: uid,
            name,
            email,
            phno,
            loc,
          };
          const usersRef = firebase.firestore().collection("user");
          usersRef
            .doc(uid)
            .set(data)
            .then(() => {
              navigation.navigate("TabScreen");
            })
            .catch((error) => {
              alert(error.message);
            });
        })
        .catch((error) => alert(error.message));
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
      <Text style={styles.heading}>New User ?</Text>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Phone Number"
          value={phno}
          keyboardType="numeric"
          onChangeText={(text) => setPhno(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Re-Password"
          value={repassword}
          onChangeText={(text) => setRePassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Location"
          value={loc}
          onChangeText={(text) => setLoc(text)}
          style={styles.input}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignUp} style={styles.button}>
          <Text style={styles.buttonText}>SignUp</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

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
    // flexDirection: "rowspan",
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
});
