import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";
import { firebase } from "../firebase";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({});
  const [water, setWater] = useState({});
  const [rain, setRain] = useState({});
  const [soil, setSoil] = useState({});
  const [temp, setTemp] = useState({});
  const [humidity, setHumidity] = useState({});
  const [status, setStatus] = useState({});
  const [motorstatus, setMotorStatus] = useState("");

  const fetchData = async () => {
    const resp = [
      await fetch(
        "https://api.thingspeak.com/channels/2102562/fields/1/last.json"
      ),
      await fetch(
        "https://api.thingspeak.com/channels/2102562/fields/2/last.json"
      ),
      await fetch(
        "https://api.thingspeak.com/channels/2102562/fields/3/last.json"
      ),
      await fetch(
        "https://api.thingspeak.com/channels/2102562/fields/4/last.json"
      ),
      await fetch(
        "https://api.thingspeak.com/channels/2102562/fields/5/last.json"
      ),
      await fetch(
        "https://api.thingspeak.com/channels/2102562/fields/6/last.json"
      ),
    ];
    let respjson = [];
    for (let i = 0; i < resp.length; i++) {
      const data = await resp[i].json();
      respjson.push(data);
    }
    setWater(respjson[0]);
    setRain(respjson[1]);
    setSoil(respjson[2]);
    setTemp(respjson[3]);
    setHumidity(respjson[4]);
    setStatus(respjson[5]);
  };

  useEffect(() => {
    let uid = firebase.auth().currentUser?.uid;
    const unsubscribe = firebase
      .firestore()
      .collection("user")
      .doc(uid)
      .onSnapshot((documentSnapshot) => {
        setUser(documentSnapshot.data());
      });
    fetchData();
    const dataInterval = setInterval(() => fetchData(), 3 * 1000);
    return () => unsubscribe() && clearInterval(dataInterval);
  }, []);

  const changemotorstatus = async () => {
    setMotorStatus("Initiated");
    let url;
    if (status.field6 == 1) {
      url =
        "https://api.thingspeak.com/update?api_key=YNNV78FGQZP2N2VG&field6=0";
    } else {
      url =
        "https://api.thingspeak.com/update?api_key=YNNV78FGQZP2N2VG&field6=1";
    }
    while (true) {
      let resp = await fetch(url);
      resp = await fetch(
        "https://api.thingspeak.com/channels/2102562/fields/6/last.json"
      );
      const motor = await resp.json();
      if (status.field6 != motor.field6) {
        await new Promise((r) => setTimeout(r, 1000));
        setMotorStatus("");
        break;
      }
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.welcome}>Hii {user.name}!</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.title}> Water Level</Text>
        <TextInput
          editable={false}
          selectTextOnFocus={false}
          placeholderTextColor="#000"
          placeholder={
            water.field1 != undefined
              ? water.field1 < 10
                ? "Dry"
                : water.field1 >= 10 && water.field1 < 420
                ? "Low"
                : water.field1 >= 420 && water.field1 < 520
                ? "Medium"
                : water.field1 >= 520
                ? "Full"
                : water.field1
              : ""
          }
          style={styles.input}
        />
        <Text style={styles.title}> Rain Status</Text>
        <TextInput
          editable={false}
          selectTextOnFocus={false}
          placeholderTextColor="#000"
          placeholder={
            rain.field2 != undefined
              ? rain.field2 == 1
                ? "Not Rainy"
                : "Rainy"
              : ""
          }
          style={styles.input}
        />
        <Text style={styles.title}> Soil Moisture State</Text>
        <TextInput
          editable={false}
          placeholderTextColor="#000"
          selectTextOnFocus={false}
          placeholder={
            soil.field3 != undefined ? (soil.field3 == 1 ? "Dry" : "Wet") : ""
          }
          style={styles.input}
        />
        <Text style={styles.title}> Temperature </Text>
        <TextInput
          editable={false}
          selectTextOnFocus={false}
          placeholderTextColor="#000"
          placeholder={temp.field4 != undefined ? temp.field4 + " °C" : ""}
          style={styles.input}
        />
        <Text style={styles.title}> Humidity </Text>
        <TextInput
          editable={false}
          selectTextOnFocus={false}
          placeholderTextColor="#000"
          placeholder={
            humidity.field5 != undefined ? humidity.field5 + " %" : ""
          }
          style={styles.input}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            disabled={motorstatus.length == 0 ? false : true}
            onPress={changemotorstatus}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              Turn {status.field6 == 1 ? "Off" : "On"} Motor {motorstatus}
            </Text>
          </TouchableOpacity>
          <Text style={styles.buttonbottom}>
            {status.field6 == 1 && motorstatus.length == 0
              ? "Alert Motor is On"
              : ""}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ECF9FF",
    flex: 1,
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
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonbottom: {
    color: "#DF2E38",
    fontWeight: "700",
    fontSize: 15,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  welcome: {
    marginTop: 50,
    marginLeft: 20,
    color: "#19A7CE",
    fontWeight: "700",
    fontSize: 25,
  },
  title: {
    color: "#146C94",
    fontWeight: "700",
    fontSize: 15,
    paddingTop: 10,
  },
  inputContainer: {
    width: "90%",
    paddingHorizontal: 30,
    paddingVertical: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
});
